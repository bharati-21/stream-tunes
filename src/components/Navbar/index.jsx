import React, { useEffect, useState } from "react";
import {
	DarkMode,
	LightMode,
	Menu,
	Close,
	Search,
	AccountCircle,
	Logout,
	HomeOutlined,
	VideoLibraryOutlined,
	ExploreOutlined,
	FavoriteBorderOutlined,
	WatchLaterOutlined,
	HistoryOutlined,
} from "@mui/icons-material";
import { NavLink, Link } from "react-router-dom";

import "./navbar.css";
import logo from "assets/logo/logo-img.png";

import { useTheme, useAuth } from "contexts/";
import { useToast } from "custom-hooks/useToast";

const Navbar = () => {
	const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

	const { theme, setTheme } = useTheme();
	const { isAuth, authDispatch } = useAuth();
	const { showToast } = useToast();

	const handleThemeChange = () =>
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

	useEffect(() => {
		localStorage.setItem("stream-tunes-theme", theme);
	}, [theme]);

	const handleLogoutUser = () => {
		authDispatch({ action: { type: "RESET_AUTH" } });
		showToast("Logged out successfully", "success");
		localStorage.removeItem("stream-tunes-token");
		localStorage.removeItem("stream-tunes-user");
	};

	const handleChangeShowHamburgerMenu = (hamburgerMenuState) =>
		setShowHamburgerMenu(hamburgerMenuState);

	return (
		<nav className="navbar flex-col flex-align-center flex-justify-between py-1">
			<div className="navbar-wrapper flex-row flex-align-center flex-justify-between">
				<div className="navbar-left-menu flex-row flex-align-center flex-justify-between">
					<button className="btn-hamburger btn btn-icon btn-primary">
						<Menu
							onClick={() => handleChangeShowHamburgerMenu(true)}
						/>
					</button>
					<Link
						to="/"
						className="logo flex-row flex-align-center flex-justify-between"
					>
						<img
							src={logo}
							alt="StreamTunes Logo"
							className="logo-img"
						/>
						<h5 className="logo-text">
							Stream
							<span className="primary-color">Tunes</span>
						</h5>
					</Link>
				</div>
				<form className="search-form desktop-search-form flex-row flex-align-center flex-justify-between">
					<input
						type="text"
						id="input-inline-name"
						className="input-text text-sm px-0-25"
						placeholder="Enter search text..."
						required
					/>
					<button
						type="submit"
						className="btn btn-primary btn-icon text-sm"
					>
						<span className="icon">
							<Search />
						</span>
					</button>
				</form>

				<ul className="list list-inline flex-row flex-align-center flex-justify-end navbar-navlinks navbar-right-menu">
					<li className="link navlink">
						<NavLink to="/" className="text-sm mx-0-25">
							Home
						</NavLink>
					</li>
					<li className="link navlink">
						<NavLink to="/explore" className="text-sm mx-0-25">
							Explore
						</NavLink>
					</li>
					{isAuth ? (
						<li>
							<button
								className="btn btn-primary btn-icon btn-logout text-sm"
								onClick={handleLogoutUser}
							>
								<Logout />
							</button>
						</li>
					) : (
						<li>
							<Link
								to="/login"
								className="btn btn-primary btn-icon btn-login text-sm"
							>
								<AccountCircle />
							</Link>
						</li>
					)}
					<li>
						<button
							className="btn btn-secondary btn-icon btn-theme"
							onClick={handleThemeChange}
						>
							{theme === "light" ? <LightMode /> : <DarkMode />}
						</button>
					</li>
				</ul>

				<div
					className={`hamburger-menu ${
						showHamburgerMenu
							? "show-hamburger-menu"
							: "close-hamburger-menu"
					} mx-auto p-2 flex-col flex-align-center flex-justify-center`}
				>
					<button className="btn btn-icon btn-close-icon btn-primary px-0-5 py-0-25">
						<Close
							onClick={() => handleChangeShowHamburgerMenu(false)}
						/>
					</button>
					<ul className="list list-stacked mx-auto mt-2 list-style-none navbar-navlinks text-center">
						<li className="link list-item p-1">
							<NavLink
								to="/"
								className="text-reg flex-row flex-align-center flex-justify-center mx-auto"
							>
								<HomeOutlined /> Home
							</NavLink>
						</li>
						<li className="link list-item p-1">
							<NavLink
								to="/explore"
								className="text-reg flex-row flex-align-center flex-justify-center mx-auto flex-wrap"
							>
								<ExploreOutlined /> Explore
							</NavLink>
						</li>
						<li className="link list-item p-1">
							<NavLink
								to="/playlist"
								className="text-reg flex-row flex-align-center flex-justify-center mx-auto flex-wrap"
							>
								<VideoLibraryOutlined /> Playlist
							</NavLink>
						</li>
						<li className="link list-item p-1">
							<NavLink
								to="/liked"
								className="text-reg flex-row flex-align-center flex-justify-center mx-auto flex-wrap"
							>
								<FavoriteBorderOutlined /> Liked
							</NavLink>
						</li>
						<li className="link list-item p-1">
							<NavLink
								to="/watchlater"
								className="text-reg flex-row flex-align-center flex-justify-center mx-auto flex-wrap"
							>
								<WatchLaterOutlined /> Watch Later
							</NavLink>
						</li>
						<li className="link list-item p-1">
							<NavLink
								to="/history"
								className="text-reg flex-row flex-align-center flex-justify-center mx-auto flex-wrap"
							>
								<HistoryOutlined /> History
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
			<form className="search-form mobile-search-form flex-row flex-align-center flex-wrap flex-justify-between br-2">
				<input
					type="text"
					id="input-inline-name"
					className="input-text text-sm"
					placeholder="Enter search text..."
					required
				/>
				<button type="submit" className="btn btn-icon text-sm">
					<span className="icon">
						<Search />
					</span>
				</button>
			</form>
		</nav>
	);
};

export { Navbar };
