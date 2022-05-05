import axios from "axios";

const postVideoToPlaylist = (authToken, playlistId, video) =>
	axios.post(
		`/api/user/playlists/${playlistId}`,
		{ video },
		{ headers: { authorization: authToken } }
	);

export { postVideoToPlaylist };