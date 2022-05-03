import { createContext, useContext, useEffect, useReducer } from "react";

import { userDataReducerFunction } from "reducers";
import { getWatchLaterVideosService, getLikedVideosService } from "services";
import { useAuth } from "./auth-context";


const initialUserData = {
	userDetails: {},
	likes: [],
	watchlater: [],
	history: [],
	playlists: [],
	userDataLoading: true,
	userDataError: { watchlater: "", history: "", playlists: "", likes: "" },
};

const UserDataContext = createContext(initialUserData);
const { Provider } = UserDataContext;

const UserDataProvider = ({ children }) => {
	const { isAuth, authToken } = useAuth();

	const [userDataState, userDataDispatch] = useReducer(
		userDataReducerFunction,
		initialUserData
	);

	const callGetWatchLaterVideosService = async () => {
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
					error: {
						watchlater:
							"Watch later videos could not be fetched. Please try again later.",
					},
					loading: false,
				},
			});
		}
	};

	const callGetLikedVideosService = async () => {
		try {
			const {
				data: { likes },
			} = await getLikedVideosService(authToken);
			userDataDispatch({
				type: "SET_LIKES",
				payload: { likes },
			});
			userDataDispatch({
				type: "SET_LOADER",
				payload: { loading: false },
			});
		} catch (error) {
			userDataDispatch({
				type: "SET_ERROR",
				payload: {
					error: {
						likes: "Liked videos could not be fetched. Please try again later.",
					},
					loading: false,
				},
			});
		}
	};

	useEffect(() => {
		if (isAuth) {
			userDataDispatch({
				type: "SET_LOADER",
				payload: { loading: true },
			});

			callGetWatchLaterVideosService();
			callGetLikedVideosService();
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
