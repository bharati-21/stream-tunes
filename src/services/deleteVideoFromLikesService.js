import axios from "axios";

const deleteVideoFromLikesService = (authToken, videoId) =>
	axios.delete(`/api/user/likes/${videoId}`, {
		headers: { authorization: authToken },
	});

export { deleteVideoFromLikesService };