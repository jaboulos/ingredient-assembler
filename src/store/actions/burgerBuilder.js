import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

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

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    // payload response.data
    ingredients: ingredients
  }
}

// handler if async request fails
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

// fetching ingredients asynchronously
export const initIngredients = () => {
  return dispatch => {
		axios.get('https://react-ingredient-builder.firebaseio.com/ingredients.json')
		  .then(response => {
        dispatch(setIngredients(response.data))
		  })
		  .catch(error => {
        dispatch(fetchIngredientsFailed())
		  })
  }
}