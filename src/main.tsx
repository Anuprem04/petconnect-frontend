import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, MantineProvider } from '@mantine/core';

export const theme = createTheme({
  /** Add your theme overrides here */
  primaryColor: 'orange', 
  fontFamily: 'Open Sans, sans-serif',
  defaultRadius: 'md',
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
    <App />
    </MantineProvider>
  </StrictMode>,
)
