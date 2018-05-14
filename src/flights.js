import React, { Component } from 'react'

var flightAPI = {appId:"179cfd47", appKey:"be8298ebb8269c37a0130fa63128610f"}

// Function that produces an array with integers steps between start and end
function rangeArray(start, end) {
    var arr = []
    for (var i=start; i <= end; i++) {
	arr.push(i)
    }
    return arr
}


function buf2hex(buffer) {
    // create a byte array (Uint8Array) that we can read the array buffer
    const byteArray = new Uint8Array(buffer);
    
    // for each element, we want to get itsa two-digit hexadecimal representation
    const hexParts = [];
    for (let i = 0; i < byteArray.length; i++) {
	// convert value to hex
	const hex = byteArray[i].toString(16);
	// and add \x in front of every hex
	const paddedHex = ('\\x') + ('00' + hex).slice(-2);
	hexParts.push(paddedHex);
    }
    // join the parts
    return hexParts.join('');
}

// Gets single flight api proof
async function getFlight(id) {
    var url = "https://flightstats.glitch.me/flex/flightstatus/rest/v2/json/flight/status/" + id
    var results = await fetch(url)
    var obj = await results.json()
    console.log(obj["flightStatus"])
    var proofUrl = "https://tlsproof.bastien.tech/proofgen.py?proof_type=2&url=" + "https://flightstats.glitch.me/flex/flightstatus/rest/v2/json/flight/status/" + id
    var response = await fetch(proofUrl)
    var buf = await response.arrayBuffer()
    // Converts proof to expected hex format
    var proof = buf2hex(buf)
    proof = "0x"+proof.split("\\x").join("")
    return {data:obj["flightStatus"], proof:proof}
}

// React component for selecting a flight
export class FlightSelector extends Component {
    
    constructor(props) {
	super(props);
	this.hour = 0
	this.month = 1
	this.day = 1
	this.year = 2018
	this.airportCode = ""
	this.state={airportCode:this.airportCode, hour:this.hour, day:this.day, month:this.month, year:this.year, flights:[], selectedFlight:null}

    }
    // Function that makes the call to the api and stores the flights it gets back
    async search() {
	var base = "https://flightstats.glitch.me/flex/schedules/rest/v1/json/from/"
	var url = base + this.airportCode + "/departing/" + this.year + "/" + this.month + "/" + this.day + "/" + this.hour
	console.log(url)
	var myHeaders = new Headers({})
	var fetchData = {
            method: 'GET',
            headers: myHeaders,
	};
	var myReq = new Request(url, fetchData)
	var results = await fetch(myReq)
	var obj = await results.json()
	var flights = obj["scheduledFlights"]
	console.log(obj, flights)
	this.setState({airportCode:this.airportCode, hour:this.hour, day:this.day, month:this.month, year:this.year, flights:flights, selectedFlight:null})
    }
    
    // Function that selects a particular flight from the list
    async selectFlight(flight) {
	console.log(flight)
	var url = "https://flightstats.glitch.me/flex/flightstatus/rest/v2/json/flight/status/" + flight.carrierFsCode + "/" + flight.flightNumber + "/arr/" + this.year + "/" + this.month + "/" + this.day
	var myHeaders = new Headers({})
	var fetchData = {
            method: 'GET',
            headers: myHeaders,
	};
	var myReq = new Request(url, fetchData)
	var results = await fetch(myReq)
	console.log(url)
	var obj = await results.json()
	console.log(obj)
	var statuses = obj["flightStatuses"]
	if (statuses.length > 0) {
	    var id = statuses[0].flightId
	    flight = await getFlight(id)
	    this.props.selectFlight(flight)
	    this.setState({flights:[]})
	}
    }
    
    render() {
	var numberWidth = 120
	var depTimeWidth = 240
	var arrivalWidth = 120
	var arrivalTimeWidth = 240
	// Function that creates a column header of a given width
	var columnHeader = function(text, width) {
	    return (<h4 style={{display:"inline-block", width:width+"px", "text-align":"center"}}>{text}</h4>)
	}
	// Function that creates a column entry of a given width
	var columnEntry = function(text, width) {
	    return (<p style={{display:"inline-block", width:width+"px", "text-align":"center"}}>{text}</p>)
	}
	return (<div>
		
		<select onChange={(i) => {this.hour = i.target.value}}>
		<option value="" disabled="disabled" selected="selected" >Hour</option>
		{rangeArray(0,23).map(function(i) { return (<option value={i}>{i}</option>) } )}
		</select>
		
		<select onChange={(i) => {this.day = i.target.value}}>
		<option value="" disabled="disabled" selected="selected" >Day</option>
		{rangeArray(1,31).map(function(i) { return (<option value={i}>{i}</option>) })}
		</select>
		
		<select onChange={(i) => {this.month = i.target.value}}>
		<option value="" disabled="disabled" selected="selected">Month</option>
		{rangeArray(1,12).map(function(i) { return (<option value={i}>{i}</option>) })}
		</select>
		
		<select onChange={(i) => {this.year = i.target.value}}>
		<option value="" disabled="disabled" selected="selected">Year</option>
		{rangeArray(2018,2028).map(function(i) { return (<option value={i}>{i}</option>) })}
		</select >

		<input placeholder="Airport Code" style={{width:"97px"}} onChange={(i) => {this.airportCode = i.target.value}}></input>

		<button onClick={() => this.search()}>Search</button>

		<h4>Results for flights from airport {this.state.airportCode} between {this.state.hour} and {parseInt(this.state.hour)+1} hours on {this.state.day}/{this.state.month}/{this.state.year} ({this.state.flights.length} results sorted by destination)</h4>
		{this.state.flights.length ? columnHeader("Flight Number", numberWidth) : null}
		{this.state.flights.length ? columnHeader("Final Destination", arrivalWidth) : null}
		{this.state.flights.length ? columnHeader("Departure Time", depTimeWidth) : null}
		{this.state.flights.length ? columnHeader("Arrival Time", arrivalTimeWidth) : null}
		{this.state.flights.map(function(flight) {
		    return (<div>{columnEntry(flight.flightNumber,numberWidth)}
			    {columnEntry(flight.arrivalAirportFsCode, arrivalWidth)}
			    {columnEntry(flight.departureTime,depTimeWidth)}
			    {columnEntry(flight.arrivalTime, arrivalTimeWidth)}
			    <button onClick={() => this.selectFlight(flight)}>Select Flight</button></div>) 
		}.bind(this))}
	       </div>);
    }
}

// curl -v  -X GET "https://api.flightstats.com/flex/schedules/rest/v1/json/from/LGW/departing/2018/5/31/12?appId=179cfd47&appKey=be8298ebb8269c37a0130fa63128610f"

// Have a list of results, with the search fileds at the top "Search for flights from X at Y"
