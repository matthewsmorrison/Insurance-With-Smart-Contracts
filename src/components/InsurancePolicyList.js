// React component that displays a list of Insurance Policy View components (see above)
class InsurancePolicyList extends Component {
    constructor(props) {
	super(props)
    }
    render() {
	// Column widths (in pixels)
	var idWidth = 80;
	var coverWidth = 130;
	var premiumWidth = 120;
	// Function that creates the appropriate styling for column headers
	var headerStyle = function(width) {
	    return {display:"inline-block", width:width+"px", "text-align":"center"}
	}
	// If there are no insurances to display, give an error message
	if (this.props.insurances.length == 0) {
	    return ( <h4>No insurances available </h4>)
	}
	// Otherwise return JSX with column widths and map every insurance to an InsurancePolicyView component
	return (
		<div>
		<h2>{this.props.header}</h2>
		<h4 style={headerStyle(idWidth)}>ID</h4>
		<h4 style={headerStyle(coverWidth)}>Cover</h4>
		<h4 style={headerStyle(premiumWidth)}>Premium</h4>
	    {this.props.insurances.map( function(insurance) {
		return <InsurancePolicyView key={insurance.id} idWidth={idWidth} coverWidth={coverWidth} premiumWidth={premiumWidth} insurance={insurance} actionComponent={this.props.actionComponent}/>
		}.bind(this))}
	    </div>
	)
    }
}