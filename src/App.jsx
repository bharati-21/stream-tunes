import { useLocation } from "react-router-dom";

import { Footer, Navbar } from "components";
import { useTheme } from "contexts/theme-context";
import "styles/index.css";
import { NavRoutes } from "routes/NavRoutes";

const App = () => {
	const { theme } = useTheme();
	const { pathname } = useLocation();

	return (
		<div className={`App ${theme}`}>
			<Navbar />
			<NavRoutes />
			{pathname === "/" ? <Footer /> : null}
		</div>
	);
};

export default App;
