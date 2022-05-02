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
import { useMappedSidebarRoutes } from "custom-hooks/useMappedSidebarRoutes";

const Drawer = () => {
    const { mappedSidebarRoutes } = useMappedSidebarRoutes();

	return (
		<ul className="list list-stacked aside-list list-style-none">
			{ mappedSidebarRoutes }
		</ul>
	);
};

export { Drawer };
