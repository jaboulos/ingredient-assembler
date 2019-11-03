import * as actionTypes from './actionTypes';

// actionCreator for adding ingredients
export const addIngredient =  (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
}
// actionCreator for removing ingredients
export const removeIngredient =  (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
}