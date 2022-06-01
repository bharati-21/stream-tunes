import React, { useEffect, useRef, useState } from "react";
import { Add, Close } from "@mui/icons-material";

import "./playlist-modal.css";
import { useAuth, useTheme, useUserData } from "contexts";
import { useToast } from "custom-hooks/useToast";
import { postNewPlayList } from "services";
import { PlaylistOption } from "./PlaylistOption";
import { useOutsideClick } from "custom-hooks/useOutsideClick";

const PlaylistModal = ({ video, setShowPlaylistModal }) => {
	const { theme } = useTheme();
	const { authToken } = useAuth();
	const { userDataDispatch, playlists, userDataLoading } = useUserData();
	const { showToast } = useToast();

	const [playlistName, setPlaylistName] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const playlistModalReference = useRef(null);
	const playlistInputReference = useRef(null);
	const isVideoEmpty = !Object.keys(video).length;

	useEffect(() => {
		if (playlistInputReference.current) {
			playlistInputReference.current.focus();
		}
	}, [playlists?.length]);

	const handlePlaylistNameChange = (e) => {
		setErrorMessage(null);
		setPlaylistName(e.target.value);
	};

	const handleCreatePlaylist = async (e) => {
		e.preventDefault();
		if (!playlistName || !playlistName.trim()) {
			return setErrorMessage("Playlist name cannot be empty!");
		}

		userDataDispatch({
			type: "SET_LOADER",
			payload: { loading: true },
		});

		try {
			const {
				data: { playlists },
			} = await postNewPlayList(authToken, {
				title: playlistName,
				videos: isVideoEmpty ? [] : [{ ...video }],
			});
			userDataDispatch({ type: "SET_PLAYLISTS", payload: { playlists } });
			setPlaylistName("");
			if (isVideoEmpty) {
				showToast("Created new playlist.", "success");
			} else showToast("Added video to new playlist.", "success");
		} catch (error) {
			if (isVideoEmpty) {
				showToast("Could not create playlist.", "error");
			} else
				showToast(
					"Could not add video to new playlist. Please try again later.",
					"error"
				);
		}

		userDataDispatch({
			type: "SET_LOADER",
			payload: { loading: false },
		});
	};

	const buttonDisabled = userDataLoading ? "btn-disabled" : "";

	useOutsideClick(playlistModalReference, () => setShowPlaylistModal(false));

	return (
		<main
			className={`modal ${theme} playlist-modal flex-col flex-align-center flex-justify-center p-1`}
		>
			<div
				className="playlist-management-container p-1-5 flex-col flex-align-center flex-justify-center"
				ref={playlistModalReference}
			>
				<button
					className={`btn btn-primary btn-icon btn-close-modal ${buttonDisabled}`}
					type="button"
					onClick={(e) => setShowPlaylistModal(false)}
				>
					<Close />
				</button>
				<div className="playlist-options-container pb-1 flex-col flex-align-start flex-justify-center">
					<h6 className="playlist-options-head mr-1 text-reg">
						{isVideoEmpty
							? "Playlists"
							: "Add to an existing playlist"}
					</h6>
					<div className="playlist-options flex-col flex-align-start flex-justify-center">
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
							ref={playlistInputReference}
						/>
						<button
							type="submit"
							className={`btn btn-primary btn-create-playlist ${buttonDisabled}`}
							onClick={handleCreatePlaylist}
						>
							<Add />
						</button>
					</div>
					{errorMessage ? (
						<p className="error-color text-sm">{errorMessage}</p>
					) : null}
				</form>
			</div>
		</main>
	);
};

export { PlaylistModal };
