import React from "react";
import headerImage from "assets/images/hero-img.jpg";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<img
				src={headerImage}
				alt="Header hero image with text"
				className="hero-img img-responsive"
			/>
			<div className="container hero-content flex-col flex-align-start flex-justify-start px-3">
				<h2 className="hero-head">
					Stream and Jam to your Favorite Tunes
				</h2>
				<Link
					to="/explore"
					className="btn btn-primary text-lg py-0-25 px-0-5 hero-cta"
				>
					Watch Now
				</Link>
			</div>
		</header>
	);
};

export { Header };
