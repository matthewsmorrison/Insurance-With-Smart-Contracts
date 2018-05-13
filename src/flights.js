import React, { Component } from 'react'

var flightAPI = {appId:"179cfd47", appKey:"be8298ebb8269c37a0130fa63128610f"}
function rangeArray(start, end) {
    var arr = []
    for (var i=start; i <= end; i++) {
	arr.push(i)
    }
    return arr
}

export class FlightSelector extends Component {
    constructor(props) {
	super(props);
	this.hour = 0
	this.month = 1
	this.day = 1
	this.year = 2018
	this.airportCode = ""
	this.state={airportCode:this.airportCode, hour:this.hour, day:this.day, month:this.month, year:this.year, flightList:[]}
    }
    async search() {
	var base = "https://api.flightstats.com/flex/schedules/rest/v1/json/from/"
	var url = base + this.airportCode + "/departing/" + this.year + "/" + this.month + "/" + this.day + "/" + this.hour
	var myHeaders = new Headers({
	    //'X-Auth-Token':football.authToken,
	    "Access-Control-Allow-Origin": "*",
	    "Access-Control-Allow-Methods": "GET",
	    "Access-Control-Allow-Headers": "Content-Type",
	    "Access-Control-Request-Headers": "X-Requested-With, accept, content-type"
	    //'X-Response-Control':'minified'
	})
	var fetchData = {
            method: 'GET',
            headers: myHeaders,
	};
	var myReq = new Request(url, fetchData)
	var results = await fetch(myReq)
	console.log(results)
	this.setState({airportCode:this.airportCode, hour:this.hour, day:this.day, month:this.month, year:this.year})
    }
    render() {
	
	return (<div>
		<p>Hi</p>
		<select onChange={(i) => {this.hour = i.target.value}}>
		<option value="" disabled="disabled" selected="selected" >Hour</option>
		{rangeArray(0,23).map(function(i) { return (<option value={i}>{i}</option>) })}
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
		<h4>Results for flights from airport {this.state.airportCode} between {this.state.hour} and {parseInt(this.state.hour)+1} hours on {this.state.day}/{this.state.month}/{this.state.year}</h4>
	       </div>);
    }
}

// curl -v  -X GET "https://api.flightstats.com/flex/schedules/rest/v1/json/from/LGW/departing/2018/5/31/12?appId=179cfd47&appKey=be8298ebb8269c37a0130fa63128610f"

// Have a list of results, with the search fileds at the top "Search for flights from X at Y"
