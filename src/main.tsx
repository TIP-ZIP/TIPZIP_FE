import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@styles/GlobalStyles';
import theme from '@styles/theme/theme';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <GlobalStyles />
      <App />
    </StrictMode>
  </ThemeProvider>,
);
