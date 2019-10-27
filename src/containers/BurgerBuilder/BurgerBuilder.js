import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

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
    ingredients: [],
    totalPrice: 4,
    // becomes true if at least 1 ingredient has been added
    purchasable: false,
    // hide show modal
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get('https://react-ingredient-builder.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        this.setState({
          error: true
        })
      })
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

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    // set loader state to true
    // this.setState({
    //   loading: true
    // })
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Joe Test',
    //     address: {
    //       street: 'Test street 1',
    //       zipcode: '12345',
    //       country: 'USA'
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: '2 day'
    // }

    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     })
    //     console.log(error)
    //   })

    // switch the page and push this page on top of the stack of pages
    this.props.history.push('/checkout');
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

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cannot be loaded...</p> : <Spinner />

    // If this.state.ingredients is not null from the backend then set burger equal to this stuff
    if(this.state.ingredients) {
      burger = (
        <Aux>
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
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    // Show spinner if loading, if not loading show order modal
    if (this.state.loading) {
      orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);