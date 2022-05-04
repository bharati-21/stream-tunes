import axios from "axios";

const postNewPlayList = (authToken, playlist) =>
	axios.post(
		"/api/user/playlists",
		{ playlist },
        { headers: { authorization: authToken } }
	);

export { postNewPlayList };
