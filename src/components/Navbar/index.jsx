import React, { useEffect, useState, useCallback, useRef } from "react";
import {
	DarkMode,
	LightMode,
	Menu,
	Close,
	Search,
	Logout,
	Login,
} from "@mui/icons-material";
import { NavLink, Link, useNavigate } from "react-router-dom";

import "./navbar.css";
import logo from "assets/logo/logo-img.png";

import { useTheme, useAuth, useVideos } from "contexts/";
import { useToast } from "custom-hooks";
import {
	useMappedSidebarRoutes,
	useDebounceSearchResults,
	useOutsideClick,
} from "custom-hooks";

const Navbar = () => {
	const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
	const sidebarHamburgerMenuReference = useRef(null);

	const { theme, setTheme } = useTheme();
	const { isAuth, authDispatch } = useAuth();
	const { videosSearchText } = useVideos();
	const navigate = useNavigate();

	const { showToast } = useToast();
	const { mappedSidebarRoutes } = useMappedSidebarRoutes();
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
		navigate("/login");
	};

	const handleChangeShowHamburgerMenu = (e, hamburgerMenuState) => {
		e.stopPropagation();
		setShowHamburgerMenu(hamburgerMenuState);
	};

	const navigateToExplore = (event) => {
		event.preventDefault();
	};

	const { searchText, handleSearchTextChange } = useDebounceSearchResults();

	useOutsideClick(sidebarHamburgerMenuReference, () =>
		setShowHamburgerMenu(false)
	);

	useEffect(() => {
		if (showHamburgerMenu) {
			setShowHamburgerMenu(false);
		}
	}, [location?.pathname]);

	return (
		<nav className="navbar flex-col flex-align-center flex-justify-between py-1">
			<div className="navbar-wrapper flex-row flex-align-center flex-justify-between">
				<div className="navbar-left-menu flex-row flex-align-center flex-justify-between">
					<button className="btn-hamburger btn btn-icon btn-primary">
						<Menu
							onClick={(e) =>
								handleChangeShowHamburgerMenu(e, true)
							}
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
				<form
					className="search-form desktop-search-form flex-row flex-align-center flex-justify-between"
					onSubmit={navigateToExplore}
				>
					<input
						type="search"
						id="input-desktop-search"
						className="input-text text-sm px-0-25"
						placeholder="Search by video name..."
						value={searchText}
						onChange={handleSearchTextChange}
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
								<Login />
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
					ref={sidebarHamburgerMenuReference}
				>
					<button className="btn btn-icon btn-close-icon btn-primary px-0-5 py-0-25">
						<Close
							onClick={(e) =>
								handleChangeShowHamburgerMenu(e, false)
							}
						/>
					</button>
					<ul className="list list-stacked mx-auto mt-2 list-style-none navbar-navlinks text-center">
						{mappedSidebarRoutes}
					</ul>
				</div>
			</div>
			<form
				className="search-form mobile-search-form flex-row flex-align-center flex-wrap flex-justify-between"
				onSubmit={navigateToExplore}
			>
				<input
					type="search"
					id="input-mobile-search"
					className="input-text text-sm"
					onChange={handleSearchTextChange}
					value={videosSearchText}
					placeholder="Search by video name"
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
		</nav>
	);
};

export { Navbar };
