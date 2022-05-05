import axios from "axios";

const deleteVideoFromPlaylistService = (authToken, playlistId, videoId) =>
	axios.delete(
		`/api/user/playlists/${playlistId}/${videoId}`,
        { headers: { authorization: authToken } }
	);

export { deleteVideoFromPlaylistService };
