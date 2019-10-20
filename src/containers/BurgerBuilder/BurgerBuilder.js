import React, { Component } from 'react';

import Aux from '../../hoc/Aux';

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        {/* Graphical representation with all ingredients */}
        <div>Burger</div>
        {/* Add and remove ingredients */}
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;