import React from "react";
import Mockman from "mockman-js";
import { Routes, Route, useLocation } from "react-router-dom";

import { Home, Explore, Login, Signup } from "pages";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Drawer, Footer } from "components";

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
					<Route path="/" element={<ProtectedRoutes />}></Route>
				</Routes>
			</div>
		</div>
	);
};

export { NavRoutes };
