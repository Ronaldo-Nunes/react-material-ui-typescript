import { createTheme } from "@mui/material";
import { blue, orange } from "@mui/material/colors";


export const LightTheme = createTheme({
    palette: {
        primary: {
            main: blue[700],
            dark: blue[800],
            light: blue[500],
            contrastText: '#ffffff',
        },
        secondary: {
            main: orange[500],
            dark: orange[400],
            light: orange[300],
            contrastText: '#ffffff',
        },
        background: {
            default: '#f7f6f3', // cor de fundo do site
            paper: '#ffffff', // usado nos cards
        }
    }
});