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
				}
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				}
			};
		default:
			return state;
	}
};

export default reducer;
