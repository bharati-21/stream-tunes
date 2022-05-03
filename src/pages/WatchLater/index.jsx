import React from "react";
import "pages/Explore/explore.css";

import { useUserData } from "contexts";
import { Loader, VideosList } from "components";
import { Link } from "react-router-dom";

const WatchLater = () => {
	const {
		userDataLoading,
		userDataError: { watchlater: watchlaterError },
		watchlater,
	} = useUserData();

	return (
		<main className="main watch-later-main">
			{watchlaterError || watchlaterError ? (
				<h3 className="text-center mx-auto px-3 error-color my-3">
					Watch later videos could not be loaded. Please try again
					later.
				</h3>
			) : userDataLoading || userDataLoading ? (
				<Loader />
			) : (
				<div className="container flex-col flex-align-center flex-justify-start py-1-5 px-3">
					{watchlater.length ? (
						<VideosList videos={watchlater} />
					) : (
						<div className="py-3">
							<h5 className="text-center mx-auto px-3 info-color">
								There are no videos to be watched later. Explore
								videos to add to your watch later list!
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

export { WatchLater };
