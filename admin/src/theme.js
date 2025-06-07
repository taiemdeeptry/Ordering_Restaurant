import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4f46e5",
        },
        secondary: {
            main: "#10b981",
        },
        background: {
            default: "#f9fafb",
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;
