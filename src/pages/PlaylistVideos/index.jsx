import React from "react";

import { Loader, VideosList } from "components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserData } from "contexts";

const PlaylistVideos = () => {
	const { playlistsId } = useParams();
	const navigate = useNavigate();

	const {
		playlists,
		userDataLoading,
		userDataError: { playlists: playlistError },
	} = useUserData();

	if (!playlists.find((playlist) => playlist._id === playlistsId))
		navigate("/playlists");

	const videos = playlists.find(
		(playlist) => playlist._id === playlistsId
	)?.videos;

	return (
		<main className="main playlists-videos-list-main">
			{playlistError ? (
				<h5 className="text-center mx-auto px-3 error-color">
					Playlist videos could not be loaded. Please try again later.
				</h5>
			) : userDataLoading ? (
				<Loader />
			) : (
				<div className="container flex-col flex-align-start flex-justify-start py-1-5 px-3">
					<div className="">
						<Link
							to="/playlists"
							className="btn btn-primary mx-auto px-1 text-reg py-0-5 text-center"
						>
							View All Playlists
						</Link>
					</div>
					{videos?.length ? (
						<VideosList videos={videos} />
					) : (
						<div className="py-3">
							<h5 className="text-center mx-auto px-3 info-color">
								There are no videos in this playlist. Explore
								now to add videos to your playlist!
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
	);
};

export { PlaylistVideos };
