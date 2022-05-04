import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
	ThemeProvider,
	AuthProvider,
	CategoriesProvider,
	VideosProvider,
    UserDataProvider
} from "contexts/";
import Portal from "Portal";

// Call make Server
makeServer();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<UserDataProvider>
					<ThemeProvider>
						<CategoriesProvider>
							<VideosProvider>
								<Portal />
								<App />
							</VideosProvider>
						</CategoriesProvider>
					</ThemeProvider>
				</UserDataProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
