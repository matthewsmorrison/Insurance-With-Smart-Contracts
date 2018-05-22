import React, { Component } from 'react'
import Insurance from '../build/contracts/Insurance.json'
import getWeb3 from './utils/getWeb3'
import * as flights from './flights.js'

import { Switch, Route } from 'react-router-dom'

import { Home } from './templates/Home';
import { Faq } from './templates/Faq';
import { _404 } from './templates/Errors';

import './App.css'

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

// React component that dislpays an Insurance Policy object
class InsurancePolicyView extends Component {
	render() {
		// A function that creates the desired styling for a column
		var pStyle = function (width) {
			return { display: "inline-block", width: width + "px", "text-align": "center" }
		}
		return (<div>
			<p style={pStyle(this.props.idWidth)}>{this.props.insurance.id}</p><p style={pStyle(this.props.coverWidth)}>{this.props.insurance.currentFundedCover}/{this.props.insurance.totalCoverAmount}</p><p style={pStyle(this.props.premiumWidth)}>{this.props.insurance.premium}</p> <this.props.actionComponent insurance={this.props.insurance} />
		</div>)
	}
}

// React component that displays a list of Insurance Policy View components (see above)
class InsurancePolicyList extends Component {
	render() {
		// Column widths (in pixels)
		var idWidth = 80;
		var coverWidth = 130;
		var premiumWidth = 120;
		// Function that creates the appropriate styling for column headers
		var headerStyle = function (width) {
			return { display: "inline-block", width: width + "px", "text-align": "center" }
		}
		// If there are no insurances to display, give an error message
		if (this.props.insurances.length === 0) {
			return (<h4>No insurances available </h4>)
		}
		// Otherwise return JSX with column widths and map every insurance to an InsurancePolicyView component
		return (
			<div>
				<h2>{this.props.header}</h2>
				<h4 style={headerStyle(idWidth)}>ID</h4>
				<h4 style={headerStyle(coverWidth)}>Cover</h4>
				<h4 style={headerStyle(premiumWidth)}>Premium</h4>
				{this.props.insurances.map(function (insurance) {
					return <InsurancePolicyView key={insurance.id} idWidth={idWidth} coverWidth={coverWidth} premiumWidth={premiumWidth} insurance={insurance} actionComponent={this.props.actionComponent} />
				}.bind(this))}
			</div>
		)
	}
}

// A React component for creating new insurance policie
class InsurancePolicyCreator extends Component {
	constructor(props) {
		super(props)
		this.state = { premium: 0, cover: 0, flight: null, proof: null }
	}

	// Try to parse a number and if succesful, set it as the cover amount
	setCover(cover) {
		var notNum = isNaN(cover)
		if (!notNum) {
			this.setState({ cover: cover })
		}
	}

	// Try to parse a number out and if succesful, set it as the premium amount
	setPremium(premium) {
		var notNum = isNaN(premium)
		if (!notNum) {
			this.setState({ premium: premium })
		}
	}

	setFlight(flight) {
		console.log(flight)
		this.setState({ flight: flight })
	}

	render() {
		return (
			<div>
				<div style={{ display: "inline-block" }}>
					<flights.FlightSelector selectFlight={this.setFlight.bind(this)} />
					<p>I want to be covered to the sum of:</p>
					<input style={{ width: "120px", margin: "0px 20px 0px 0px" }} onChange={(e) => { this.setCover(e.target.value) }}></input>
					<p style={{ display: "inline-block" }}>{this.state.cover}</p>
					<p>I will pay a premium of:</p>
					<input style={{ width: "120px", margin: "0px 20px 0px 0px" }} onChange={(e) => { this.setPremium(e.target.value) }}></input>
					<p style={{ display: "inline-block" }}>{this.state.premium}</p>
					{this.state.flight ? <button style={{ display: "block" }} onClick={() => this.props.addInsurance(this.state.premium, this.state.cover, this.state.flight)}>Add Insurance Policy On Flight Number {this.state.flight.flightNumber}</button> : null}
				</div>
			</div>
		)
	}
}

