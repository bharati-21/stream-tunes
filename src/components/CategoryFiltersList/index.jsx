import React from "react";
import { v4 as uuid } from "uuid";

import { useCategories } from "contexts";

const CategoryFiltersList = () => {
	const { categories, categoriesLoading } = useCategories();

	const buttonDisabled = categoriesLoading ? "btn-disabled" : "";

	const categoryMapping = [
		{ _id: uuid(), categoryName: "All" },
		...categories,
	].map(({ categoryName, _id }) => (
		<button className={`btn btn-link ${buttonDisabled}`} key={_id}>
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
