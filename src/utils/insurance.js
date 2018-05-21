// Object to hold data on insurances for client-side use
class InsurancePolicy {
    constructor(id, proposer, numProviders, totalCoverAmount, currentFundedCover, premium, flightId, filled, deleted, contributors, contributions) {
	this.id = id;
	this.proposer = proposer
	this.numProviders = numProviders
	this.totalCoverAmount = totalCoverAmount
	this.currentFundedCover = currentFundedCover
	this.premium = premium
	this.flightId = flightId
	this.filled = filled
	this.deleted = deleted
	this.contributors = contributors
	this.contributions = contributions
    }
}


// Function to convert insurance from solidity form to a javscript form
export async function convertInsurance(insuranceArr, web3) {
	let totalCoverAmount = web3.fromWei(insuranceArr[3].toNumber(), "ether")
	let currentFundedCover = web3.fromWei(insuranceArr[4].toNumber(), "ether")

	let id = insuranceArr[0].toNumber();
	let proposer = insuranceArr[1]
	let numProviders = insuranceArr[2].toNumber()
	let premium = this.state.web3.fromWei(insuranceArr[5].toNumber(), "ether")
	let flightId = insuranceArr[6].toNumber()
	let filled = insuranceArr[7]
	let deleted = insuranceArr[8]
	let contributors = insuranceArr[9]
	let contributions = insuranceArr[10]
	for (let i = 0; i < contributions.length; i++) {
	    contributions[i] = this.state.web3.fromWei(contributions[i].toNumber(), "ether")
	}
	let insurance = new InsurancePolicy(id, proposer, numProviders, totalCoverAmount, currentFundedCover, premium, flightId, filled, deleted, contributors, contributions);
	return insurance
}