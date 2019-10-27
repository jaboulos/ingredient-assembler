import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     error: null
    //   }
    // }

    state = {
      error: null
    }

    componentWillMount () {
      axios.interceptors.request.use(req => {
        this.setState({
          error: null
        })
        return req;
      })
      axios.interceptors.response.use(response => response, error => {
        this.setState({
          error: error
        })
      })
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      })
    }

    render() {
      return (
        <Aux>
          <Modal
            show = {this.state.error}
            modalClosed = {this.errorConfirmedHandler}
          >
            Something went wrong...
            <br></br>
            {this.state.error ? this.state.error.message : null }
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;