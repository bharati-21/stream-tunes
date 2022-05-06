import axios from "axios";

const clearVideosFromHistoryService = (authToken) =>
	axios.delete("/api/user/history/all", {
		headers: { authorization: authToken },
	});

export { clearVideosFromHistoryService };
