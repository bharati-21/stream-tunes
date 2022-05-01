const actionType = {
	INIT_VIDEOS_SUCCESS: "INIT_VIDEOS_SUCCESS",
	INIT_VIDEOS_ERROR: "INIT_VIDEOS_ERROR",
};

const videosReducerFunction = (prevVideosState, { type, payload }) => {
	switch (type) {
		case actionType.INIT_VIDEOS_SUCCESS:
			return {
				...prevVideosState,
				videos: payload.videos,
				videosError: null,
				vidoesLoading: false,
			};

		case actionType.INIT_VIDEOS_ERROR:
			return {
				...prevVideosState,
				videosError: "Vidoes could not load. Please try again later.",
				vidoesLoading: false,
			};

		default:
			throw new Error("Unknown action type.");
	}
};

export { videosReducerFunction };
