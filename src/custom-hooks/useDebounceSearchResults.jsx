import { useVideos } from "contexts";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useDebounceSearchResults = () => {
	const [searchText, setSearchText] = useState("");
	const { videosDispatch } = useVideos();
	const navigate = useNavigate();

	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value);
		if (event.target.value.trim()) {
			updateSearchedUsers(event.target.value);
		}
	};

	const debounce = (callback, delay = 500) => {
		let timeout;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				callback(...args);
			}, delay);
		};
	};

	const updateSearchedUsers = useCallback(
		debounce((searchText) => {
			videosDispatch({
				type: "SET_SEARCH_TEXT",
				payload: { videosSearchText: searchText },
			});
			if (location.pathName !== "/explore") {
				navigate("/explore");
			}
		}),
		[]
	);

	return { searchText, handleSearchTextChange };
};

export { useDebounceSearchResults };
