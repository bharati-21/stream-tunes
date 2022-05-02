import { CategoryFiltersList, Loader, VideosList } from "components";
import { useCategories, useVideos } from "contexts";
import React from "react";
import "./explore.css";

const Explore = () => {
	const { categoriesLoading, categoriesError } = useCategories();
	const { videosLoading, videosError, videos } = useVideos();
    
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
					<CategoryFiltersList />
					<VideosList videos={videos} />
				</div>
			)}
		</main>
	);
};

export { Explore };
