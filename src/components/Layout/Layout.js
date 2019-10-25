import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={classes.Content}>
      {/* output components wrapped by this layout component with props.children */}
      {props.children}
    </main>
  </Aux>
);

export default layout;