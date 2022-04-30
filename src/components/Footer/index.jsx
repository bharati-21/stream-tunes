import React from "react";
import "./footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container px-3 py-1 flex-col flex-align-center flex-justify-center">
				<p className="text-center flex-row flex-align-center flex-justify-center author">
					<i className="fa-solid fa-code"></i> by{" "}
					<a
						href="https://bharati-21.github.io/"
						className="primary-color"
					>
						Bharati Subramanian
					</a>
				</p>
				<ul className="footer-navlinks list list-inline flex-row flex-align-center flex-justify-between">
					<li className="list-item">
						<a
							href="https://twitter.com/_bhaaratii"
							className="btn btn-link"
						>
							<span className="icon">
								<i className="fa-brands fa-twitter"></i>
							</span>
						</a>
					</li>
					<li className="list-item">
						<a
							href="https://github.com/bharati-21"
							className="btn btn-link"
						>
							<span className="icon">
								<i className="fa-brands fa-github"></i>
							</span>
						</a>
					</li>
					<li className="list-item">
						<a
							href="https://www.linkedin.com/in/bharati-subramanian-29734b152/"
							className="btn btn-link"
						>
							<span className="icon">
								<i className="fa-brands fa-linkedin-in"></i>
							</span>
						</a>
					</li>
					<li className="list-item">
						<a
							href="mailto:bharatisharada@gmail.com"
							className="btn btn-link"
						>
							<span className="icon">
								<i className="fa-solid fa-envelope"></i>
							</span>
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export { Footer };