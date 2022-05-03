import React, { useEffect, useState } from "react";
import { DeleteOutline, MoreVert, ThumbUpOutlined } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import Hyphenated from "react-hyphen";
import { WatchLaterOutlined } from "@mui/icons-material";

import { useAuth, useUserData } from "contexts";
import { useToast } from "custom-hooks/useToast";
import {
	deleteVideoFromLikesService,
	deleteVideoFromWatchLaterService,
	postVideoToLikesService,
	postVideoToWatchLaterService,
} from "services";
import { findVideoInList } from "utils";

const VideoCard = ({ video }) => {
	const { _id: videoId, creator: videoCreator, title: videoTitle } = video;

	const { isAuth, authToken } = useAuth();
	const { userDataDispatch, watchlater, userDataLoading, likes } =
		useUserData();
	const navigate = useNavigate();
	const { showToast } = useToast();

	const [showVideoOptions, setShowVideoOptions] = useState(false);
	const [isVideoInWatchLater, setIsVideoInWatchLater] = useState(
		findVideoInList(watchlater, video)
	);
	const [isVideoInLikes, setIsVideoInLikes] = useState(
		findVideoInList(likes, video)
	);

	useEffect(() => {
		if (isAuth) {
			setIsVideoInWatchLater(findVideoInList(watchlater, video));
			setIsVideoInLikes(findVideoInList(likes, video));
		}
	}, [watchlater, likes]);

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

			try {
				const {
					data: { watchlater },
				} = isVideoInWatchLater
					? await deleteVideoFromWatchLaterService(authToken, videoId)
					: await postVideoToWatchLaterService(authToken, video);

				userDataDispatch({
					type: "SET_WATCH_LATER",
					payload: { watchlater },
				});

				showToast(
					isVideoInWatchLater
						? "Removed video from watch later."
						: "Added video to watch later.",
					"success"
				);
			} catch (error) {
				showToast(
					isVideoInWatchLater
						? "Failed to remove video from watch later. Please try again later."
						: "Failed to add video to watch later. Please try again later.",
					"error"
				);
			}

			userDataDispatch({
				type: "SET_LOADER",
				payload: { loading: false },
			});
		}
	};

	const handleLikedVideoChange = async (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (!isAuth) {
			showToast("Login to add the video to likes.", "info");
			navigate("/login", { state: { from: "/explore" }, replace: true });
		} else {
			userDataDispatch({
				type: "SET_LOADER",
				payload: { loading: true },
			});
			try {
				const {
					data: { likes },
				} = isVideoInLikes
					? await deleteVideoFromLikesService(authToken, videoId)
					: await postVideoToLikesService(authToken, video);

				userDataDispatch({
					type: "SET_LIKES",
					payload: { likes },
				});

				showToast(
					isVideoInLikes
						? "Removed video from likes."
						: "Added video to likes",
					"success"
				);
			} catch (error) {
				showToast(
					isVideoInLikes
						? "Failed to remove video from likes. Please try again later."
						: "Failed to add video to likes. Please try again later.",
					"error"
				);
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
			className={`card card-vertical video-container video-card flex-col flex-align-center flex-justify-between ${
				userDataLoading ? "disabled-card" : ""
			}`}
		>
			<div className="card-header">
				<img
					src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
					alt={`${videoTitle} cover`}
					className="video-img"
				/>
			</div>
			<div className="card-body flex-row flex-align-start flex-justify-between py-0-75 px-0-5">
				<div
					className="video-creator avatar avatar-xs avatar-text"
					role="img"
				>
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
							className={`${
								userDataLoading
									? "btn px-0-75 py-0-5 btn-text-icon btn-disabled"
									: "btn px-0-75 py-0-5 btn-text-icon"
							}`}
							disabled={userDataLoading}
							onClick={handleWatchLaterChange}
						>
							{isVideoInWatchLater ? (
								<span className="text-icon-wrapper error-color flex-row flex-wrap flex-justify-center flex-align-center">
									<DeleteOutline className="video-option-icon" />
									Remove from watch later
								</span>
							) : (
								<span className="text-icon-wrapper flex-row flex-wrap flex-justify-center flex-align-center">
									<WatchLaterOutlined className="video-option-icon" />
									Add to watch later
								</span>
							)}
						</button>
						<button
							className={`${
								userDataLoading
									? "btn px-0-75 py-0-5 btn-text-icon btn-disabled"
									: "btn px-0-75 py-0-5 btn-text-icon"
							}`}
							disabled={userDataLoading}
							onClick={handleLikedVideoChange}
						>
							{isVideoInLikes ? (
								<span className="text-icon-wrapper error-color flex-row flex-wrap flex-justify-center flex-align-center">
									<DeleteOutline className="video-option-icon" />
									Remove from likes
								</span>
							) : (
								<span className="text-icon-wrapper flex-row flex-wrap flex-justify-center flex-align-center">
									<ThumbUpOutlined className="video-option-icon" />
									Add to likes
								</span>
							)}
						</button>
					</div>
				) : null}
			</div>
		</NavLink>
	);
};

export { VideoCard };
