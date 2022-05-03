import axios from "axios";

const getLikedVideosService = (authToken) =>
	axios.get("/api/user/likes", { headers: { authorization: authToken } });

export { getLikedVideosService };