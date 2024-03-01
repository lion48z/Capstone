import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary'];
  }

  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
       
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
       
      },
    },
  });




