import {  Footer, Navbar } from "components";
import { useTheme } from "contexts/theme-context";
import "styles/index.css";
import { NavRoutes } from "routes/NavRoutes";

const App = () => {
    const { theme } = useTheme();
    return (
        <div className={`App ${theme}`}>
            <Navbar />
            <NavRoutes />
            <Footer />
        </div>
    );
}

export default App;
