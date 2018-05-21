// React component that dislpays an Insurance Policy object
class InsurancePolicyView extends Component {
    constructor(props) {
	super(props)
    }
    render() {
	// A function that creates the desired styling for a column
	var pStyle = function(width) {
	    return {display:"inline-block", width:width+"px", "text-align":"center"}
	}
	return ( <div>
		 <p style={pStyle(this.props.idWidth)}>{this.props.insurance.id}</p><p style={pStyle(this.props.coverWidth)}>{this.props.insurance.currentFundedCover}/{this.props.insurance.totalCoverAmount}</p><p style={pStyle(this.props.premiumWidth)}>{this.props.insurance.premium}</p> <this.props.actionComponent insurance={this.props.insurance}/>
		 </div> )
    }
}