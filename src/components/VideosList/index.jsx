import React from "react";

import { VideoCard } from "components";
import { useInfiniteScroll } from "custom-hooks";
import InfiniteLoader from "assets/images/infinite-loader.svg";

const VideosList = ({ videos }) => {
	const { pageNumber, loading, lastElementReference, hasMoreVideos } =
		useInfiniteScroll(videos);

	const videosToDisply = videos?.slice(0, pageNumber * 5);

	const showLoader = () =>
		videosToDisply?.length &&
		hasMoreVideos &&
		loading &&
		videosToDisply?.length !== videos?.length;

	const videosMapping = videosToDisply.map((video) => (
		<VideoCard key={video._id} video={video} />
	));

	return (
		<section className="videos-list-container">
			{videosMapping}
			<div className="infinite-scroll-loader" ref={lastElementReference}>
				{showLoader() ? (
					<img
						src={InfiniteLoader}
						className="img-responsive"
						alt="Infinite Loader Icon"
					/>
				) : null}
			</div>
		</section>
	);
};

export { VideosList };
