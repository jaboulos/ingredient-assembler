import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  checkoutCancelledHandler = () => {
    // if you click cancel go back to the previous page
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    // change the current route
    this.props.history.replace('/checkout/contact-data');
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {}

    for(let param of query.entries()) {
      // ['salad', '1']
      ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: ingredients
    })
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients = {this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    )
  }
}

export default Checkout;