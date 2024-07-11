import 'styled-components'


type Tonality = {
	1: string
	2: string
	3: string
	4: string
}

// and extend it
declare module 'styled-components' {
	export interface DefaultTheme {
		white1: string
		white2: string
		white3: string

		black1: string
		black2: string
		black3: string
		black4: string
		black5: string

		orange1: string
		orange2: string
		orange3: string
		orange4: string
		orange5: string

		purple1: string
		purple2: string
		purple3: string
		purple4: string
		purple5: string

		red1: string
		red2: string
		red3: string
		red4: string
		red5: string

		pink1: string
		pink2: string
		pink3: string
		pink4: string
		pink5: string

		blue1: string
		blue2: string
		blue3: string
		blue4: string
		blue5: string

		yellow1: string
		yellow2: string
		yellow3: string
		yellow4: string
		yellow5: string

		green1: string
		green2: string
		green3: string
		green4: string
		green5: string

		// Solução temporária, mudar as cores quebra o app todo.

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

		transparence: {
			orange1: string // Orange Light
			orange2: string // Orange Medium

			red: string
			green: string
			purple3: string
			yellow3: string
			blue3: string
			pink3: string
		},

		fonts: {
			arvoRegular: string
			arvoBold: string
			nunitoSemiBold: string
			nunitoBold: string
		},

		fontSizes: {
			arvo: {
				1: number
				2: number
				3: number
				4: number
			}

			nunito: {
				1: number
				2: number
				3: number
			}
		}
	}
}
