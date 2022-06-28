import { useVideos } from "contexts";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useDebounceSearchResults = () => {
	const [searchText, setSearchText] = useState("");
	const { videosDispatch } = useVideos();
	const navigate = useNavigate();

	const setSearchedText = (searchText) => {
		videosDispatch({
			type: "SET_SEARCH_TEXT",
			payload: { videosSearchText: searchText },
		});
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

	const debouncedSetSearchedText = useCallback(debounce(setSearchedText), []);

	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value);
		if (location.pathName !== "/explore") {
			navigate("/explore");
		}
		debouncedSetSearchedText(event.target.value);
	};

	return { searchText, handleSearchTextChange };
};

export { useDebounceSearchResults };
