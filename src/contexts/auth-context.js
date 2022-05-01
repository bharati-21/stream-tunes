import { useContext, createContext, useReducer } from "react";
import { authReducerFunction, initialAuthState } from "reducers";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	const setInitialAuthState = () => {
		const streamTunesToken = localStorage.getItem("stream-tunes-token");
		const streamTunesUser = localStorage.getItem("stream-tunes-user");
		if (streamTunesToken) {
			return {
				...initialAuthState,
				authToken: streamTunesToken,
				isAuth: true,
				authUser: JSON.parse(streamTunesUser),
			};
		}
		return initialAuthState;
	};

	const [authState, authDispatch] = useReducer(
		authReducerFunction,
		setInitialAuthState()
	);
	return (
		<Provider value={{ ...authState, authDispatch }}>{children}</Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
