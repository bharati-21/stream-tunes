const actionTypes = {
	INIT_AUTH: "INIT_AUTH",
	RESET_AUTH: "RESET_AUTH",
};

const initialAuthState = {
	isAuth: false,
	authToken: "",
	authLoading: true,
	authError: null,
	authUser: {},
};

const authReducerFunction = (prevAuthState, { action: { type, payload } }) => {
	switch (type) {
		case actionTypes.INIT_AUTH:
			return {
				...prevAuthState,
				isAuth: true,
				authLoading: false,
				authError: null,
				authUser: payload.authUser,
				authToken: payload.authToken,
			};

		case actionTypes.RESET_AUTH:
			return initialAuthState;

		default:
			throw new Error("Invalid Dispatch action type!");
	}
};

export { authReducerFunction, initialAuthState };
