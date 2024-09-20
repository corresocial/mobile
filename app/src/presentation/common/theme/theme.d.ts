import 'styled-components'

type Tonality = {
	1: string
	2: string
	3: string
	4: string
}

type FontSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30

type TransparenceFunction = (opacity?: number) => string;
interface Transparence {
	orange: ColorFunction;
	blue: ColorFunction;
	green: ColorFunction;
	yellow: ColorFunction;
	red: ColorFunction;
	purple: ColorFunction;
	pink: ColorFunction;
}

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			white: Tonality
			black: Tonality
			orange: Tonality
			purple: Tonality
			blue: Tonality
			red: Tonality
			pink: Tonality
			yellow: Tonality
			green: Tonality
		}

		transparence: Transparence,

		fonts: {
			arvoRegular: string
			arvoBold: string
			nunitoSemiBold: string
			nunitoBold: string
		},

		fontSizes: { [key in FontSizes]: number }

		shadowSize: {
			small: number
			medium: number
			large: number
		}
	}
}
