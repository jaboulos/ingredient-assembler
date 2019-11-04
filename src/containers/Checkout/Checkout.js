import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

// import * as actions from "../../store/actions/index";

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		// if you click cancel go back to the previous page
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		// change the current route
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		// Redirect if no ingredients
		let summary = <Redirect to="/" />;

		// if ingredients are available, show checkout summary
		if (this.props.ings) {
			let purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>

					<Route
						path={this.props.match.path + "/contact-data"}
						component={ContactData}
					/>
				</div>
			);
		}

		return <div>{summary}</div>;
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(Checkout);
