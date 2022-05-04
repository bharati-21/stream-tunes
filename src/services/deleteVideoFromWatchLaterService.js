import axios from "axios";

const deleteVideoFromWatchLaterService = (authToken, videoId) =>
	axios.delete(`/api/user/watchlater/${videoId}`, {
		headers: { authorization: authToken },
	});

export { deleteVideoFromWatchLaterService };