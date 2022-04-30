import React, { useEffect, useState } from "react";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import "./navbar.css";
import logo from "assets/logo/logo-img.png";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "contexts/theme-context";

const Navbar = () => {
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    const { theme, setTheme } = useTheme();
    const handleThemeChange = () => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');

    useEffect(() => {
        localStorage.setItem('stream-tunes-theme', theme);
    }, [theme]);
    
    const handleChangeShowHamburgerMenu = (hamburgerMenuState) => setShowHamburgerMenu(hamburgerMenuState)

	return (
		<nav className="navbar px-3 py-1">
			<div className="container flex-row flex-align-center flex-justify-between">
				<div>
					<Link
						to="/"
						className="logo flex-row flex-align-center flex-justify-between"
					>
						<img
							src={logo}
							alt="StreamTunes Logo"
							className="logo-img"
                            width="1rem"
                            height="1rem"
						/>
						<h4 className="logo-text">
							Stream
							<span className="primary-color">Tunes</span>
						</h4>
					</Link>
				</div>
				<ul className="list list-inline navbar-center-menu flex-row flex-align-center flex-justify-between navbar-navlinks">
					<li className="link">
						<NavLink to="/">Home</NavLink>
					</li>
					<li className="link">
						<NavLink to="/explore">Explore</NavLink>
					</li>
				</ul>
				<ul className="list list-inline flex-row flex-align-center flex-justify-end navbar-navlinks navbar-right-menu">
					<button className="btn btn-primary px-0-5 py-0-25">
						Login
					</button>
                    <button className="btn btn-secondary btn-icon btn-theme p-0-25" onClick={handleThemeChange}>
                        {
                            theme  === 'light' ? <LightMode /> : <DarkMode />
                        }
                    </button>
				</ul>
                <button className="btn-hamburger btn btn-icon btn-primary">
                    <Menu onClick={() => handleChangeShowHamburgerMenu(true)} />
                </button>
                <div className={`hamburger-menu ${showHamburgerMenu ? 'show-hamburger-menu' : 'close-hamburger-menu'} mx-auto p-2 flex-col flex-align-center flex-justify-between`}>
                    <button className="btn btn-icon btn-primary px-0-5 py-0-25" >
                        <Close onClick={() => handleChangeShowHamburgerMenu(false)} />
                    </button>
                    <ul className="list list-stacked mx-auto list-style-none navbar-navlinks text-center">
                        <li className="list-item p-0-5">
                            <button className="btn btn-secondary btn-icon btn-theme p-0-25 mx-auto" onClick={handleThemeChange}>
                                {
                                    theme  === 'light' ? <LightMode /> : <DarkMode />
                                }
                            </button>
                        </li>
                        <li className="link list-item p-1">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="link list-item p-1">
                            <NavLink to="/explore">Explore</NavLink>
                        </li>
                    </ul>
                    <button className="btn btn-primary px-0-5 py-0-25">
						Login
					</button>
                </div>
			</div>
		</nav>
	);
};

export { Navbar };
