import { useCategories } from "contexts";
import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
	const { _id, categoryName, categoryImg } = category;

	const { categoriesDispatch } = useCategories();

	const handleCategoryItemSelection = (event) => {
		categoriesDispatch({
			type: "SET_SELECTED_CATEGORY",
			payload: { selectedCategory: categoryName },
		});
	};

	return (
		<Link
			to={`/explore/`}
			onClick={handleCategoryItemSelection}
			className="card category-item flex-col flex-align-center flex-justify-center"
		>
			<div className="card-header">
				<img
					src={categoryImg}
					alt={`${categoryName} cover image `}
					className="card-img img-responsive"
				/>
			</div>
			<div className="card-body flex-col flex-align-center flex-justify-center">
				<h4 className="card-title border-bottom-primary">
					{categoryName}
				</h4>
			</div>
		</Link>
	);
};

export { CategoryItem };
