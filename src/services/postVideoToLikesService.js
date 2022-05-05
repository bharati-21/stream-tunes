import axios from "axios";

const postVideoToLikesService = (authToken, video) =>
	axios.post("/api/user/likes", {video}, {
		headers: { authorization: authToken },
	});

export { postVideoToLikesService };
