import * as actionTypes from "./actions";

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 4
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

// create reducer
// manage ingredients state with reducer
const reducer = (state = initialState, action) => {
	// switch action type
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				// copy state
				...state,
				ingredients: {
					// deep clone objects in state
					...state.ingredients,
					// overide given ingredient that we get as a payload from action
					// ingredientName is a payload from action
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			};
		default:
			return state;
	}
};

export default reducer;
