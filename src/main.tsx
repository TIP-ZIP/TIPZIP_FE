import { StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { createRoot } from 'react-dom/client';
import GlobalStyles from './styles/GlobalStyles';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <GlobalStyles />
      <App />
    </StrictMode>
  </ThemeProvider>,
);
