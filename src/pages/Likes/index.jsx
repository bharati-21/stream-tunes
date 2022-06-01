import React, { useEffect } from "react";
import "pages/Explore/explore.css";

import { useUserData } from "contexts";
import { Loader, VideosList } from "components";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "custom-hooks";

const Likes = () => {
	const {
		userDataLoading,
		userDataError: { likes: likesError },
		likes,
	} = useUserData();

	const setDocumentTitle = useDocumentTitle();
	useEffect(() => setDocumentTitle("StreamTunes | Likes"), []);

	return (
		<main className="main watch-later-main">
			{likesError ? (
				<h3 className="text-center mx-auto px-3 error-color my-3">
					Liked videos could not be loaded. Please try again later.
				</h3>
			) : userDataLoading || userDataLoading ? (
				<Loader />
			) : (
				<div className="container flex-col flex-align-center flex-justify-start py-1-5 px-3">
					{likes?.length ? (
						<VideosList videos={likes} />
					) : (
						<div className="py-3">
							<h5 className="text-center mx-auto px-3 info-color">
								You are yet to like videos. Explore videos to
								add to your liked videos list!
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

export { Likes };
