import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street Address'
        },
        value: ''
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zipcode'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'Fastest', displayValue: 'Fastest'},
            {value: 'Standard', displayValue: 'Standard'},
            {value: 'Cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: ''
      },
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
    const formElementsArray = [];
    // transform state object into an array
    for(let key in this.state.orderForm) {
      // push new object into formElementsArray
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form>

            {formElementsArray.map(formElement => (
              <Input

                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
              />
            ))}

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