import React from "react";

import {
	HomeOutlined,
	VideoLibraryOutlined,
	ExploreOutlined,
	FavoriteBorderOutlined,
	WatchLaterOutlined,
	HistoryOutlined,
} from "@mui/icons-material";
import "./drawer.css";
import { NavLink } from "react-router-dom";

const Drawer = () => {
	return (
		<ul className="list list-stacked aside-list list-style-none">
			<li className="link list-item">
				<NavLink
					to="/"
					className="text-reg flex-row flex-align-center flex-justify-start mx-auto p-1"
				>
					<HomeOutlined /> Home
				</NavLink>
			</li>
			<li className="link list-item">
				<NavLink
					to="/explore"
					className="text-reg flex-row flex-align-center flex-justify-start mx-auto flex-wrap p-1"
				>
					<ExploreOutlined /> Explore
				</NavLink>
			</li>
			<li className="link list-item">
				<NavLink
					to="/playlist"
					className="text-reg flex-row flex-align-center flex-justify-start mx-auto flex-wrap p-1"
				>
					<VideoLibraryOutlined /> Playlist
				</NavLink>
			</li>
			<li className="link list-item">
				<NavLink
					to="/liked"
					className="text-reg flex-row flex-align-center flex-justify-start mx-auto flex-wrap p-1"
				>
					<FavoriteBorderOutlined /> Liked
				</NavLink>
			</li>
			<li className="link list-item">
				<NavLink
					to="/watchlater"
					className="text-reg flex-row flex-align-center flex-justify-start mx-auto flex-wrap p-1"
				>
					<WatchLaterOutlined /> Watch Later
				</NavLink>
			</li>
			<li className="link list-item">
				<NavLink
					to="/history"
					className="text-reg flex-row flex-align-center flex-justify-start mx-auto flex-wrap p-1"
				>
					<HistoryOutlined /> History
				</NavLink>
			</li>
		</ul>
	);
};

export { Drawer };
