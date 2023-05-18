import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
    gray: Palette['primary'];
  }
  interface PaletteOptions {
    white: PaletteOptions['primary'];
    gray: PaletteOptions['primary'];
  }
}

export let theme = createTheme({
  palette: {
    primary: {
      light: '#57975b',
      main: '#2e7d32',
      dark: '#205723',
      contrastText: '#fff',
    },
    secondary: {
      light: '#efeae2',
      main: '#d8f4cc',
    },
    gray: {
      main: '#f4f5f7',
      dark: '#aaabac',
    },
    white: {
      main: '#fff',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-h1': {
            fontSize: 32,
            fontWeight: 700,
            [theme.breakpoints.up('md')]: {
              fontSize: 45,
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.gray.main,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.gray.main,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.white.main,
          '& .MuiInputLabel-root': {
            color: theme.palette.gray.dark,
          },
        },
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: theme.palette.gray.dark,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
}
