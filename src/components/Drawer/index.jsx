import React from "react";

import "./drawer.css";
import { useMappedSidebarRoutes } from 'custom-hooks/useMappedSidebarRoutes';

const Drawer = () => {
    const { mappedSidebarRoutes } = useMappedSidebarRoutes();
    
	return (
		<ul className="list list-stacked aside-list list-style-none">
			{ mappedSidebarRoutes }
		</ul>
	);
};

export { Drawer };
