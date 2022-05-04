import axios from "axios";

const postVideoToWatchLaterService = (authToken, video) =>
	axios.post("/api/user/watchlater", {video}, {
		headers: { authorization: authToken },
	});

export { postVideoToWatchLaterService };
