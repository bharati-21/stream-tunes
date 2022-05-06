import { deleteVideoFromWatchLaterService, postVideoToWatchLaterService } from "services";

const watchLaterServiceCall = async (
	showToast,
	userDataDispatch,
	isVideoInWatchLater,
    authToken,
    video
) => {
	userDataDispatch({
		type: "SET_LOADER",
		payload: { loading: true },
	});

	try {
		const {
			data: { watchlater },
		} = isVideoInWatchLater
			? await deleteVideoFromWatchLaterService(authToken, video._id)
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
};

export { watchLaterServiceCall };