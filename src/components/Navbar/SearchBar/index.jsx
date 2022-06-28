import { Search } from "@mui/icons-material";
import { useVideos } from "contexts";
import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = ({ searchText, setSearchText }) => {
	const { videosDispatch } = useVideos();
	const navigateToExplore = (event) => {
		event.preventDefault();
	};
    const navigate = useNavigate();
    const location = useLocation();

	const debounce = (callback, delay = 800) => {
		let timer;
		return function (...args) {
            if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				callback(...args);
			}, delay);
		};
	};

	const fetchSearchedVideos = (searchText) => {
		videosDispatch({
			type: "SET_SEARCH_TEXT",
			payload: { videosSearchText: searchText },
		});
	};

	const debouncedFetchSearchVideos = useCallback(
		debounce(fetchSearchedVideos, 800),
		[]
	);

	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value);
		if (location.pathName !== "/explore") {
			navigate("/explore");
		}
		debouncedFetchSearchVideos(event.target.value);
	};

	return (
		<form
			className="search-form flex-row flex-align-center flex-wrap flex-justify-between"
			onSubmit={navigateToExplore}
		>
			<input
				type="search"
				id="input-mobile-search"
				className="input-text text-sm"
				onChange={handleSearchTextChange}
				value={searchText}
				placeholder="Search videoes by name"
				required
			/>
			<button type="submit" className="btn btn-primary btn-icon text-sm">
				<span className="icon">
					<Search />
				</span>
			</button>
		</form>
	);
};

export { SearchBar };
