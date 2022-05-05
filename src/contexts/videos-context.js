import { createContext, useContext, useEffect, useReducer } from "react";

import { videosReducerFunction } from "reducers";
import { getVideos } from "services";

const initialVideos = {
	videos: [],
	videosError: null,
	videosLoading: true,
	videosSortOption: null,
	videosSelectedCategory: "",
	videosSearchTest: "",
};
const VideosContext = createContext(initialVideos);

const { Provider } = VideosContext;

const VideosProvider = ({ children }) => {
	const [videosState, videosDispatch] = useReducer(
		videosReducerFunction,
		initialVideos
	);

	const getVideosServiceCall = async () => {
		try {
			const {
				data: { videos },
			} = await getVideos();

			videosDispatch({
				type: "INIT_VIDEOS_SUCCESS",
				payload: { videos },
			});
		} catch (error) {
			videosDispatch({
				type: "INIT_VIDEOS_ERROR",
			});
		}
	};

	useEffect(() => {
		getVideosServiceCall();
	}, []);

	return (
		<Provider value={{ ...videosState, videosDispatch }}>
			{children}
		</Provider>
	);
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosProvider };
