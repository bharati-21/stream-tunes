import React from "react";
import { Delete } from "@mui/icons-material";

import { useAuth, useUserData } from "contexts";
import {
	deletePlaylistService,
	deleteVideoFromPlaylistService,
	postVideoToPlaylist,
} from "services";
import { useToast } from "custom-hooks/useToast";

const PlaylistOption = ({ video, playlist }) => {
	const { userDataDispatch, userDataLoading } = useUserData();
	const { showToast } = useToast();
	const { authToken } = useAuth();

	const isVideoEmpty = !video || !Object.keys(video).length;

	const isVideoInPlaylist =
		!isVideoEmpty &&
		playlist.videos.find(
			(playlistVideo) => playlistVideo._id === video._id
		) === undefined
			? false
			: true;

	const handleChangePlaylist = async (e) => {
		userDataDispatch({
			type: "SET_LOADER",
			payload: { loading: true },
		});

		try {
			const {
				data: { playlist: updatedPlaylist },
			} = isVideoInPlaylist
				? await deleteVideoFromPlaylistService(
						authToken,
						playlist._id,
						video._id
				  )
				: await postVideoToPlaylist(authToken, playlist._id, video);
			userDataDispatch({
				type: "UPDATE_PLAYLISTS",
				payload: { playlist: updatedPlaylist },
			});
			showToast(
				isVideoInPlaylist
					? "Video removed from playlist."
					: "Video added to playlist.",
				"success"
			);
		} catch (error) {
			showToast(
				isVideoInPlaylist
					? "Failed to remove video playlist."
					: "Failed to add video to playlist.",
				"error"
			);
		}

		userDataDispatch({
			type: "SET_LOADER",
			payload: { loading: false },
		});
	};

	const handleDeletePlaylist = async (e) => {
		userDataDispatch({
			type: "SET_LOADER",
			payload: { loading: true },
		});

		try {
			const {
				data: { playlists },
			} = await deletePlaylistService(authToken, playlist._id);
			userDataDispatch({
				type: "SET_PLAYLISTS",
				payload: { playlists },
			});
			showToast("Playlist deleted successfully.", "success");
		} catch (error) {
			showToast("Failed to delete playlist.", "error");
		}

		userDataDispatch({
			type: "SET_LOADER",
			payload: { loading: false },
		});
	};

	const disabledButton = userDataLoading ? "btn-disabled" : "";

	return (
		<div className="playlist-option flex-row flex-align-start flex-justify-between">
			{
				<>
					<label
						key={playlist._id}
						className="playlist-option text-sm flex-row flex-align-start flex-justify-start"
					>
						{isVideoEmpty ? null : (
							<input
								className="text-sm mr-0-25"
								type="checkbox"
								name={`playlist-${playlist.title}`}
								id={playlist._id}
								checked={isVideoInPlaylist}
								onChange={handleChangePlaylist}
								disabled={userDataLoading}
							/>
						)}
						<span className="label-text">{playlist.title}</span>
					</label>
					<button
						className={`btn btn-icon btn-primary btn-delete-playlist ${disabledButton}`}
						onClick={handleDeletePlaylist}
					>
						<Delete />
					</button>
				</>
			}
		</div>
	);
};

export { PlaylistOption };
