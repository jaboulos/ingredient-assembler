import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
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
        {/* Graphical representation with all ingredients */}
        <Burger
          ingredients={this.state.ingredients}
        />
        {/* Add and remove ingredients */}
        <BuildControls
          addIngredientHandler = {this.addIngredientHandler}
          removeIndgredientHandler = { this.removeIndgredientHandler}
          disabled = {disabledInfo}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;