import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';

const layout = (props) => (
  <Aux>
    <div>
      {/* Div will be replaced with 3 components */}
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className={classes.Content}>
      {/* output components wrapped by this layout component with props.children */}
      {props.children}
    </main>
  </Aux>
);

export default layout;