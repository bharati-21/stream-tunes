import React from "react";
import notFoundImage from "assets/images/not-found.svg";
import { useDocumentTitle } from "custom-hooks";

const NotFound = () => {
	useDocumentTitle("StreamTunes | Page Not Found");

	return (
		<div className="container flex-col flex-align-center flex-justify-center text-center">
			<h1 className="mt-2">Page Not Found!</h1>
			<img src={notFoundImage} />
		</div>
	);
};

export { NotFound };
