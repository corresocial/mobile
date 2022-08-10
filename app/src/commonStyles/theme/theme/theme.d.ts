import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
        primary: string,
        secondary: string
    },

    font: {
        primary: string
    }
  }
}