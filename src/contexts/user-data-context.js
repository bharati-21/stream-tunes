import { createContext, useContext, useEffect, useReducer } from "react";

import { userDataReducerFunction } from "reducers";
import { getWatchLaterVideosService } from "services";
import { useAuth } from "./auth-context";

const initialUserData = {
	userDetails: {},
	likes: [],
	watchlater: [],
	history: [],
	playlists: [],
	userDataLoading: true,
	userDataError: null,
};

const UserDataContext = createContext(initialUserData);
const { Provider } = UserDataContext;

const UserDataProvider = ({ children }) => {
	const { isAuth, authToken } = useAuth();

	const [userDataState, userDataDispatch] = useReducer(
		userDataReducerFunction,
		initialUserData
	);

	useEffect(() => {
		if (isAuth) {
			userDataDispatch({
				type: "SET_LOADER_ERROR",
				payload: { error: null, loading: true },
			});
			(async () => {
				try {
					const {
						data: { watchlater },
					} = await getWatchLaterVideosService(authToken);
					userDataDispatch({
						type: "SET_WATCH_LATER",
						payload: { watchlater },
					});
					userDataDispatch({
						type: "SET_LOADER_ERROR",
						payload: { error: null, loading: false },
					});
				} catch (error) {
					userDataDispatch({
						type: "SET_LOADER_ERROR",
						payload: {
							error: "User data could not be fetched. Please try again later.",
							loading: false,
						},
					});
				}
			})();
		}
	}, [isAuth]);

	return (
		<Provider value={{ ...userDataState, userDataDispatch }}>
			{children}
		</Provider>
	);
};

const useUserData = () => useContext(UserDataContext);

export { useUserData, UserDataProvider };
