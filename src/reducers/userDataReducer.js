const actionType = {
	SET_LOADER: "SET_LOADER",
	SET_ERROR: "SET_ERROR",
	SET_WATCH_LATER: "SET_WATCH_LATER",
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
				watchlater: payload.watchlater,
			};

		default:
			throw new Error("Unknown action type.");
	}
};

export { userDataReducerFunction };
