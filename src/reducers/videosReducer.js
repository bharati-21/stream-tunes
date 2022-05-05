import { videosActionTypes as actionTypes } from "../constants";

const videosReducerFunction = (prevVideosState, { type, payload }) => {
	switch (type) {
		case actionTypes.INIT_VIDEOS_SUCCESS:
			return {
				...prevVideosState,
				videos: payload.videos,
				videosError: null,
				videosLoading: false,
			};

		case actionTypes.INIT_VIDEOS_ERROR:
			return {
				...prevVideosState,
				videosError: "Videos could not load. Please try again later.",
				videosLoading: false,
			};

		default:
			throw new Error("Unknown action type.");
	}
};

export { videosReducerFunction };
