import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Hyphenated from "react-hyphen";
import { WatchLaterOutlined } from "@mui/icons-material";

const VideoCard = ({ videoId, videoCreator, videoTitle }) => {
	const [showVideoOptions, setShowVideoOptions] = useState(false);

	const videoCreatorWords = videoCreator.split(/\s|-/, 3);
	const videoCreatorAbbreviation = videoCreatorWords
		.map((word) => word[0].toUpperCase())
		.join("");

	const handleShowOptionsChange = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setShowVideoOptions((prevShowVideoOptions) => !prevShowVideoOptions);
	};

	return (
		<NavLink
			to={`/video/${videoId}`}
			className="card card-vertical video-container video-card flex-col flex-align-center flex-justify-between"
		>
			<div className="card-header">
				<img
					src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
					alt={`${videoTitle} cover`}
					className="video-img"
				/>
			</div>
			<div className="card-body flex-row flex-align-start flex-justify-between py-0-75 px-0-5">
				<div className="avatar avatar-xs avatar-text" role="img">
					{videoCreatorAbbreviation}
				</div>
				<h6 className="video-title text-center text-reg" lang="en">
					<Hyphenated>{videoTitle}</Hyphenated>
				</h6>
				<div className="video-options-icon">
					<button
						className="btn btn-icon btn-primary br-2"
						onClick={handleShowOptionsChange}
					>
						{<MoreVert />}
					</button>
				</div>
				{showVideoOptions ? (
					<div className="video-options-list br-2">
						<button className="btn px-0-75 py-0-5 btn-text-icon">
							<WatchLaterOutlined /> Watch Later
						</button>
					</div>
				) : null}
			</div>
		</NavLink>
	);
};

export { VideoCard };
