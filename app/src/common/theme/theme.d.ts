import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      primary: string
      secondary: string
      tertiary: string
      quaternary: string

      fifth: string,
      sixth: string,
      seventh: string,
      eighth: string

      ninth: string
      tenth: string
      eleventh: string
      twelfth: string

      thirteenth: string
      fourteenth: string
      fifteenth: string
      sixteenth: string

      seventeenth: string
      eighteenth: string
      nineteenth: string
      twentieth: string

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