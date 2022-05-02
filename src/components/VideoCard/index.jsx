import React from "react";
import { MoreVert } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const VideoCard = ({ videoId, videoCreator, videoTitle }) => {
	const videoCreatorWords = videoCreator.split(/\s|-/, 3);
	const videoCreatorAbbreviation = videoCreatorWords
		.map((word) => word[0].toUpperCase())
		.join("");

	return (
		<NavLink
			to={`/video/${videoId}`}
			className="card card-vertical video-container video-card flex-col flex-align-center flex-justify-between br-2"
		>
			<div className="card-header br-2">
				<img
					src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
					alt={`${videoTitle} cover`}
					className="video-img br-2"
				/>
			</div>
			<div className="card-body br-2 flex-row flex-align-start flex-justify-between py-0-75 px-0-5">
				<div class="avatar avatar-xs avatar-text" role="img">
					{videoCreatorAbbreviation}
				</div>
				<div className="video-title text-center">{videoTitle}</div>
				<div className="video-options-icon">
					<button className="btn btn-icon btn-primary">
						{<MoreVert />}
					</button>
				</div>
			</div>
		</NavLink>
	);
};

export { VideoCard };
