import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import Hyphenated from "react-hyphen";
import { WatchLaterOutlined } from "@mui/icons-material";

import { useAuth, useUserData } from "contexts";
import { useToast } from "custom-hooks/useToast";
import {
	deleteVideoFromWatchLaterService,
	postVideoToWatchLaterService,
} from "services";
import { findVideoInList } from "utils";

const VideoCard = ({ video }) => {
	const { _id: videoId, creator: videoCreator, title: videoTitle } = video;
	const [showVideoOptions, setShowVideoOptions] = useState(false);

	const { isAuth, authToken } = useAuth();
	const { userDataDispatch, watchlater, userDataLoading } = useUserData();
	const navigate = useNavigate();
	const { showToast } = useToast();

	const videoCreatorWords = videoCreator.split(/\s|-/, 3);
	const videoCreatorAbbreviation = videoCreatorWords
		.map((word) => word[0].toUpperCase())
		.join("");

	const handleShowOptionsChange = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setShowVideoOptions((prevShowVideoOptions) => !prevShowVideoOptions);
	};

	const handleWatchLaterChange = async (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (!isAuth) {
			showToast("Login to add the video to watch later.", "info");
			navigate("/login", { state: { from: "/explore" }, replace: true });
		} else {
			userDataDispatch({
				type: "SET_LOADER",
				payload: { loading: true },
			});
			if (findVideoInList(watchlater, video)) {
				try {
					const {
						data: { watchlater },
					} = await deleteVideoFromWatchLaterService(
						authToken,
						videoId
					);

					userDataDispatch({
						type: "SET_WATCH_LATER",
						payload: { watchlater },
					});
					showToast("Removed video from watch later.", "success");
				} catch (error) {
					showToast(
						"Failed to remove video to watch later. Please try again later.",
						"error"
					);
				}
			} else {
				try {
					const {
						data: { watchlater },
					} = await postVideoToWatchLaterService(authToken, video);
					userDataDispatch({
						type: "SET_WATCH_LATER",
						payload: { watchlater },
					});
					showToast("Added video to watch later.", "success");
				} catch (error) {
					showToast(
						"Failed to add video to watch later. Please try again later.",
						"error"
					);
				}
			}
			userDataDispatch({
				type: "SET_LOADER",
				payload: { loading: false },
			});
		}
	};

	return (
		<NavLink
			to={`/video/${videoId}`}
			className={`card card-vertical video-container video-card flex-col flex-align-center flex-justify-between ${userDataLoading ? 'disabled-card': ''}`}
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
						<button
							className={`${userDataLoading ? 'btn px-0-75 py-0-5 btn-text-icon  btn-disabled' : 'btn px-0-75 py-0-5 btn-text-icon'}`}
							disabled={userDataLoading}
							onClick={handleWatchLaterChange}
						>
							<WatchLaterOutlined className="video-option-icon" />{" "}
							{findVideoInList(watchlater, video)
								? "Remove from watch later"
								: "Add to watch later"}
						</button>
					</div>
				) : null}
			</div>
		</NavLink>
	);
};

export { VideoCard };
