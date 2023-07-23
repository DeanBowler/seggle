import { ThemeProvider, Preflight, x } from '@xstyled/styled-components';
import { DefaultTheme } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { theme } from '@/style/theme';
import { GlobalStyles } from '@/style/globalStyles';
import { Explainer } from '@/components/Explainer';
import { Header } from '@/components/Header';
import { Easy } from '@/screens/easy';

import { SvgFilterDefinitions } from './components/SvgFilters';

export function App() {
  return (
    <>
      <BrowserRouter>
    <ThemeProvider theme={theme as DefaultTheme}>
      <Preflight />
      <GlobalStyles />

      <Explainer />
      <x.div display="flex" flexDirection="column" h="full">
        <Header />
            <Routes>
              <Route path="/" element={<Easy />} />
            </Routes>
      </x.div>
      <SvgFilterDefinitions />
    </ThemeProvider>
      </BrowserRouter>
      <Analytics />
    </>
  );
}
