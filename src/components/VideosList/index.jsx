import React from "react";

import { VideoCard } from "components";
import { useVideos } from "contexts";

const VideosList = () => {
	const { videos } = useVideos();

	const videosMapping = videos.map(({ _id, creator, title }) => (
		<VideoCard
			key={_id}
			videoId={_id}
			videoCreator={creator}
			videoTitle={title}
		/>
	));

	return <section className="videos-list-container">{videosMapping}</section>;
};

export { VideosList };
