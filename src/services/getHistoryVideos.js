import axios from "axios";

const getHistoryVideos = (authToken) =>
	axios.get("/api/user/history", { headers: { authorization: authToken } });

export { getHistoryVideos };
