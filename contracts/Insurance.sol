pragma solidity ^0.4.18;
import "../installed_contracts/jsmnsol-lib/contracts/JsmnSolLib.sol";
import "../installed_contracts/bytesutils.sol";
import "../installed_contracts/tlsnutils.sol";

contract Insurance {

  /***********************************/
  /******* CONTRACT ATTRIBUTES *******/
  /***********************************/

  struct InsuranceCover {
    uint insuranceID;
    address proposer;
    uint numberOfProviders;
    uint totalCoverAmount;
    uint currentFundedCover;
    uint premiumAmount;
    int flightID;
    bool filled;
    bool deleted;
    address[] contributors;
    uint[] contributions;
  }

  address public master;
  uint insuranceCoverCount;
  uint[] insuranceIDs;
  mapping(uint => InsuranceCover) public allInsuranceCovers;

  /***********************************/
  /************* MODIFIERS ***********/
  /***********************************/


  /***********************************/
  /************** EVENTS *************/
  /***********************************/

  event InsuranceCoverChange(uint insuranceID);
  event Status(uint status);
  /***********************************/
  /********* PUBLIC FUNCTIONS ********/
  /***********************************/

  /// @dev      Insurance contract constructor sets initial insurance cover count to 0
  function Insurance() public {
    master = msg.sender;
    insuranceCoverCount = 0;
  }

  /// @dev                        Allows a user to propose an insurance contract
  /// @param  _hex_proof          The hexidecimal proof passing through the flight ID
  /// @param  _totalCoverAmount   The total cover required by the user
  function proposeInsuranceCover(bytes memory _hex_proof, uint _totalCoverAmount) public payable {
    require(msg.value > 0);

    // Verify the TLS-N Proof
    uint256 qx = 0x0de2583dc1b70c4d17936f6ca4d2a07aa2aba06b76a97e60e62af286adc1cc09; //public key x-coordinate signer
    uint256 qy = 0x68ba8822c94e79903406a002f4bc6a982d1b473f109debb2aa020c66f642144a; //public key y-coordinate signer
    require(tlsnutils.verifyProof(_hex_proof, qx, qy));

    // Parse the response body of the TLS-N proof
    string memory body = string(tlsnutils.getHTTPBody(_hex_proof));
    JsmnSolLib.Token[] memory tokens;
    uint returnValue;
    uint actualNum;
    (returnValue, tokens, actualNum) = JsmnSolLib.parse(body, 300);

    // Check that the flight has not already occurred
    // Flight status has to be 'S' for 'scheduled'
    string memory status = JsmnSolLib.getBytes(body, tokens[178].start, tokens[178].end);
    require(compareStrings(status,'S'));

    // Then get the flight ID
    string memory flightIDString = JsmnSolLib.getBytes(body, tokens[6].start, tokens[6].end);
    int flightID = JsmnSolLib.parseInt(flightIDString);

    // Enter all flight details and create insurance contract
    uint insuranceID = (insuranceCoverCount++)+1000;
    insuranceIDs.push(insuranceID);
    InsuranceCover memory newContract;

    // Set all values of the new contract
    newContract.insuranceID = insuranceID;
    newContract.proposer = msg.sender;
    newContract.numberOfProviders = 0;
    newContract.totalCoverAmount = _totalCoverAmount;
    newContract.currentFundedCover = 0;
    newContract.premiumAmount = msg.value;
    newContract.flightID = flightID;
    newContract.filled = false;
    newContract.deleted = false;

    // Add this new contract to the 'database'
    allInsuranceCovers[insuranceID] = newContract;
    InsuranceCoverChange(insuranceID);
  }


  /// @dev            Allows a user to provide capital to the contract
  /// @param  _insuranceID  The insurance ID that the user is accepting
  function acceptContract(uint _insuranceID) public payable {
    require(msg.value > 0);
    require(!allInsuranceCovers[_insuranceID].filled);
    require((allInsuranceCovers[_insuranceID].currentFundedCover + msg.value) <= allInsuranceCovers[_insuranceID].totalCoverAmount);

    allInsuranceCovers[_insuranceID].currentFundedCover = allInsuranceCovers[_insuranceID].currentFundedCover + msg.value;
    if (allInsuranceCovers[_insuranceID].currentFundedCover == allInsuranceCovers[_insuranceID].totalCoverAmount) {
      allInsuranceCovers[_insuranceID].filled = true;
    }

    // Add acceptor to the contractProvider mapping
    allInsuranceCovers[_insuranceID].contributors.push(msg.sender);
    allInsuranceCovers[_insuranceID].contributions.push(msg.value);
    allInsuranceCovers[_insuranceID].numberOfProviders++;
    InsuranceCoverChange(_insuranceID);
  }

  /// @dev                    Calculates the outcome of an insurance contract
  /// @param  _insuranceID    The insurance ID that is being used
  /// @param  _hex_proof      The proof with the details of the flight
  function resolveContract(uint _insuranceID, bytes memory _hex_proof) public payable {
    // Verify the TLS-N Proof
    require(allInsuranceCovers[_insuranceID].filled);
    require(tlsnutils.verifyProof(_hex_proof));

    // Parse the response body of the TLS-N proof
    string memory body = string(tlsnutils.getHTTPBody(_hex_proof));
    JsmnSolLib.Token[] memory tokens;
    uint returnValue;
    uint actualNum;
    (returnValue, tokens, actualNum) = JsmnSolLib.parse(body, 500);

    // First check that the flight IDs are the same
    int temp = getFlightID(body, tokens);
    // Add this back in once testing is finished
    /* require(flightID == allInsuranceCovers[_insuranceID].flightID); */

    // Check the status
    temp = getStatus(body, tokens);
    require(temp != 1);

    // If the flight was cancelled pay out the funds to the proposer
    // Also pay the premium to the contributors
    // Flight status has to be 'C' for 'cancelled'

    uint i;
    /* if (!allInsuranceCovers[_insuranceID].filled) {
      // contract did not have enough contributions
      allInsuranceCovers[_insuranceID].proposer.transfer(allInsuranceCovers[_insuranceID].premiumAmount);
      for (i=0; i< allInsuranceCovers[_insuranceID].numberOfProviders; i++) {
        allInsuranceCovers[_insuranceID].contributors[i].transfer(allInsuranceCovers[_insuranceID].contributions[i]);
      }
    } */
    if (temp == 2 && allInsuranceCovers[_insuranceID].filled) {
      // the flight was cancelled
      allInsuranceCovers[_insuranceID].proposer.transfer(allInsuranceCovers[_insuranceID].totalCoverAmount);
      for (i=0; i< allInsuranceCovers[_insuranceID].numberOfProviders; i++) {
        allInsuranceCovers[_insuranceID].contributors[i].transfer((allInsuranceCovers[_insuranceID].contributions[i] * allInsuranceCovers[_insuranceID].premiumAmount) / allInsuranceCovers[_insuranceID].totalCoverAmount);
      }
    }
    else {
      // the flight was not cancelled
      for (i=0; i< allInsuranceCovers[_insuranceID].numberOfProviders; i++) {
        allInsuranceCovers[_insuranceID].contributors[i].transfer(((allInsuranceCovers[_insuranceID].contributions[i] * allInsuranceCovers[_insuranceID].premiumAmount) / allInsuranceCovers[_insuranceID].totalCoverAmount) + allInsuranceCovers[_insuranceID].contributions[i]);
      }
    }
    allInsuranceCovers[_insuranceID].deleted = true;
  }

  /// @dev                    Returns the status for the cancelling contract function
  /// @param  body            The body of the TLS-N proof
  /// @param  tokens          Tokens from the JsmnSolLib
  /// @return                 An integer corresponding to the status
  function getStatus(string body, JsmnSolLib.Token[] memory tokens) private returns(int) {
    // Flight status has to be 'C' for 'cancelled'
    string memory status;
    status = JsmnSolLib.getBytes(body, tokens[178].start, tokens[178].end);
    if (compareStrings(status,'S')) return 1;
    status = JsmnSolLib.getBytes(body, tokens[167].start, tokens[167].end);
    if (compareStrings(status,'C')) return 2;
    else return 3;
  }

  /// @dev                    Returns the flightID for the cancelling contract function
  /// @param  body            The body of the TLS-N proof
  /// @param  tokens          Tokens from the JsmnSolLib
  /// @return                 An integer corresponding to the flight ID
  function getFlightID(string body, JsmnSolLib.Token[] memory tokens) private returns(int) {
    string memory flightIDString = JsmnSolLib.getBytes(body, tokens[6].start, tokens[6].end);
    int flightID = JsmnSolLib.parseInt(flightIDString);
    return flightID;
  }

  // @dev                   allows user to cancel a proposed insurance contract, insuranceID is deleted and
  //                        contract funds transfered to the proposer and
  // @param _insuranceID    The insurance ID that is being canceled
  function cancelInsuranceContract(uint _insuranceID) public payable {
      require(allInsuranceCovers[_insuranceID].proposer == msg.sender);
      require(allInsuranceCovers[_insuranceID].filled == false);
      allInsuranceCovers[_insuranceID].deleted = true;
      InsuranceCoverChange(_insuranceID);
      allInsuranceCovers[_insuranceID].proposer.transfer(allInsuranceCovers[_insuranceID].premiumAmount);
      for (uint i=0; i< allInsuranceCovers[_insuranceID].numberOfProviders; i++) {
        allInsuranceCovers[_insuranceID].contributors[i].transfer(allInsuranceCovers[_insuranceID].contributions[i]);
      }
  }

  /// @dev                    Returns details of a specific insurance contract
  /// @param  _insuranceID    The insurance ID that you are requesting
  /// @return                 1. proposer address, 2. total cover amount, 3. current funded cover,
  ///                         4. premium amount, 5. the flight ID
  function getInsuranceContract(uint _insuranceID) public constant returns (address, uint, uint, uint, int) {
    return  (allInsuranceCovers[_insuranceID].proposer,
             allInsuranceCovers[_insuranceID].totalCoverAmount,
             allInsuranceCovers[_insuranceID].currentFundedCover,
             allInsuranceCovers[_insuranceID].premiumAmount,
             allInsuranceCovers[_insuranceID].flightID);
  }

  /// @dev                    Returns an array of all insurance IDs
  /// @return                 All insurance IDs that have ever been created
  function getInsuranceContracts() public constant returns (uint[]) {
    return insuranceIDs;
  }

  /// @dev                    Allows the requestor to see how many contracts have been created
  /// @return                 Returns an integer of the number of contracts
  function getNumberOfInsuranceContracts() public constant returns (uint) {
    return insuranceIDs.length;
  }

  /***********************************/
  /******** PRIVATE FUNCTIONS ********/
  /***********************************/

  /// @dev       Compares two strings
  /// @param  a  The first string to be compared
  /// @param  b  The second string to be compared
  /// @return    Returns true if two strings are the same, false otherwise
  function compareStrings (string a, string b) private returns (bool){
    return keccak256(a) == keccak256(b);
   }

  function getInsuranceContributers(uint _insuranceID) public constant returns(address[]) {
    return allInsuranceCovers[_insuranceID].contributors;
  }

  function getInsuranceContributions(uint _insuranceID) public constant returns(uint[]) {
    return allInsuranceCovers[_insuranceID].contributions;
  }
}
