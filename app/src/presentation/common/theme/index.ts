import { DefaultTheme } from 'styled-components'

import { relativeScreenDensity } from '@common/screenDimensions'

export const theme: DefaultTheme = { // NOTE: Instale a extenção Color Highlight pra facilitar sua vida
	white1: '#D0CECE',
	white2: '#F2F2F2',
	white3: '#FFFFFF',

	black1: '#7A7474',
	black2: '#4D4847',
	black3: '#262626',
	black4: '#000000',
	black5: '#000000',

	orange1: '#FDC895',
	orange2: '#FBB068',
	orange3: '#FA9938',
	orange4: '#C9731D',
	orange5: '#664019',

	purple1: '#CCA3F5',
	purple2: '#B274F0',
	purple3: '#9947EB',
	purple4: '#7335B1',
	purple5: '#4D2476',

	red1: '#F3A797',
	red2: '#EE7A63',
	red3: '#E84F30',
	red4: '#AF3B24',
	red5: '#742818',

	pink1: '#F397B6',
	pink2: '#EE6392',
	pink3: '#E8306E',
	pink4: '#AF2453',
	pink5: '#741837',

	blue1: '#97C5F3',
	blue2: '#63A8EE',
	blue3: '#308CE8',
	blue4: '#2469AF',
	blue5: '#184674',

	yellow1: '#FDE69B',
	yellow2: '#FCDA69',
	yellow3: '#FBCE37',
	yellow4: '#BC9A29',
	yellow5: '#7E671C',

	green1: '#88D0AC',
	green2: '#4DB882',
	green3: '#12A159',
	green4: '#0E7943',
	green5: '#09512D',

	colors: {
		white: {
			1: '#D0CECE',
			2: '#F2F2F2',
			3: '#FFFFFF',
			4: '#FFFFFF'
		},
		black: {
			1: '#7A7474',
			2: '#4D4847',
			3: '#262626',
			4: '#0F1317',
		},
		orange: {
			1: '#FFE4BF',
			2: '#FFCF8C',
			3: '#FFAA33',
			4: '#D97E00',
		},
		green: {
			1: '#A3D9B9',
			2: '#62D993',
			3: '#13BF5B',
			4: '#089944',
		},
		pink: {
			1: '#FFBFDF',
			2: '#FF8CC6',
			3: '#FF599E',
			4: '#D9005A',
		},
		blue: {
			1: '#B2E5FF',
			2: '#66CCFF',
			3: '#1AB2FF',
			4: '#0080BF',
		},
		purple: {
			1: '#F2CCFF',
			2: '#E699FF',
			3: '#D866FF',
			4: '#A200D9',
		},
		red: {
			1: '#FFCABF',
			2: '#FFA08C',
			3: '#E84F30',
			4: '#D92500',
		},
		yellow: {
			1: '#F2E6AA',
			2: '#FFE666',
			3: '#FFCC33',
			4: '#D9A300',
		}
	},

	transparence: { // REFACTOR TODO Renomear opacidades sem o numeral
		orange1: 'rgba(250, 153, 56, 0.7)',
		orange2: 'rgba(250, 153, 56, 0.9)',

		red: 'rgba(232, 79, 48, 0.9)',
		green: 'rgba(18, 161, 89, 0.7)',
		purple3: 'rgba(153, 71, 235, 0.25)',
		yellow3: 'rgba(251, 206, 55, 0.25)',
		blue3: 'rgba(48, 140, 232, 0.25)',
		pink3: 'rgba(232, 48, 110, 0.25)',
	},

	fonts: {
		arvoRegular: 'Arvo_400Regular',
		arvoBold: 'Arvo_700Bold',
		nunitoSemiBold: 'Nunito_600SemiBold',
		nunitoBold: 'Nunito_700Bold'
	},

	fontSizes: {
		arvo: {
			1: relativeScreenDensity(10),
			2: relativeScreenDensity(12),
			3: relativeScreenDensity(14),
			4: relativeScreenDensity(16),
			5: relativeScreenDensity(18)
		},
		nunito: {
			1: relativeScreenDensity(10),
			2: relativeScreenDensity(12),
			3: relativeScreenDensity(14)
		}
	}
}
