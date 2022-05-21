import React from "react";
import Mockman from "mockman-js";
import { Routes, Route, useLocation } from "react-router-dom";

import {
	Home,
	Explore,
	Login,
	Signup,
	WatchLater,
	Likes,
	Playlists,
	PlaylistVideos,
	SingleVideo,
	History,
    NotFound,
} from "pages";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Drawer } from "components";

const NavRoutes = () => {
	const location = useLocation();

	return location.pathname === "/" ? (
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	) : (
		<div className="grid-container">
			<aside className="grid-item drawer-container">
				<Drawer />
			</aside>
			<div className="grid-item">
				<Routes>
					<Route path="/explore" element={<Explore />} />
					<Route path="/mockman" element={<Mockman />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/explore/:videoId" element={<SingleVideo />} />
                    <Route path="*" element={<NotFound />} />
					<Route path="/" element={<ProtectedRoutes />}>
						<Route path="/watchlater" element={<WatchLater />} />
						<Route path="/likes" element={<Likes />} />
						<Route path="/playlists" element={<Playlists />} />
						<Route
							path="/playlists/:playlistsId"
							element={<PlaylistVideos />}
						/>
						<Route path="/history/" element={<History />} />
					</Route>
				</Routes>
			</div>
		</div>
	);
};

export { NavRoutes };
