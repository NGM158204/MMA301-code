import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme) {
                setIsDarkMode(savedTheme === 'dark');
            }
        };
        loadTheme();
    }, []);
    const toggleTheme = async () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };
    const theme = {
        isDarkMode,
        colors: {
            background: isDarkMode ? '#222' : '#f5f5f5',
            text: isDarkMode ? '#fff' : '#333',
            primary: '#007AFF',
            border: isDarkMode ? '#444' : '#ccc',
        },
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};