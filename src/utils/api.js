    // Function that makes the call to the api and stores the flights it gets back
    

var flightAPI = {appId:"179cfd47", appKey:"be8298ebb8269c37a0130fa63128610f"}
let myHeaders = new Headers({})

function getFlightUrl(id) {
	return `https://flightstats.glitch.me/flex/flightstatus/rest/v2/json/flight/status/${id}?minify=true`;
}

function get(url, newHeaders) {
	return fetch(url, {
		method: 'GET',
		headers: newHeaders
	});
}

function getProofUrl(url) {
	return `https://tlsproof.bastien.tech/proofgen.py?proof_type=2&url=${url}`;
}

// Gets single flight api proof
export async function getFlight(id) {
    let url = getFlightUrl(id);
    let results = await fetch(url)
    let obj = await results.json()

    console.log(obj["flightStatus"])

    let proofUrl = getProofUrl(url);
    let response = await get(proofUrl, {});

    let buf = await response.arrayBuffer();
    // Converts proof to expected hex format
    let proof = buf2hex(buf);
    proof = "0x"+proof.split("\\x").join("")

    console.log(proofUrl, {data:obj, proof:proof})
    return {data:obj, proof:proof}
}



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



export async function search(airportCode, year, month, day, hour) {
	let base = "https://flightstats.glitch.me/flex/schedules/rest/v1/json/from/";
	let url = base + airportCode + "/departing/" + year + "/" + month + "/" + day + "/" + hour;

	let results = await get(url, {});
	let obj = await results.json();
	let flights = obj["scheduledFlights"];
	console.log(obj, flights);
	return flights;
    }

// I think his needs to be in ComponentsFunction that selects a particular flight from the list
export async function selectFlight(flight, year, month, hour) {
	console.log(flight)
	let url = "https://flightstats.glitch.me/flex/flightstatus/rest/v2/json/flight/status/" + flight.carrierFsCode + "/" + flight.flightNumber + "/arr/" + year + "/" + month + "/" + day;

	let results = await get(url, {})
	console.log(url)
	let obj = await results.json()
	console.log(obj)
	let statuses = obj["flightStatuses"]
	if (statuses.length > 0) {
	    let id = statuses[0].flightId
	    flight = await getFlight(id)
	    this.props.selectFlight(flight)
	    this.setState({flights:[]})
	}
    }