// Main app that runs everything
class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			storageValue: 0,
			web3: null,
			userUnfilledInsurances: [],
			userFilledInsurances: [],
			availableInsurances: [],
			investedInsurance: []
		}
	}

	componentWillMount() {
		// Get network provider and web3 instance.
		// See utils/getWeb3 for more info.

		getWeb3
			.then(results => {
				this.setState({
					web3: results.web3
				})

				// Instantiate contract once web3 provided.
				this.instantiateContract()
			})
			.catch(() => {
				console.log('Error finding web3.')
			}).then((result) => {
				// Instantiate contract once web3 provided.
				console.log("getting contract")
				return this.getContract()
			}).then((result) => {
				// Callback to re-populate bets after changes
				var getInsurances = function () {
					console.log("insurance change event triggered")
					this.getAllInsurances()
				}.bind(this)
				// Start watching for event with above callback
				this.event = this.insuranceContractInst.InsuranceCoverChange()
				return this.event.watch(getInsurances)
			}).then((result) => {
				// Create a function that regularly checks for changes to account
				this.currAccount = this.state.web3.eth.accounts[0]
				console.log(this.currAccount, this.state.web3.eth.accounts)
				// Update the current account regularly
				this.getCurrAccount = function () {
					if (this.state.web3.eth.accounts[0] !== this.currAccount) {
						this.currAccount = this.state.web3.eth.accounts[0];
						this.getAllInsurances()
					}
				}.bind(this)
				setInterval(this.getCurrAccount, 100)
				return this.getAllInsurances()
			}).then((result) => {
				// Callback to re-populate bets after changes
				var getInsurances = function (err, val, val1) {
					console.log("STATUS ", [val])
				}
				// Start watching for event with above callback
				var event = this.insuranceContractInst.StatusStr()
				return event.watch(getInsurances)
			})
	}

	async getContract() {
		console.log("getting contract")
		const contract = require('truffle-contract')
		this.insuranceContract = contract(Insurance)
		this.insuranceContract.setProvider(this.state.web3.currentProvider)
		this.insuranceContractInst = await this.insuranceContract.deployed()
	}

	async getAllInsurances() {
		console.log("got all insurances");
		// Get the insurance Ids
		var insuranceIds = await this.insuranceContractInst.getInsuranceContracts()
		console.log(insuranceIds);
		var userFilledInsurances = []
		var userUnfilledInsurances = []
		var availableInsurances = []
		var investedInsurance = []

		// Cycle over the ids
		console.log(insuranceIds.length)
		for (var i = 0; i < insuranceIds.length; i++) {
			//console.log(i, insuranceIds.length, p++)
			// Get the insurance object (represented as array) and the contributors array
			var insurance = await this.insuranceContractInst.allInsuranceCovers(insuranceIds[i])
			var contributors = await this.insuranceContractInst.getInsuranceContributors(insuranceIds[i])
			var contributions = await this.insuranceContractInst.getInsuranceContributions(insuranceIds[i])
			insurance.push(contributors)
			//console.log(contributors)
			insurance.push(contributions)
			// Convert the insurance array to a javascript object
			insurance = this.convertInsurance(insurance)
			if (insurance.deleted === false) {
				// If the insurance has not been deleted
				if (insurance.proposer === this.currAccount) {
					// and if it was proposed by the current user
					if (insurance.filled) {
						// and if it is already filled, append it to the users funded Insurances
						userFilledInsurances.push(insurance)
					}
					else {
						//  and if it is not filled, apprent to users unfunded Insurances
						userUnfilledInsurances.push(insurance)
					}
				}
				else {
					// If it was proposed by a different user, work out whether the current user has contributed
					var contributor = false
					for (var j = 0; j < insurance.contributors.length; j++) {
						if (insurance.contributors[j] === this.currAccount) {
							contributor = true
							break
						}
					}
					console.log(contributor, insurance.contributors, insurance)
					if (contributor === true && insurance.filled === true) {
						// If he has and it is filled, add it to the invest insurance list
						investedInsurance.push(insurance)
						console.log("inv", investedInsurance)
					}
					else if (insurance.filled === false) {
						// If it isnt filled, add it to the avaialble list
						availableInsurances.push(insurance)
					}
				}
			}
		}
		this.setState({ userFilledInsurances: userFilledInsurances, userUnfilledInsurances: userUnfilledInsurances, availableInsurances: availableInsurances, investedInsurance: investedInsurance })
	}

	// Function to convert insurance from solidity form to a javscript form
	convertInsurance(insuranceArr) {
		var id = insuranceArr[0].toNumber()
		var proposer = insuranceArr[1]
		var numProviders = insuranceArr[2].toNumber()
		var totalCoverAmount = this.state.web3.fromWei(insuranceArr[3].toNumber(), "ether")
		var currentFundedCover = this.state.web3.fromWei(insuranceArr[4].toNumber(), "ether")
		var premium = this.state.web3.fromWei(insuranceArr[5].toNumber(), "ether")
		var flightId = insuranceArr[6].toNumber()
		var filled = insuranceArr[7]
		var deleted = insuranceArr[8]
		var contributors = insuranceArr[9]
		var contributions = insuranceArr[10]
		for (var i = 0; i < contributions.length; i++) {
			contributions[i] = this.state.web3.fromWei(contributions[i].toNumber(), "ether")
		}
		var insurance = new InsurancePolicy(id, proposer, numProviders, totalCoverAmount, currentFundedCover, premium, flightId, filled, deleted, contributors, contributions);
		return insurance
	}

	// Function to add a new insurance to the blockchain
	async addNewInsurance(premium, cover, flightProof) {
		console.log("adding new insurance");
		var totalCoverAmount = this.state.web3.toWei(cover, "ether")
		var premiumAmount = this.state.web3.toWei(premium, "ether")
		
		var proof = (await flightProof).proof
		console.log(proof, totalCoverAmount, premiumAmount)
		await this.insuranceContractInst.proposeInsuranceCover(proof, totalCoverAmount, { from: this.currAccount, value: premiumAmount });
		console.log("done")
	}

	// Function to remove an insurance from the blockchain
	async removeInsurance(insurance) {
		console.log("removing insurance " + insurance.id);
		this.insuranceContractInst.cancelInsuranceContract(insurance.id, { from: this.currAccount });
	}

	// Function to invest in an insurance
	async investInsurance(insurance, amount) {
		console.log("paying into insurance " + amount)
		this.insuranceContractInst.acceptContract(insurance.id, { from: this.currAccount, value: this.state.web3.toWei(amount, "ether") })
	}

	// Function to claim an unclaimed insurance
	async claimInsurance(insurance) {
		console.log("claiming insurance " + insurance.id, insurance)
		var flight = (await flights.getFlight(insurance.flightId))
		var proof = flight["proof"]
		this.insuranceContractInst.resolveContract(insurance.id, proof, { from: this.currAccount })
	}


	render() {
		// Returns a component class for a button with label text and callback function f called with props.insurance
		var buttonComponentFactory = function (f, text) {
			var buttonComponent = class extends Component {
				render() {
					return (<button onClick={() => f(this.props.insurance)}>{text}</button>)
				}
			}
			return buttonComponent
		}
		// Build a button class for cancelling and one for claiming
		var cancelButtonClass = buttonComponentFactory(this.removeInsurance.bind(this), "Cancel")
		var claimButtonClass = buttonComponentFactory(this.claimInsurance.bind(this), "Claim Payout")
		var app = this
		// Build a component for investing which uses this.props.insurance
		var investComponent = class extends Component {
			constructor(props) {
				super(props)
				this.state = { investement: 0 }
			}
			setInvestement(value) {
				var notNum = isNaN(value)
				if (!notNum) {
					this.setState({ investement: value })
				}
			}
			render() {
				var contributions = 0
				for (var i = 0; i < this.props.insurance.contributors.length; i++) {
					if (this.props.insurance.contributors[i] === app.currAccount) {
						contributions += parseFloat(this.props.insurance.contributions[i])
					}
				}
				return (
					<div style={{ display: "inline-block" }}>
						<button onClick={() => { app.investInsurance(this.props.insurance, this.state.investement) }}>Invest {this.state.investement} ether</button>
						<input style={{ width: "65px" }} placeholder="Stake" onChange={(e) => { this.setInvestement(e.target.value) }}></input>
						{(contributions > 0) ? "(Already invested " + contributions + " ether)" : null}
					</div>
				)
			}
		}

		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/faq" component={Faq} />

				<Route path="/create_insurance" render={() =>
					<div>
						<div className="wrapper style1">
							<div className="inner">
								<section className="container">

									<header className="first major">
										<div className="row">
											<div className="12u">
												<h3>Here you can create a flight insurance request for your next flight</h3>
											</div>
										</div>
									</header>

									<p> 1) Fill in the main details of your flight such as exact time and airport code(e.g. LCY, LHR, LGW).
							<br />
										2) Find your flight and select it from the available options.
							<br />
										3) Fill in the sum you would like to be covered (in ETH).
		    				 <br />
										4) Select premium amount that you would pay to your investors (in ETH).
							 It is in your interest to select higher premium, as in this case it is more likely that someone will accept your request. </p>

									<InsurancePolicyCreator addInsurance={this.addNewInsurance.bind(this)} />

								</section>
							</div>
						</div>
					</div>
				} />

				<Route path="/about" render={() =>
					<div>

						<h2>More Information on FlightDApp</h2>

						<p>This decentralised application on the Ethereum test network (Rinkeby) allows users to take out insurance with other users to protect them against cancelled flights.
				    Using the TLS-N protocol, we allow users to verify whether flights have been cancelled or not. </p>
						<p> we do not have pre-set templates for policies are users are able to dictate their own policies and wait to be funded from other users.</p>
						<p>Having the ability to independently verify information would remove the need for trust in third parties while guaranteeing the validity of the data received over the internet.
				     As a result, it would be possible to automatically feed this information into the blockchain ecosystem and execute contracts on the basis of it. TLS-N, an extension to the existing secure web protocol TLS, achieves this goal.</p>
						<p>It provides a secure, non-repudiable and trivially verifiable proof about the contents (message, time-stamped) of a TLS session, and that the contents have not been tampered with.
					As a result, users no longer need to trust that oracles or intermediaries have not tampered with data, and can automate the execution of their contracts based on the TLS-N verification.</p>

						<p><strong> Main Limitation: </strong> Using a free API for the verification of flight status limits our DApp to propose insurance contracts on flights taking place within three days.</p>

					</div>

				} />

				<Route path="/my_insurances" render={() =>
					<div>
						<div className="wrapper style1">
							<div className="inner">
								<section className="container">

									<header className="first major">
										<div className="row">
											<div className="12u">
												<h3> Here you can observe your submitted requests and their status</h3>
											</div>
										</div>
									</header>

									<InsurancePolicyList header={"Your Insurances"} actionComponent={claimButtonClass} insurances={this.state.userFilledInsurances}></InsurancePolicyList>
								</section>
							</div>
						</div>
					</div>
				} />

				<Route path="/unfunded_insurances" render={() =>
					<div>
						<div className="wrapper style1">
							<div className="inner">
								<section className="container">

									<header className="first major">
										<div className="row">
											<div className="12u">
												<h3>Here you can observe a list of your unfunded insurances</h3>
											</div>
										</div>
									</header>

									<InsurancePolicyList header={"My Unfunded Insurances"} actionComponent={cancelButtonClass} insurances={this.state.userUnfilledInsurances}></InsurancePolicyList>
								</section>
							</div>
						</div>
					</div>
				} />

				<Route path="/invest" render={() =>
					<div>
						<div className="wrapper style1">
							<div className="inner">
								<section className="container">

									<header className="first major">
										<div className="row">
											<div className="12u">
												<h3> Invest in available insurance requests</h3>
											</div>
										</div>
									</header>

									<p> Here you can see a list of submitted flight insurance requests. Please select the desired option and submit your investment request</p>

									<InsurancePolicyList header={"Invest in Insurance"} actionComponent={investComponent} insurances={this.state.availableInsurances}></InsurancePolicyList>
								</section>
							</div>
						</div>
					</div>
				} />

				<Route path="/investments" render={() =>
					<div>
						<div className="wrapper style1">
							<div className="inner">
								<section className="container">

									<header className="first major">
										<div className="row">
											<div className="12u">
												<h3> Submitted Investment requests </h3>
											</div>
										</div>
									</header>

									<InsurancePolicyList header={"Your investments in Insurance"} actionComponent={claimButtonClass} insurances={this.state.investedInsurance}></InsurancePolicyList>
								</section>
							</div>
						</div>
					</div>
				} />

				{/* default route: page not found */}
				<Route component={_404} />

			</Switch>

		);
	}
}

export default App

// <InsurancePolicyList header={"Insurance You Have Invested In"} actionComponent={claimButtonClass} insurances={this.state.investedInsurance}></InsurancePolicyList>


/*
In order:
- nothing working
- need proper proof
- claim insurance not working
- Make sure the flight from flight.flightStatuses[] is correct
Plan:
- Improve the creator
- Improve bet descr (and Styling)
- Need list for insurances you have invested in that are filled
- If nothing is in the list, then display some message
*/
