import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
        primary: string
        secondary: string
        tertiary: string
        quaternary: string

        success: string
        error: string
        info: string
        warning: string
    },

    font: {
        primary: string
        secondary: string
        tertiary: string
    },

    transparence: {
      primary: string
    },
  }
}