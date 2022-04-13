import React from "react";

import { CategoryItem } from "../CategoryItem";
import { useCategories } from "contexts/categories-context";
import "../categories.css";

const CategoryList = () => {
	const { categories, categoriesLoading, categoriesError } = useCategories();
	return (
		<section className="category-list container flex-col flex-align-center flex-justify-center p-3">
			{categoriesLoading ? (
				<h3 className="text-center success-color">
					Loading Categories...
				</h3>
			) : categoriesError ? (
				<h3 className="text-center error-color">{categoriesError}</h3>
			) : (
				<div className="category-container my-3">
					<h3 className="section-head mb-3 text-center">Categories</h3>
					<div className="category-list-wrapper">
						{categories.map((category) => (
							<CategoryItem category={category} />
						))}
					</div>
				</div>
			)}
		</section>
	);
};

export { CategoryList };
