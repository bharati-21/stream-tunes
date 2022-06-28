import React, { useEffect } from "react";

import {
	CategoryFiltersList,
	Loader,
	SortingOptionsList,
	VideosList,
} from "components";
import { useCategories, useVideos } from "contexts";
import "./explore.css";
import { getFilteredSortedVideos } from "utils";
import { useDocumentTitle } from "custom-hooks";

const Explore = () => {
	const { categoriesLoading, categoriesError, selectedCategory } =
		useCategories();
	const {
		videosLoading,
		videosError,
		videos,
		videosDispatch,
		videosSortOption,
		videosSearchText,
	} = useVideos();

	const filteredSortedVideos = getFilteredSortedVideos(
		videos,
		videosSearchText,
		selectedCategory,
		videosSortOption
	);

	const setDocumentTitle = useDocumentTitle();
	useEffect(() => setDocumentTitle("StreamTunes | Explore"), []);

	return (
		<main className="main explore-main">
			{videosError || categoriesError ? (
				<h3 className="text-center mx-auto px-3 error-color">
					Videos could not be loaded. Try again after sometime.
				</h3>
			) : videosLoading || categoriesLoading ? (
				<Loader />
			) : (
				<div className="container flex-col flex-align-start flex-justify-start py-1-5 px-3">
					<div className="filters-sort-container flex-col flex-align-start flex-justify-start">
						<CategoryFiltersList />
						<SortingOptionsList />
					</div>
					{filteredSortedVideos?.length ? (
						<h5>
							{filteredSortedVideos?.length > 1
								? "Videos"
								: "Video"}
							: {filteredSortedVideos?.length}
						</h5>
					) : null}
					<VideosList videos={filteredSortedVideos} />
				</div>
			)}
		</main>
	);
};

export { Explore };
