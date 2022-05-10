import { createContext, useContext, useEffect, useReducer } from "react";

import { categoriesReducerFunction } from "reducers";
import { getCategories } from "services";

const initialCategories = {
	categories: [],
	categoriesError: null,
	categoriesLoading: true,
    selectedCategory: "All"
};
const CategoriesContext = createContext(initialCategories);

const { Provider } = CategoriesContext;

const CategoriesProvider = ({ children }) => {
	const [categoriesState, categoriesDispatch] = useReducer(
		categoriesReducerFunction,
		initialCategories
	);

	const getCategoriesServiceCall = async () => {
		try {
			const {
				data: { categories },
			} = await getCategories();

			categoriesDispatch({
				type: "INIT_CATEGORIES_SUCCESS",
				payload: { categories },
			});
		} catch (error) {
			categoriesDispatch({
				type: "INIT_CATEGORIES_ERROR",
			});
		}
	};

	useEffect(() => {
		getCategoriesServiceCall();
	}, []);

	return (
		<Provider value={{ ...categoriesState, categoriesDispatch }}>
			{children}
		</Provider>
	);
};

const useCategories = () => useContext(CategoriesContext);

export { useCategories, CategoriesProvider };
