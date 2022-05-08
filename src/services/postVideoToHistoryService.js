import axios from "axios";

const postVideoToHistoryService = (authToken, video) =>
	axios.post(
		"/api/user/history",
		{ video },
		{
			headers: { authorization: authToken },
		}
	);

export { postVideoToHistoryService };
