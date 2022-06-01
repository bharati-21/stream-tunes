import { CategoryList, Header } from "components";
import { useDocumentTitle } from "custom-hooks";
import React, { useEffect } from "react";

const Home = () => {
	const setDocumentTitle = useDocumentTitle();
	useEffect(() => {
		setDocumentTitle("StreamTunes | Home");
	}, []);

	return (
		<main className="main landing-page-main">
			<Header />
			<CategoryList />
		</main>
	);
};

export { Home };
