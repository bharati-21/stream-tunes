import { deleteVideoFromLikesService, postVideoToLikesService } from "services";

const likeVideoServiceCall = async (
	showToast,
	userDataDispatch,
	isVideoInLikes,
    authToken,
    video
) => {
	userDataDispatch({
		type: "SET_LOADER",
		payload: { loading: true },
	});
	try {
		const {
			data: { likes },
		} = isVideoInLikes
			? await deleteVideoFromLikesService(authToken, video._id)
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
};

export { likeVideoServiceCall };