import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1a237e",
            light: "#534bae",
            dark: "#000051",
        },
        secondary: {
            main: "#f50057",
            light: "#ff4081",
            dark: "#c51162",
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "2.5rem",
            fontWeight: 500,
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 500,
        },
        h3: {
            fontSize: "1.75rem",
            fontWeight: 500,
        },
        h4: {
            fontSize: "1.5rem",
            fontWeight: 500,
        },
        h5: {
            fontSize: "1.25rem",
            fontWeight: 500,
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 8,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

export default theme;
