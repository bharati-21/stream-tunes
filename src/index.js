import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, AuthProvider, CategoriesProvider, VideosProvider } from "contexts/";
import Portal from "Portal";

// Call make Server
makeServer();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ThemeProvider>
					<CategoriesProvider>
						<VideosProvider>
							<Portal />
							<App />
						</VideosProvider>
					</CategoriesProvider>
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
