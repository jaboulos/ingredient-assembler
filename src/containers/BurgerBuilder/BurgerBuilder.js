import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";

import * as burgerBuilderActions from '../../store/actions/index.js'

class BurgerBuilder extends Component{
	// constructor(props) {
	//   super(props);
	//   this.state {

	//   }
	// }
	state = {
		// becomes true if at least 1 ingredient has been added
		purchasable: false,
		// hide show modal
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		// axios.get('https://react-ingredient-builder.firebaseio.com/ingredients.json')
		//   .then(response => {
		//     this.setState({
		//       ingredients: response.data
		//     })
		//   })
		//   .catch(error => {
		//     this.setState({
		//       error: true
		//     })
		//   })
	}

	updatePurchaseState(ingredients) {
		// turn ingredients object into an array of values
		const sum = Object.keys(ingredients)
			// map ingredients array into new array with values instead of keys
			.map(igKey => {
				// return old value with new value (key replaced by value in new array)
				// igKey is the keys specified in state, ingredients[igKey] gives the value
				return ingredients[igKey];
			})
			// reduce the values of the array into a sum
			// reduce takes a function as first argument and initial value of 0
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		// sum > 0 is either True or False, therefore value in state is set to true or false
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	};

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			// check if the key is 0 or less
			// sets the value to true or false instead of a number
			// add disabled property to <BuildControls />
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.error ? (
			<p>Ingredients cannot be loaded...</p>
		) : (
			<Spinner />
		);

		// If this.state.ingredients is not null from the backend then set burger equal to this stuff
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					{/* Add and remove ingredients */}
					<BuildControls
						addIngredientHandler={this.props.onIngredientAdded}
						removeIndgredientHandler={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCancelHandler={this.purchaseCancelHandler}
					purchaseContinueHandler={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		// Show spinner if loading, if not loading show order modal
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{/* Show Spinner component OR order summary */}
					{orderSummary}
				</Modal>
				{/* Show spinner if backend values for ingredients is null */}
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	// define which props hold which slice of the state
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

const mapDispatchToProps = dispatch => {
	// return an opbject with props function matching
	return {
		onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
