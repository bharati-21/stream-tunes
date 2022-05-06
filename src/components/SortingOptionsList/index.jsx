import React, { useState } from "react";
import { Sort } from "@mui/icons-material";

import { useVideos } from "contexts";

const SortingOptionsList = () => {
	const { videosSortOption, videosDispatch } = useVideos();

	const [showSortingOptions, setShowSortingOptions] = useState(false);

	const handleShowSortingOptionsChange = (event) =>
		setShowSortingOptions(
			(prevShowSortingOptions) => !prevShowSortingOptions
		);

	const handleSortingOptionChange = (option) =>
		videosDispatch({
			type: "SET_SORTING_OPTION",
			payload: { videosSortOption: option },
		});

	return (
		<div className="sorting-options-container flex-row flex-align-center flex-justify-between flex-wrap">
			<button
				className="btn btn-primary btn-icon"
				onClick={handleShowSortingOptionsChange}
			>
				Sort
				<span className="icon mui">
					<Sort />
				</span>
			</button>
			{videosSortOption ? (
				<button
					className="btn btn-primary btn-clear-sort p-0-25"
					onClick={(e) => handleSortingOptionChange(null)}
				>
					Clear Sort
				</button>
			) : null}
			<div
				className={`${
					showSortingOptions
						? "show-sorting-options"
						: "hide-sorting-options"
				} sorting-options-list flex-col br-2`}
			>
				<button
					className={`${
						videosSortOption === "LATEST"
							? "btn btn-primary"
							: "btn btn-primary btn-outline"
					} text-left p-0-5`}
					onClick={(e) => handleSortingOptionChange("LATEST")}
				>
					Latest upload date
				</button>
				<button
					className={`${
						videosSortOption === "OLDEST"
							? "btn btn-primary"
							: "btn btn-primary btn-outline"
					} text-left p-0-5`}
					onClick={(e) => handleSortingOptionChange("OLDEST")}
				>
					Oldest upload date
				</button>
			</div>
		</div>
	);
};

export { SortingOptionsList };
