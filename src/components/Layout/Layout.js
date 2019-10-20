import React from 'react';

import Aux from '../../hoc/Aux';

const layout = (props) => (
  <Aux>
    <div>
      {/* Div will be replaced with 3 components */}
      Toolbar, SideDrawer, Backdrop
    </div>
    <main>
      {/* output components wrapped by this layout component with props.children */}
      {props.children}
    </main>
  </Aux>
);

export default layout;