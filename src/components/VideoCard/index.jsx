import React, { useRef, useState } from "react";
import {
	WatchLaterOutlined,
	DeleteOutline,
	MoreVert,
	ThumbUpOutlined,
	Delete,
} from "@mui/icons-material";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Hyphenated from "react-hyphen";

import { useAuth, useUserData } from "contexts";
import { useToast } from "custom-hooks/useToast";
import {
	findVideoInList,
	getFormattedViews,
	likeVideoServiceCall,
	watchLaterServiceCall,
} from "utils";
import PlaylistPortal from "PlaylistPortal";
import {
	deleteVideoFromHistoryService,
	deleteVideoFromPlaylistService,
} from "services";
import { useOutsideClick } from "custom-hooks/useOutsideClick";

const VideoCard = ({ video, page }) => {
	const {
		_id: videoId,
		creator: videoCreator,
		title: videoTitle,
		views,
		dateAdded,
	} = video;

	const { isAuth, authToken } = useAuth();
	const { userDataDispatch, watchlater, userDataLoading, likes } =
		useUserData();
	const navigate = useNavigate();
	const { showToast } = useToast();
	const location = useLocation();
	const { playlistsId } = useParams();

	const [showVideoOptions, setShowVideoOptions] = useState(false);
	const [showPlaylistModal, setShowPlaylistModal] = useState(false);
	const [isOnGoingNetworkCall, setIsOnGoingNetworkCall] = useState(false);

	const isVideoInWatchLater = findVideoInList(watchlater, video);
	const isVideoInLikes = findVideoInList(likes, video);

	const videoOptionsReference = useRef(null);

	const videoCreatorWords = videoCreator.split(/\s|-/, 3);
	const videoCreatorAbbreviation = videoCreatorWords
		.map((word) => word[0].toUpperCase())
		.join("");

	const dateReleased = new Date(dateAdded)
		.toDateString()
		.substring(4)
		.split(" ", 4)
		.join(" ");

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
			setIsOnGoingNetworkCall(true);
			await watchLaterServiceCall(
				showToast,
				userDataDispatch,
				isVideoInWatchLater,
				authToken,
				video
			);
			setIsOnGoingNetworkCall(false);
		}
	};

	const handleLikedVideoChange = async (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (!isAuth) {
			showToast("Login to add the video to likes.", "info");
			navigate("/login", { state: { from: "/explore" }, replace: true });
		} else {
			setIsOnGoingNetworkCall(true);
			await likeVideoServiceCall(
				showToast,
				userDataDispatch,
				isVideoInLikes,
				authToken,
				video
			);
			setIsOnGoingNetworkCall(false);
		}
	};

	const handleShowPlaylistModal = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (!isAuth) {
			showToast("Login to add the video to a playlist.", "info");
			navigate("/login", { state: { from: "/explore" }, replace: true });
		} else setShowPlaylistModal(true);
	};

	const handleDeleteVideoFromHistory = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		setIsOnGoingNetworkCall(true);

		try {
			const {
				data: { history },
			} = await deleteVideoFromHistoryService(authToken, videoId);
			userDataDispatch({ type: "SET_HISTORY", payload: { history } });
			showToast("Removed video from history.", "success");
		} catch (error) {
			showToast("Failed to remove video from history.", "error");
		}

		setIsOnGoingNetworkCall(false);
	};

	const handleDeleteVideoFromPlaylist = async (e) => {
		e.stopPropagation();
		e.preventDefault();

		setIsOnGoingNetworkCall(true);
		try {
			const {
				data: { playlist: updatedPlaylist },
			} = await deleteVideoFromPlaylistService(
				authToken,
				playlistsId,
				videoId
			);
			userDataDispatch({
				type: "UPDATE_PLAYLISTS",
				payload: { playlist: updatedPlaylist },
			});
			showToast("Video removed from playlist.", "success");
		} catch (error) {
			setIsOnGoingNetworkCall(false);
			showToast("Failed to remove video playlist.", "error");
		}
	};

	useOutsideClick(videoOptionsReference, () => setShowVideoOptions(false));

	return (
		<>
			{showPlaylistModal ? (
				<PlaylistPortal
					video={video}
					setShowPlaylistModal={setShowPlaylistModal}
				/>
			) : null}
			<NavLink
				to={`/explore/${videoId}`}
				className={`card card-vertical video-container video-card flex-col flex-align-center flex-justify-between ${
					userDataLoading || isOnGoingNetworkCall
						? "disabled-card"
						: ""
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
					<div className="video-information-container flex-col">
						<h6
							className="video-title text-center text-reg"
							lang="en"
						>
							<Hyphenated>{videoTitle}</Hyphenated>
						</h6>
						<div className="video-information flex-row flex-align-center flex-justify-center flex-wrap">
							<div className="video-views text-xs">
								{getFormattedViews(views)}
							</div>
							<div className="dot-separator">•</div>
							<div className="video-views text-xs">
								{dateReleased}
							</div>
						</div>
					</div>
					<div className="flex-row video-actions-container">
						{page === "playlist" ? (
							<button
								className="btn btn-primary btn-icon"
								onClick={handleDeleteVideoFromPlaylist}
							>
								<Delete />
							</button>
						) : null}
						<div className="video-options-icon">
							<button
								className="btn btn-icon btn-primary br-2"
								onClick={handleShowOptionsChange}
							>
								{<MoreVert />}
							</button>
						</div>
						{location?.pathname === "/history" ? (
							<button
								className="btn btn-icon btn-primary br-2"
								onClick={handleDeleteVideoFromHistory}
							>
								{<Delete />}
							</button>
						) : null}
					</div>
					{showVideoOptions ? (
						<div
							className="video-options-list br-2"
							ref={videoOptionsReference}
						>
							<button
								className={`${
									userDataLoading || isOnGoingNetworkCall
										? "btn px-0-75 py-0-5 btn-text-icon btn-disabled"
										: "btn px-0-75 py-0-5 btn-text-icon"
								}`}
								disabled={
									userDataLoading || isOnGoingNetworkCall
								}
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
									userDataLoading || isOnGoingNetworkCall
										? "btn px-0-75 py-0-5 btn-text-icon btn-disabled"
										: "btn px-0-75 py-0-5 btn-text-icon"
								}`}
								disabled={
									userDataLoading || isOnGoingNetworkCall
								}
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
							<button
								className={`${
									userDataLoading || isOnGoingNetworkCall
										? "btn px-0-75 py-0-5 btn-text-icon btn-disabled"
										: "btn px-0-75 py-0-5 btn-text-icon"
								}`}
								disabled={
									userDataLoading || isOnGoingNetworkCall
								}
								onClick={handleShowPlaylistModal}
							>
								Add to playlist
							</button>
						</div>
					) : null}
				</div>
			</NavLink>
		</>
	);
};

export { VideoCard };
