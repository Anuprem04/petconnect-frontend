import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

export const theme = createTheme({
  /** Add your theme overrides here */
  primaryColor: 'yellow', 
  fontFamily: 'Greycliff CF, sans-serif',
  defaultRadius: 'md',
  
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
    <App />
    <Notifications/>
    </MantineProvider>
  </StrictMode>,
)
