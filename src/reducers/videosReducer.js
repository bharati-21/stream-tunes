import { videosActionTypes as actionTypes } from "../constants";

const videosReducerFunction = (prevVideosState, { type, payload }) => {
	switch (type) {
		case actionTypes.INIT_VIDEOS_SUCCESS:
			return {
				...prevVideosState,
				videos: payload.videos,
				videosError: null,
				vidoesLoading: false,
			};

		case actionTypes.INIT_VIDEOS_ERROR:
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
