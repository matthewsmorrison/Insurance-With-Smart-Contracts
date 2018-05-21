// React component for selecting a flight

import { getFlight, search } from '../utils/api';
export class FlightSelector extends Component {

    constructor(props) {
		super(props);
		this.hour = 0
		this.month = 1
		this.day = 1
		this.year = 2018
		this.airportCode = ""
		this.state={
			airportCode:this.airportCode, 
			hour:this.hour, 
			day:this.day, 
			month:this.month, 
			year:this.year, 
			flights:[], 
			selectedFlight:null}

    }

    // Function that makes the call to the api and stores the flights it gets back
    async search() {
		let base = "https://flightstats.glitch.me/flex/schedules/rest/v1/json/from/"
		let url = base + this.airportCode + "/departing/" + this.year + "/" + this.month + "/" + this.day + "/" + this.hour
		console.log(url)
		let myHeaders = new Headers({})
		let fetchData = {
	            method: 'GET',
	            headers: myHeaders,
		};
		let myReq = new Request(url, fetchData)
		let results = await fetch(myReq)
		let obj = await results.json()
		let flights = obj["scheduledFlights"];
		console.log(obj, flights);
		this.setState({flights:flights});
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
	return (
		<div>
		<div style={{display:"inline-block"}}>

		<select style={{ margin:"2px 2px 10px 2px"}} onChange={(i) => {this.hour = i.target.value}}>
		<option value="" disabled="disabled" selected="selected" >Hour</option>
		{rangeArray(0,23).map(function(i) { return (<option value={i}>{i}</option>) } )}
		</select>

		<select style={{ margin:"2px 2px 10px 2px"}} onChange={(i) => {this.day = i.target.value}}>
		<option value="" disabled="disabled" selected="selected" >Day</option>
		{rangeArray(1,31).map(function(i) { return (<option value={i}>{i}</option>) })}
		</select>

		<select style={{ margin:"2px 2px 10px 2px"}} onChange={(i) => {this.month = i.target.value}}>
		<option value="" disabled="disabled" selected="selected">Month</option>
		{rangeArray(1,12).map(function(i) { return (<option value={i}>{i}</option>) })}
		</select>

		<select style={{ margin:"2px 2px 10px 2px"}} onChange={(i) => {this.year = i.target.value}}>
		<option value="" disabled="disabled" selected="selected">Year</option>
		{rangeArray(2018,2028).map(function(i) { return (<option value={i}>{i}</option>) })}
		</select >

		<input placeholder="Airport Code" style={{width:"97px"}} onChange={(i) => {this.airportCode = i.target.value}}></input>

		<Button style={{ margin:"2px 2px 10px 2px"}} bsStyle ="primary" onClick={() => this.search()}>Search</Button>

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
		</div>
	    </div>);
    }
}


