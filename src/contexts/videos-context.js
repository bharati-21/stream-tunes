import { createContext, useContext, useEffect, useReducer } from "react";

import { videosReducerFunction } from "reducers";
import { getVideos } from "services";

const initialVidoes = {
	vidoes: [],
	vidoesError: null,
	vidoesLoading: true,
	vidoesSortOptions: null,
	vidoeSelectedCategory: "",
	videoSearchTest: "",
};
const VideosContext = createContext(initialVidoes);

const { Provider } = VideosContext;

const VideosProvider = ({ children }) => {
	const [vidoesState, videosDispatch] = useReducer(
		videosReducerFunction,
		initialVidoes
	);

	const getVidoesServiceCall = async () => {
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
		getVidoesServiceCall();
	}, []);

	return (
		<Provider value={{ ...vidoesState, videosDispatch }}>
			{children}
		</Provider>
	);
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosProvider };
