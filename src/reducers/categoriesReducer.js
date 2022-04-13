const actionType = {
	INIT_CATEGORIES_SUCCESS: "INIT_CATEGORIES_SUCCESS",
	INIT_CATEGORIES_ERROR: "INIT_CATEGORIES_ERROR",
};

const categoriesReducerFunction = (prevCategoriesState, { type, payload }) => {
	switch (type) {
		case actionType.INIT_CATEGORIES_SUCCESS:
			return {
				...prevCategoriesState,
				categories: payload.categories,
				categoriesError: null,
				categoriesLoading: false,
			};

		case actionType.INIT_CATEGORIES_ERROR:
			return {
				...prevCategoriesState,
				categoriesError:
					"Categories could not be loaded. Please try again later.",
				categoriesLoading: false,
			};

		default:
			throw new Error("Unknown action type.");
	}
};

export { categoriesReducerFunction };
