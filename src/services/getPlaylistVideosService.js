import axios from "axios";

const getPlaylistVideosService = (authToken) =>
	axios.get("/api/user/playlists", { headers: { authorization: authToken } });

export { getPlaylistVideosService };