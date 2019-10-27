import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  render() {
    return (
      <Aux>
      <Toolbar />
      <SideDrawer
        open = {this.state.showSideDrawer}
        closed = { this.sideDrawerClosedHandler }
      />
      <main className={classes.Content}>
        {/* output components wrapped by this layout component with props.children */}
        {this.props.children}
      </main>
    </Aux>
    )
  }
}

export default Layout;