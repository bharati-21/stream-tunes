const actionType = {
	SET_LOADER: "SET_LOADER",
	SET_ERROR: "SET_ERROR",
	SET_WATCH_LATER: "SET_WATCH_LATER",
	SET_LIKES: "SET_LIKES",
	SET_PLAYLISTS: "SET_PLAYLISTS",
	UPDATE_PLAYLISTS: "UPDATE_PLAYLISTS",
};

const userDataReducerFunction = (prevUserDataState, { type, payload }) => {
	switch (type) {
		case actionType.SET_LOADER:
			return {
				...prevUserDataState,
				userDataLoading: payload.loading,
			};

		case actionType.SET_ERROR:
			return {
				...prevUserDataState,
				userDataError: {
					...prevUserDataState.userDataError,
					...payload.error,
				},
				userDataLoading: payload.loading,
			};

		case actionType.SET_WATCH_LATER:
			return {
				...prevUserDataState,
				watchlater: [...payload.watchlater],
			};

		case actionType.SET_LIKES:
			return {
				...prevUserDataState,
				likes: [...payload.likes],
			};

		case actionType.SET_PLAYLISTS:
			return {
				...prevUserDataState,
				playlists: [...payload.playlists],
			};

		case actionType.UPDATE_PLAYLISTS:
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
