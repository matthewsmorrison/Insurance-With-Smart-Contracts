var Insurance = artifacts.require("Insurance");

contract('Insurance', function(accounts, app) {

  it("The starting number of insurance contracts should be 0", function() {
    return Insurance.deployed().then(function(instance) {
      return instance.getNumberOfInsuranceContracts();
    }).then(function(insuranceCovers) {
      assert.equal(insuranceCovers.valueOf(), 0, "The starting number of insurance contracts is not 0");
    });
  });

  it("A user should be able to propose an insurance contract, which can be retrieved", function() {
    // var app;
    var proposer = accounts[0];
    var flightProof = 'hello';
    var premiumAmount = web3.toWei(0.2, "ether");
    var totalCoverAmount = web3.toWei(1, "ether");
    var flightID = 669;

    return Insurance.deployed().then(function(instance) {
      app = instance;
      return app.proposeInsuranceCover(flightProof, totalCoverAmount, {from: proposer, value: premiumAmount});
    }).then(function() {
      return app.getInsuranceContracts();
    }).then(function(contracts) {
      assert.equal(contracts[0].toNumber(),1000,"contract ID not set properly");
      return app.allInsuranceCovers(contracts[0].toNumber());
    }).then(function(contract){
      assert.equal(contract[0].toNumber(), 1000, "contract ID not set properly");
      assert.equal(contract[1], proposer, "proposer is not set correctly");
      assert.equal(contract[2].toNumber(), 0, "number of providers not set correctly");
      assert.equal(contract[3].toNumber(), totalCoverAmount, "total cover amount is not set correctly");
      assert.equal(contract[4].toNumber(), 0, "current funded cover amount is not set correctly");
      assert.equal(contract[5].toNumber(), premiumAmount, "premium amount is not set correctly");
      assert.equal(contract[6].toNumber(), flightID, "flight ID is not set correctly");
      assert.equal(contract[7], false, "contract resolved is not set correctly");
      assert.equal(contract[8], false, "contract deleted is not set correctly");
    });
  });

  it("The number of insurance contracts should now be 1", function() {
    return Insurance.deployed().then(function(instance) {
      return instance.getNumberOfInsuranceContracts();
    }).then(function(insuranceCovers) {
      assert.equal(insuranceCovers.valueOf(), 1, "The total number of insurance contracts is not 1");
    });
  });

  it("A user should not be able to contribute to a contract if the value more than the requirement", function(){
    var app;
    var acceptor = accounts[1];
    var acceptorAmount = web3.toWei(1.2, "ether");
    var insuranceID;

    return Insurance.deployed().then(function(instance) {
      app = instance;
    }).then(function(){
      return app.getInsuranceContracts();
    }).then(function(contracts){
      insuranceID = contracts[0].toNumber();
      app.acceptContract(insuranceID, {from: acceptor, value: acceptorAmount})
    }).then(function(){
      assert.equal(insuranceID,1000,"the insurance ID is not correct")
      return app.allInsuranceCovers(insuranceID);
    }).then(function(contract){
      assert.equal(contract[4].toNumber(), 0, "the user was able to provide too much capital");
    })
  });

  it("A user should be able to contribute to a contract if the value is within the requirement", function(){
    var app;
    var acceptor = accounts[1];
    var acceptorAmount = web3.toWei(0.5, "ether");
    var insuranceID;

    return Insurance.deployed().then(function(instance) {
      app = instance;
    }).then(function(){
      return app.getInsuranceContracts();
    }).then(function(contracts){
      insuranceID = contracts[0].toNumber();
      app.acceptContract(insuranceID, {from: acceptor, value: acceptorAmount})
    }).then(function(){
      assert.equal(insuranceID,1000,"the insurance ID is not correct")
      return app.allInsuranceCovers(insuranceID);
    }).then(function(contract){
      assert.equal(contract[2].toNumber(), 1, "the number of providers has not been incremented");
      assert.equal(contract[4].toNumber(), acceptorAmount, "the contract has recorded the right amount of capital");
      assert.equal(contract[9][acceptor].toNumber(),acceptorAmount, "the acceptor address has not been added to the contract")
    })
  });


});
