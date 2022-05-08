import React from "react";
import { Link } from "react-router-dom";

import { useAuth, useUserData } from "contexts";
import "../Explore/explore.css";
import { Loader, VideosList } from "components";
import { clearVideosFromHistoryService } from "services";
import { useToast } from "custom-hooks/useToast";

const History = () => {
	const {
		userDataLoading,
		userDataError: { historyError },
		history,
		userDataDispatch,
	} = useUserData();

	const { authToken } = useAuth();
	const { showToast } = useToast();

	const handleClearHistory = async (event) => {
		userDataDispatch({
			type: "SET_LOADER",
			payload: { loading: true },
		});

		try {
			const {
				data: { history },
			} = await clearVideosFromHistoryService(authToken);
			userDataDispatch({ type: "SET_HISTORY", payload: { history } });
			showToast("Successfully deleted your watch history.", "success");
		} catch (error) {
			showToast("Failed to clear your watch history.", "error");
		}

		userDataDispatch({
			type: "SET_LOADER",
			payload: { loading: false },
		});
	};

	const buttonDisabled = userDataLoading ? "btn-disabled" : "";

	return (
		<main className="main history-main">
			{historyError ? (
				<h5 className="text-center mx-auto px-3 error-color">
					Videos in your history could not be loaded. Try again after
					sometime.
				</h5>
			) : userDataLoading ? (
				<Loader />
			) : (
				<div className="container flex-col flex-align-center flex-justify-start py-1-5 px-3">
					{history.length ? (
						<>
							<button
								onClick={handleClearHistory}
								className={`btn btn-primary btn-clear-history mx-auto mb-2 px-1 text-reg py-0-5 text-center ${buttonDisabled}`}
							>
								Clear History
							</button>
							<VideosList videos={history} />
						</>
					) : (
						<div className="py-3">
							<h5 className="text-center mx-auto px-3 info-color">
								There are no videos in your history. Explore and
								watch videos to see them here!
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

export { History };
