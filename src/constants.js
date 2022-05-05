const authActionTypes = {
	INIT_AUTH: "INIT_AUTH",
	RESET_AUTH: "RESET_AUTH",
};

const categoriesActionTypes = {
	INIT_CATEGORIES_SUCCESS: "INIT_CATEGORIES_SUCCESS",
	INIT_CATEGORIES_ERROR: "INIT_CATEGORIES_ERROR",
};

const userDataActionTypes = {
	SET_LOADER: "SET_LOADER",
	SET_ERROR: "SET_ERROR",
	SET_WATCH_LATER: "SET_WATCH_LATER",
	SET_LIKES: "SET_LIKES",
	SET_PLAYLISTS: "SET_PLAYLISTS",
	UPDATE_PLAYLISTS: "UPDATE_PLAYLISTS",
};

const videosActionTypes = {
	INIT_VIDEOS_SUCCESS: "INIT_VIDEOS_SUCCESS",
	INIT_VIDEOS_ERROR: "INIT_VIDEOS_ERROR",
};

export {
	authActionTypes,
	categoriesActionTypes,
	userDataActionTypes,
	videosActionTypes,
};
