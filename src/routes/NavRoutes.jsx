import React from "react";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";

import { Home, Explore, Login, Signup } from "pages";
import { ProtectedRoutes } from "./ProtectedRoutes";

const NavRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/explore" element={<Explore />} />
			<Route path="/mockman" element={<Mockman />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/" element={<ProtectedRoutes />}></Route>
		</Routes>
	);
};

export { NavRoutes };
