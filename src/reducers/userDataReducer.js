import { userDataActionTypes as actionTypes } from "../constants";

const userDataReducerFunction = (prevUserDataState, { type, payload }) => {
	switch (type) {
		case actionTypes.SET_LOADER:
			return {
				...prevUserDataState,
				userDataLoading: payload.loading,
			};

		case actionTypes.SET_ERROR:
			return {
				...prevUserDataState,
				userDataError: {
					...prevUserDataState.userDataError,
					...payload.error,
				},
				userDataLoading: payload.loading,
			};

		case actionTypes.SET_WATCH_LATER:
			return {
				...prevUserDataState,
				watchlater: [...payload.watchlater],
			};

		case actionTypes.SET_LIKES:
			return {
				...prevUserDataState,
				likes: [...payload.likes],
			};

		case actionTypes.SET_PLAYLISTS:
			return {
				...prevUserDataState,
				playlists: [...payload.playlists],
			};

		case actionTypes.UPDATE_PLAYLISTS:
			return {
				...prevUserDataState,
				playlists: prevUserDataState.playlists.map((prevPlaylist) =>
					prevPlaylist._id === payload.playlist._id
						? { ...payload.playlist }
						: { ...prevPlaylist }
				),
			};

		default:
			throw new Error("Unknown action type.");
	}
};

export { userDataReducerFunction };
