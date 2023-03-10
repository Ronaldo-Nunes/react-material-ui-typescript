import { createTheme } from '@mui/material';
import { blue, orange } from '@mui/material/colors';


export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      default: '#202124', // cor de fundo do site
      paper: '#303134', // usado nos cards
    }
  },
  typography: {
    allVariants: {
      color: '#ffffff'
    }
  }
});