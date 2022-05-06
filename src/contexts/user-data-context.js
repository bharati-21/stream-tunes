import { createContext, useContext, useEffect, useReducer } from "react";

import { userDataReducerFunction } from "reducers";
import {
	getWatchLaterVideosService,
	getLikedVideosService,
	getPlaylistVideosService,
	getHistoryVideos,
} from "services";
import { useAuth } from "./auth-context";

const initialUserData = {
	userDetails: {},
	likes: [],
	watchlater: [],
	history: [],
	playlists: [],
	userDataLoading: false,
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

	const callGetPlaylistVideosService = async () => {
		try {
			const {
				data: { playlists },
			} = await getPlaylistVideosService(authToken);
			userDataDispatch({
				type: "SET_PLAYLISTS",
				payload: { playlists },
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
						likes: "Playlists could not be fetched. Please try again later.",
					},
					loading: false,
				},
			});
		}
	};

	const callGetHistoryVideosService = async () => {
		try {
			const {
				data: { history },
			} = await getHistoryVideos(authToken);
			userDataDispatch({
				type: "SET_HISTORY",
				payload: { history },
			});
			userDataDispatch({
				type: "SET_LOADER",
				payload: { loading: false },
			});
		} catch (error) {
			userDataDispatch({
				type: "SET_ERROR",
				payload: {
					history: {
						likes: "Videos in history could not be fetched. Please try again later.",
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
			callGetPlaylistVideosService();
			callGetHistoryVideosService();
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
