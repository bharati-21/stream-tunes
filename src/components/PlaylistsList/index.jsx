import { useAuth, useUserData } from "contexts";
import React from "react";
import noThumbnail from "assets/images/no-thumbnail.png";
import { Link, NavLink } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { useToast } from "custom-hooks/useToast";
import { deletePlaylistService } from "services";
import { useState } from "react";

const PlaylistsList = () => {
	const { userDataDispatch, playlists, categoriesLoading } = useUserData();
	const { showToast } = useToast();
	const { authToken } = useAuth();

	const buttonDisabled = categoriesLoading ? "btn-disabled" : "";

	const [isOnGoingNetworkCall, setIsOnGoingNetworkCall] = useState(false);

	const playlistsMapping = playlists.map((playlist) => {
		const cardImage = playlist.videos[0]
			? `https://i.ytimg.com/vi/${playlist.videos[0]._id}/mqdefault.jpg`
			: noThumbnail;

		const handleDeletePlaylist = async (event) => {

			event.stopPropagation();
            event.preventDefault();
            const playlistId = playlist._id;
			setIsOnGoingNetworkCall(true);

			try {
				const {
					data: { playlists },
				} = await deletePlaylistService(authToken, playlistId);
				userDataDispatch({
					type: "SET_PLAYLISTS",
					payload: { playlists },
				});
				showToast("Playlist deleted successfully.", "success");
			} catch (error) {
				showToast("Failed to delete playlist.", "error");
                setIsOnGoingNetworkCall(false);
			}
		};

		return (
			<Link
				className={`card card-vertical playlist-card video-card flex-col flex-align-center flex-justify-between card-overlay ${
					isOnGoingNetworkCall ? "link-disabled" : ""
				}`}
				key={playlist._id}
				to={`/playlists/${playlist._id}`}
			>
				<div className="card-header br-2">
					<img
						src={cardImage}
						alt={`${playlist.title} Image`}
						className="card-img card-img br-2"
					/>
				</div>
				<div className="card-body flex-row flex-align-center flex-justify-center px-1 py-0-5">
					<h6 className="card-title playlist-title text-reg">
						{playlist.title}
					</h6>
				</div>
				<div className="card-footer p-1 flex-col flex-align-center flex-justify-between">
					<h6 className="playlist-num-videos">
						{playlist.videos.length > 9
							? "9+"
							: playlist.videos.length}
					</h6>
					<button
						className={`btn btn-icon btn-primary btn-delete-playlist ${buttonDisabled}`}
						onClick={handleDeletePlaylist}
						disabled={isOnGoingNetworkCall}
					>
						<Delete />
					</button>
				</div>
			</Link>
		);
	});

	return (
		<section className="videos-list-container">{playlistsMapping}</section>
	);
};

export { PlaylistsList };
