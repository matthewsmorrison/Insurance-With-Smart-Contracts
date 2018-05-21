import Web3 from 'web3';
const contract = require('truffle-contract');
import InsuranceAbi from '../build/contracts/Insurance.json';
import { convertInsurance } from './insurance'; 

export function getWeb3() {
	return new Promise((resolve,reject) => {
		 // Wait for loading completion to avoid race conditions with web3 injection timing.
		 if (typeof window !== 'undefined') {
            window.addEventListener('load', function () {
                let web3 = window.web3;

                // checking if Web3 has been injected by the browser (Mist/MetaMask)
                console.log('Checking if MetaMask or Mist has injected Web3.')
                if (typeof web3 !== 'undefined') {
                    // use Mist/MetaMask's provider
                    web3 = new Web3(web3.currentProvider);

                    console.log('Web3 detected.');
                    resolve(web3);
                } else {
                    reject('Web3 not injected.');
                }
            })
        }
	})
};

export async function getAccounts(web3) {
    return new Promise((resolve, reject) => {
        if (!web3) {
            reject('Web3 Accounts undefined - is user logged in via Metamask?');
        }
        resolve(web3.eth.accounts);
    });
};

/*
let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      results = {
        web3: web3
      }

      console.log('Injected web3 detected.');

      resolve(results)
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')

      web3 = new Web3(provider)

      results = {
        web3: web3
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(results)
    }
  })
})

*/
    export async function getContractInstance(provider) {
		if(!provider){
        	console.log('Valid Web3 provider needed.');
        	return;
		}

		console.log("Getting contract.")

		let insuranceContract = contract(InsuranceAbi)
		insuranceContract.setProvider(provider)
		let insuranceContractInst = await insuranceContract.deployed()
		
		//this.insuranceContract.setProvider(this.state.web3.currentProvider)

		return insuranceContractInst
    }


export async function getAllInsurances(insuranceContractInst, _web3, currentAccount) {
	console.log("Getting all insurances");

    console.log(contractInstance);
    console.log(_web3);
    console.log(currentAccount);

    let web3 = _web3;
    let userFilledInsurances = [], userUnfilledInsurances = [], availableInsurances = [], investedInsurance = [];
    let insuranceIds = await this.insuranceContractInst.getInsuranceContracts()

    for (let i = 0; i < insuranceIds.length; i++) {
	    let insurance = await insuranceContractInst.allInsuranceCovers(insuranceIds[i]);
	    let contributors = await insuranceContractInst.getInsuranceContributors(insuranceIds[i]);
	    let contributions = await insuranceContractInst.getInsuranceContributions(insuranceIds[i]);

	    insurance.push(contributors);
	    insurance.push(contributions);
	    // Convert the insurance array to a javascript object
	    insurance = await convertInsurance(insurance, web3);
	    if (insurance.deleted === false) {
		// If the insurance has not been deleted
			if (insurance.proposer === currentAccount) {
			    // and if it was proposed by the current user
			    if (insurance.filled) {
				// and if it is already filled, append it to the users funded Insurances
					userFilledInsurances.push(insurance);
			    }
			    else {
				//  and if it is not filled, apprent to users unfunded Insurances
					userUnfilledInsurances.push(insurance);
			    }
		}
		else {
		    // If it was proposed by a different user, work out whether the current user has contributed
		    let contributor = false;
		    for (let j = 0; j < insurance.contributors.length; j++) {
				if (insurance.contributors[j] == currentAccount) {
				    contributor = true;
				    break;
				}
		    }
		    console.log(contributor, insurance.contributors, insurance)
		    if (contributor == true && insurance.filled == true) {
				// If he has and it is filled, add it to the invest insurance list
				investedInsurance.push(insurance);
				console.log("inv", investedInsurance);
		    }
		    else if (insurance.filled == false) {
				// If it isnt filled, add it to the avaialble list
				availableInsurances.push(insurance);
		    }
		}
	    }
	}
	return {userFilledInsurances: userFilledInsurances, userUnfilledInsurances:userUnfilledInsurances, availableInsurances: availableInsurances, investedInsurance: investedInsurance};
}




