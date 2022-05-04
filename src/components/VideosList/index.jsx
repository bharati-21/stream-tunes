import React from "react";

import { VideoCard } from "components";

const VideosList = ({ videos }) => {

	const videosMapping = videos.map(video => (
		<VideoCard
			key={video._id}
			video={video}
		/>
	));

	return <section className="videos-list-container">{videosMapping}</section>;
};

export { VideosList };
