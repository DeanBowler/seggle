import { ThemeProvider, Preflight, x } from '@xstyled/styled-components';

import { theme } from '@/style/theme';
import { GlobalStyles } from '@/style/globalStyles';
import { Explainer } from '@/components/Explainer';
import { Header } from '@/components/Header';
import { Game } from '@/components/Game';
import { DefaultTheme } from 'styled-components';

export function App() {
  return (
    <ThemeProvider theme={theme as DefaultTheme}>
      <Preflight />
      <GlobalStyles />

      <Explainer />
      <x.div display="flex" flexDirection="column" h="full">
        <Header />
        <Game />
      </x.div>
    </ThemeProvider>
  );
}
