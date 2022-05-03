import React, { useState } from "react";
import { Add, Close } from "@mui/icons-material";

import "./playlist-modal.css";
import { useAuth, useTheme, useUserData } from "contexts";
import { useToast } from "custom-hooks/useToast";
import { postNewPlayList } from "services";
import { PlaylistOption } from "./PlaylistOption";

const PlaylistModal = ({ video, setShowPlaylistModal }) => {
	const { theme } = useTheme();
	const { authToken } = useAuth();
	const { userDataDispatch, playlists } = useUserData();
	const { showToast } = useToast();

	const [playlistName, setPlaylistName] = useState("");

	const handlePlaylistNameChange = (e) => setPlaylistName(e.target.value);

	const handleCreatePlaylist = async (e) => {
		e.preventDefault();
		try {
			const {
				data: { playlists },
			} = await postNewPlayList(authToken, {
				title: playlistName,
				videos: [{ ...video }],
			});
			userDataDispatch({ type: "SET_PLAYLISTS", payload: { playlists } });
			setPlaylistName("");
		} catch (error) {
			showToast(
				"Could not add video to new playlist. Please try again later.",
				"error"
			);
		}
	};

	return (
		<main
			className={`modal ${theme} playlist-modal flex-col flex-align-center flex-justify-center p-1`}
		>
			<div className="playlist-management-container p-1-5 flex-col flex-align-center flex-justify-center">
				<button
					className="btn btn-primary btn-icon btn-close-modal"
					type="button"
					onClick={(e) => setShowPlaylistModal(false)}
				>
					<Close />
				</button>
				<div className="playlist-options-container pb-1 flex-col flex-align-start flex-justify-center">
                    <h6 className="playlist-options-head mr-1 text-reg">
                        Add to an existing playlist
                    </h6>
					<div className="playlist-options">
                    {playlists.map((playlist) => (
						<PlaylistOption
							key={playlist._id}
							video={video}
							playlist={playlist}
						/>
					))}
                    </div>
				</div>
				<form className="playlist-form br-2 flex-col flex-align-start flex-justify-center">
					<h6 className="form-head text-reg">Create new playlist</h6>
					<div className="form-group flex-row flex-align-center flex-justify-center">
						<input
							type="text"
							className="input-playlist-name p-0-25"
							id="input-playlist-name"
							name="playlist-name"
							placeholder="Enter Playlist Name"
							autoComplete="off"
							onChange={handlePlaylistNameChange}
							value={playlistName}
						/>
						<button
							type="submit"
							className="btn btn-primary btn-create-playlist"
							onClick={handleCreatePlaylist}
						>
							<Add />
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export { PlaylistModal };
