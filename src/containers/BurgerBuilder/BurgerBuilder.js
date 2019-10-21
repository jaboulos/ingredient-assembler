import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// global constant
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state {

  //   }
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    // becomes true if at least 1 ingredient has been added
    purchasable: false
  }

  updatePurchaseState (updatedCopiedState) {
    // turn ingredients object into an array of values
    const sum = Object.keys(updatedCopiedState)
    // map ingredients array into new array with values instead of keys
    .map(igKey => {
      // return old value with new value (key replaced by value in new array)
      // igKey is the keys specified in state, ingredients[igKey] gives the value
      return updatedCopiedState[igKey];
    })
    // reduce the values of the array into a sum
    // reduce takes a function as first argument and initial value of 0
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    // sum > 0 is either True or False, therefore value in state is set to true or false
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    // update state in immutable way
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    // update total price with price of each ingredient that is added
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    // call updatePurchaseState after calling removeIngredientHandler or addIngredientHandler
    this.updatePurchaseState(updatedIngredients);
  }

  removeIndgredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if(oldCount <=0) {
      return;
    }
    const updatedCount = oldCount - 1;
    // update state in immutable way
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    // update total price with price of each ingredient that is added
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    // call updatePurchaseState after calling removeIngredientHandler or addIngredientHandler
    this.updatePurchaseState(updatedIngredients);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      // check if the key is 0 or less
      // sets the value to true or false instead of a number
      // add disabled property to <BuildControls />
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // {salad: true, meat: false, ...etc}
    return (
      <Aux>
        <Modal>
          <OrderSummary
            ingredients={this.state.ingredients}
          />
        </Modal>
        {/* Graphical representation with all ingredients */}
        <Burger
          ingredients={this.state.ingredients}
        />
        {/* Add and remove ingredients */}
        <BuildControls
          addIngredientHandler = {this.addIngredientHandler}
          removeIndgredientHandler = { this.removeIndgredientHandler}
          disabled = {disabledInfo}
          purchasable = {this.state.purchasable}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;