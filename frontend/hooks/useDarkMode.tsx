import { useState, useEffect } from 'react';

export function useDarkMode() {
    const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return [darkMode, toggleDarkMode] as const;
}
