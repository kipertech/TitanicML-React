import { createContext } from "react";

const themes = {
    light: {
        main: '#4A90E2',
        text: '#000000',
        subText: 'gray',
        divider: '#0000001A',
        dividerFocused: '#000000',
        background: '#FFFFFF',
        xTint: '#486F7F',
        error: '#FD0009',
        green: '#00AE77'
    },
    dark: {
        main: '#5A9EDD',
        text: '#E3E1DE',
        subText: '#E3E1DE',
        divider: '#FFFFFF80',
        dividerFocused: '#FFFFFF',
        background: '#1D1F20',
        xTint: '#486F7F',
        error: '#FD0009',
        green: '#00AE77'
    }
};

const ThemeContext = createContext(themes.light);

export {
    themes,
    ThemeContext
}
