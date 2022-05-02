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
	userDataError: { watchlater: '', history: '', playlists: '', liked: ''},
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
				type: "SET_LOADER",
				payload: { loading: true },
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
						type: "SET_LOADER",
						payload: { loading: false },
					});
				} catch (error) {
					userDataDispatch({
						type: "SET_ERROR",
						payload: {
							error: { watchlater: "Watch later videos could not be fetched. Please try again later." },
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
