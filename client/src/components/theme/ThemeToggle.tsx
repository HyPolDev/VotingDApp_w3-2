import React from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle Theme
        </button>
    );
};

export default ThemeToggle;
