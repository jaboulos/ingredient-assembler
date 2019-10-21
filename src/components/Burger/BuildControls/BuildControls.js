import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
]

// reusable UI element
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {/* loop through all controls, render build control for each of them */}
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.addIngredientHandler(ctrl.type)}
        removed={() => props.removeIndgredientHandler(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
  </div>
);

export default buildControls;