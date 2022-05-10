import { categoriesActionTypes as actionTypes } from "../constants";

const categoriesReducerFunction = (prevCategoriesState, { type, payload }) => {
	switch (type) {
		case actionTypes.INIT_CATEGORIES_SUCCESS:
			return {
				...prevCategoriesState,
				categories: payload.categories,
				categoriesError: null,
				categoriesLoading: false,
			};

		case actionTypes.INIT_CATEGORIES_ERROR:
			return {
				...prevCategoriesState,
				categoriesError:
					"Categories could not be loaded. Please try again later.",
				categoriesLoading: false,
			};

		case actionTypes.SET_SELECTED_CATEGORY:
			return {
				...prevCategoriesState,
				selectedCategory: payload.selectedCategory,
			};

		default:
			throw new Error("Unknown action type.");
	}
};

export { categoriesReducerFunction };
