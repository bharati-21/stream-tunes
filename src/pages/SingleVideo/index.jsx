import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Hyphenated from "react-hyphen";
import {
	PlaylistAdd,
	ThumbUp,
	WatchLater,
	ThumbDown,
	WatchLaterOutlined,
} from "@mui/icons-material";

import { useAuth, useUserData, useVideos } from "contexts";
import { Loader } from "components";
import {
	findVideoInList,
	likeVideoServiceCall,
	watchLaterServiceCall,
} from "utils";
import { useToast } from "custom-hooks/useToast";
import PlaylistPortal from "PlaylistPortal";
import { postVideoToHistoryService } from "services";

const SingleVideo = () => {
	const { videosError, videosLoading, videos } = useVideos();
	const { watchlater, likes, userDataDispatch, userDataLoading } =
		useUserData();
	const { videoId } = useParams();
	const { isAuth, authToken } = useAuth();
	const { showToast } = useToast();
	const navigate = useNavigate();

	const videoToBeDisplayed = videos.find((video) => video._id === videoId);

	const videoCreatorWords = videoToBeDisplayed?.creator.split(/\s|-/, 3);
	const videoCreatorAbbreviation = videoCreatorWords
		?.map((word) => word[0].toUpperCase())
		.join("");

	const [isVideoInWatchLater, setIsVideoInWatchLater] = useState(
		findVideoInList(watchlater, videoToBeDisplayed) || []
	);
	const [isVideoInLikes, setIsVideoInLikes] = useState(
		findVideoInList(likes, videoToBeDisplayed) || []
	);
	const [showPlaylistModal, setShowPlaylistModal] = useState(false);

	useEffect(() => {
		if (isAuth) {
			setIsVideoInWatchLater(
				findVideoInList(watchlater, videoToBeDisplayed)
			);
			setIsVideoInLikes(findVideoInList(likes, videoToBeDisplayed));
		}
	}, [watchlater, likes]);

	useEffect(() => {
		if (videoToBeDisplayed) postVideoToHistoryServiceCall();
	}, [videoToBeDisplayed]);

	const postVideoToHistoryServiceCall = async () => {
		if (isAuth) {
			userDataDispatch({
				type: "SET_LOADER",
				payload: { loading: true },
			});

			try {
				const {
					data: { history },
				} = await postVideoToHistoryService(
					authToken,
					videoToBeDisplayed
				);
				userDataDispatch({ type: "SET_HISTORY", payload: { history } });
			} catch (error) {
				showToast(
					"Some error occurred while updating history. Please try again later.",
					"error"
				);
			}

			userDataDispatch({
				type: "SET_LOADER",
				payload: { loading: false },
			});
		}
	};

	const handleWatchLaterChange = async (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (!isAuth) {
			showToast("Login to add the video to watch later.", "info");
			navigate("/login", {
				state: { from: `/explore/${videoId}` },
				replace: true,
			});
		} else {
			watchLaterServiceCall(
				showToast,
				userDataDispatch,
				isVideoInWatchLater,
				authToken,
				videoToBeDisplayed
			);
		}
	};

	const handleLikedVideoChange = async (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (!isAuth) {
			showToast("Login to add the video to likes.", "info");
			navigate("/login", {
				state: { from: `/explore/${videoId}` },
				replace: true,
			});
		} else {
			likeVideoServiceCall(
				showToast,
				userDataDispatch,
				isVideoInLikes,
				authToken,
				videoToBeDisplayed
			);
		}
	};

	const handleShowPlaylistModal = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isAuth) {
			showToast("Login to add the video to a playlist.", "info");
			navigate("/login", {
				state: { from: `/explore/${videoId}` },
				replace: true,
			});
		} else setShowPlaylistModal(true);
	};

	const opts = {
		playerVars: {
			autoplay: 1,
		},
	};

	const disabledButton = userDataLoading ? "btn-disabled" : "";

	return (
		<>
			{showPlaylistModal ? (
				<PlaylistPortal
					video={videoToBeDisplayed}
					setShowPlaylistModal={setShowPlaylistModal}
				/>
			) : null}
			<main className="main video-main">
				{videosLoading ? (
					<Loader />
				) : videosError || !videoToBeDisplayed ? (
					<h5 className="text-center mx-auto px-3 error-color my-3">
						Fialed to load video. Please try again later.
					</h5>
				) : (
					<div className="container flex-col flex-align-center flex-justify-start py-1-5 px-3">
						<div className="single-video-card card-vertical card p-1">
							<div className="card-header br-2">
								<YouTube
									videoId={videoId}
									opts={opts}
									className="youtube-video flex-row flex-justify-center br-2"
								/>
							</div>
							<div className="card-body flex-col flex-align-center flex-justify-center">
								<div className="video-information flex-wrap flex-row flex-align-start flex-justify-between py-1">
									<div className="video-head flex-col flex-justify-start flex-align-start">
										<h5 className="video-title">
											<Hyphenated>
												{videoToBeDisplayed.title}
											</Hyphenated>
										</h5>
										<div className="video-creator flex-row flex-align-center flex-justify-start">
											<div
												className="creator-avatar avatar avatar-xs text-reg avatar-text"
												role="img"
											>
												{videoCreatorAbbreviation}
											</div>
											<h6 className="creator-name text-reg">
												{videoToBeDisplayed.creator}
											</h6>
										</div>
									</div>
									<div className="video-actions flex-row flex-align-center flex-justify-center flex-wrap">
										<button
											className={`btn btn-icon flex-col flex-align-center flex-justify-center btn-like-dislike btn-primary btn ${disabledButton}`}
											onClick={handleLikedVideoChange}
										>
											{isVideoInLikes ? (
												<ThumbDown />
											) : (
												<ThumbUp />
											)}
											<span className="action-text text-sm">
												{isVideoInLikes
													? "Disike"
													: "Like"}
											</span>
										</button>
										<button
											className={`btn btn-icon flex-col flex-align-center flex-justify-center btn-like-dislike btn-primary ${disabledButton}`}
											onClick={handleShowPlaylistModal}
										>
											<PlaylistAdd />
											<span className="action-text text-sm">
												Add
											</span>
										</button>
										<button
											className={`btn btn-icon flex-col flex-align-center flex-justify-center btn-like-dislike btn-primary ${disabledButton}`}
											onClick={handleWatchLaterChange}
										>
											{isVideoInWatchLater ? (
												<WatchLater />
											) : (
												<WatchLaterOutlined />
											)}
											<span className="action-text text-sm">
												Watch Later
											</span>
										</button>
									</div>
								</div>

								<div className="video-description">
									{videoToBeDisplayed.description}
								</div>
							</div>
						</div>
					</div>
				)}
			</main>
		</>
	);
};

export { SingleVideo };
