import 'styled-components';
import '@xstyled/system';
import {
  defaultTheme,
  ITheme,
  DefaultTheme as XStyledDefaultTheme,
} from '@xstyled/styled-components';

export interface AppTheme extends ITheme, XStyledDefaultTheme {
  colors: {
    positive: string;
    negative: string;
    warning: string;
  } & XStyledDefaultTheme['colors'];
}

export const theme: Partial<AppTheme> = {
  ...defaultTheme,
  colors: {
    positive: 'hsl(130, 65%, 50%)',
    negative: 'hsl(0, 80%, 60%)',
    warning: 'hsl(50, 190%, 48%)',
    ...defaultTheme.colors,
  },
};

declare module '@xstyled/system' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends AppTheme {}
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}
