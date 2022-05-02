const actionType = {
	SET_LOADER_ERROR: "SET_LOADER_ERROR",
	SET_WATCH_LATER: "SET_WATCH_LATER",
};

const userDataReducerFunction = (prevUserDataState, { type, payload }) => {
	switch (type) {
		case actionType.SET_LOADER_ERROR:
			return {
				...prevUserDataState,
				userDataError: payload.userDataError,
				userDataLoading: payload.userDataError,
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
