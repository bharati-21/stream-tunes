import { authActionTypes as actionTypes } from "../constants";

const initialAuthState = {
	isAuth: false,
	authToken: "",
	authLoading: false,
	authError: null,
	authUser: {},
};

const authReducerFunction = (prevAuthState, { action: { type, payload } }) => {
	switch (type) {
		case actionTypes.INIT_AUTH:
			return {
				...prevAuthState,
				isAuth: true,
				authError: null,
				authUser: payload.authUser,
				authToken: payload.authToken,
			};

		case actionTypes.SET_AUTH_LOADING:
			return {
				...prevAuthState,
				authLoading: payload.authLoading,
			};

		case actionTypes.RESET_AUTH:
			return initialAuthState;

		default:
			throw new Error("Invalid Dispatch action type!");
	}
};

export { authReducerFunction, initialAuthState };
