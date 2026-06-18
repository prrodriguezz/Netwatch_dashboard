import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00D4FF' },
    secondary: { main: '#A78BFA' },
    error: { main: '#FF4D6A' },
    warning: { main: '#FFB700' },
    success: { main: '#00E096' },
    background: { default: '#0A0E1A', paper: '#111827' },
    text: { primary: '#E2E8F0', secondary: 'rgba(226,232,240,0.55)' },
    divider: 'rgba(0,212,255,0.1)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: { fontWeight: 600, letterSpacing: '-0.02em' },
    h6: { fontWeight: 500 },
    body2: { fontSize: '0.8125rem' },
    caption: { fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '0.5px solid rgba(0,212,255,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500, fontSize: '0.7rem' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: 'rgba(0,212,255,0.07)', fontSize: '0.78rem' },
        head: { color: 'rgba(226,232,240,0.4)', fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 400 },
      },
    },
  },
});
