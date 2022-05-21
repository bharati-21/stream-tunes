import React from "react";
import notFoundImage from "assets/images/not-found.svg";

const NotFound = () => {
	return (
		<div className="container flex-col flex-align-center flex-justify-center">
			<h1 className="mt-2">Page Not Found!</h1>
			<img src={notFoundImage} />
		</div>
	);
};

export { NotFound };
