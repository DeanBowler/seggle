import { ThemeProvider, Preflight, x } from '@xstyled/styled-components';
import { theme } from './theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <x.h1 margin={5}>Welcome</x.h1>
    </ThemeProvider>
  );
}
