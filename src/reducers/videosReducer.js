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

		case actionTypes.SET_LOADER:
			return {
				...prevVideosState,
				videosLoading: payload.videosLoading,
			};

		case actionTypes.SET_SORTING_OPTION:
			return {
				...prevVideosState,
				videosSortOption: payload.videosSortOption,
			};

        case actionTypes.SET_SEARCH_TEXT:
            return {
                ...prevVideosState,
                videosSearchText: payload.videosSearchText
            }

		default:
			throw new Error("Unknown action type.");
	}
};

export { videosReducerFunction };
