import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);

    // set loader state to true
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Joe Test',
        address: {
          street: 'Test street 1',
          zipcode: '12345',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: '2 day'
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
        })
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({
          loading: false,
        })
        console.log(error)
      })
  }

  render() {
    let form = (
      <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Name..."
          />
          <input
            className={classes.Input}
            type="text"
            name="email"
            placeholder="Email..."
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street..."
          />
          <input
            className={classes.Input}
            type="text"
            name="postal"
            placeholder="zip..."
          />

          <Button
            btnType="Success"
            clicked={this.orderHandler}
          >ORDER</Button>
        </form>
    );

    if(this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data...</h4>
        { form }
      </div>
    );
  }
}

export default ContactData;