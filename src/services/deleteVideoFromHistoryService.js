import axios from "axios";

const deleteVideoFromHistoryService = (authToken, videoId) =>
	axios.delete(`/api/user/history/${videoId}`, {
		headers: { authorization: authToken },
	});

export { deleteVideoFromHistoryService };