import { createContext, useContext, useState, useEffect } from 'react';

const initialTheme = { theme: 'light' };

const ThemeContext = createContext(initialTheme);
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('stream-tunes-theme') || 'light');

    return <Provider value={{ theme, setTheme }}>
        { children }
    </Provider>
}

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };