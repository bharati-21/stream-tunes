import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "contexts/theme-context";
import { CategoriesProvider } from "contexts/categories-context";

// Call make Server
makeServer();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ThemeProvider>
					<CategoriesProvider>
						<Portal />
						<App />
					</CategoriesProvider>
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
