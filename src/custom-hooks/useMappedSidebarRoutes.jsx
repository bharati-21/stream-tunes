import {
	HomeOutlined,
	VideoLibraryOutlined,
	ExploreOutlined,
	FavoriteBorderOutlined,
	WatchLaterOutlined,
	HistoryOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";

const routes = [
	{
		id: uuid(),
		route: "Home",
		path: "/",
		icon: <HomeOutlined />,
	},
	{
		id: uuid(),
		route: "Explore",
		path: "/explore",
		icon: <VideoLibraryOutlined />,
	},
	{
		id: uuid(),
		route: "Playlists",
		path: "/playlists",
		icon: <ExploreOutlined />,
	},
	{
		id: uuid(),
		route: "Liked",
		path: "/liked",
		icon: <FavoriteBorderOutlined />,
	},
	{
		id: uuid(),
		route: "Watch Later",
		path: "/watchlater",
		icon: <WatchLaterOutlined />,
	},
	{
		id: uuid(),
		route: "History",
		path: "/history",
		icon: <HistoryOutlined />,
	},
];

const useMappedSidebarRoutes = () => {
	const mappedSidebarRoutes = routes.map(({ id, route, icon, path }) => (
		<li className="link list-item p-1" key={id}>
			<NavLink
				to={path}
				className="text-reg flex-row flex-align-center flex-justify-center mx-auto flex-wrap"
			>
				{icon} {route}
			</NavLink>
		</li>
	));

    return { mappedSidebarRoutes }
};

export { useMappedSidebarRoutes };