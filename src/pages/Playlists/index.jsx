import { Loader, PlaylistsList } from "components";
import { useUserData } from "contexts";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "custom-hooks";
import PlaylistPortal from "PlaylistPortal";

const Playlists = () => {
	const {
		playlists,
		userDataLoading,
		userDataError: { playlistsError },
	} = useUserData();

	const [showPlaylistModal, setShowPlaylistModal] = useState(false);

	const setDocumentTitle = useDocumentTitle();
	useEffect(() => setDocumentTitle("StreamTunes | Playlists"), []);

	const handleCreatePlaylistClicked = (e) => {
		e.stopPropagation();
		setShowPlaylistModal(true);
	};

	return (
		<>
			{showPlaylistModal ? (
				<PlaylistPortal
					video={null}
					setShowPlaylistModal={setShowPlaylistModal}
				/>
			) : null}
			<main className="main playlists-main">
				{playlistsError ? (
					<h3 className="text-center mx-auto px-3 error-color my-3">
						Playlists videos could not be loaded. Please try again
						later.
					</h3>
				) : userDataLoading ? (
					<Loader />
				) : (
					<div className="container flex-col flex-align-center flex-justify-start py-1-5 px-3">
						<button
							onClick={handleCreatePlaylistClicked}
							className="btn btn-primary btn-new-playlist p-0-5"
						>
							Create Playlist
						</button>
						{playlists?.length ? (
							<PlaylistsList />
						) : (
							<div className="py-3">
								<h5 className="text-center mx-auto px-3 info-color">
									There are no playlists. Explore videos to
									create and add videso to playlists!
								</h5>
								<Link
									to="/explore"
									className="btn btn-primary mx-auto mt-2 px-1 text-reg py-0-5 text-center"
								>
									Explore now
								</Link>
							</div>
						)}
					</div>
				)}
			</main>
		</>
	);
};

export { Playlists };
