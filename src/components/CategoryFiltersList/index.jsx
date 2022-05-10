import React from "react";
import { v4 as uuid } from "uuid";

import { useCategories } from "contexts";

const CategoryFiltersList = () => {
	const { categories, categoriesDispatch, selectedCategory } =
		useCategories();

	const handleCategoryChange = (categoryName) => {
		categoriesDispatch({
			type: "SET_SELECTED_CATEGORY",
			payload: { selectedCategory: categoryName },
		});
	};

	const categoryMapping = [
		{ _id: uuid(), categoryName: "All" },
		...categories,
	].map(({ categoryName, _id }) => (
		<button
			className={`${
				selectedCategory === categoryName
					? "btn btn-link selected-category"
					: "btn btn-link"
			}`}
			key={_id}
			onClick={(e) => handleCategoryChange(categoryName)}
		>
			<span className="badge badge-primary round-pill px-1 text-sm py-0-25">
				{categoryName}
			</span>
		</button>
	));

	return (
		<section className="category-list flex-row flex-align-center flex-justify-start flex-wrap">
			{categoryMapping}
		</section>
	);
};

export { CategoryFiltersList };
