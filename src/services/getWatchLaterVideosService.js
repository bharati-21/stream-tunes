import axios from "axios";

const getWatchLaterVideosService = (authToken) =>
	axios.get("/api/user/watchlater", {
		headers: { authorization: authToken },
	});

export { getWatchLaterVideosService };
