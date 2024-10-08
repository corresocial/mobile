import { DefaultTheme } from 'styled-components'

import { platformIsAndroid, relativeScreenDensity } from '@common/screenDimensions'

export const theme: DefaultTheme = { // NOTE: Instale a extenção Color Highlight pra facilitar sua vida
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
			4: '#000000',
			// 4: '#0F1317',
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

	transparence: {
		orange: (opacity?: number) => `rgba(250, 153, 56, ${opacity ? opacity / 100 : '0.7'})`,
		blue: (opacity?: number) => `rgba(48, 140, 232, ${opacity ? opacity / 100 : '0.7'})`,
		green: (opacity?: number) => `rgba(18, 161, 89, ${opacity ? opacity / 100 : '0.7'})`,
		yellow: (opacity?: number) => `rgba(251, 206, 55, ${opacity ? opacity / 100 : '0.7'})`,
		red: (opacity?: number) => `rgba(232, 79, 48, ${opacity ? opacity / 100 : '0.7'})`,
		purple: (opacity?: number) => `rgba(153, 71, 235, ${opacity ? opacity / 100 : '0.7'})`,
		pink: (opacity?: number) => `rgba(232, 48, 110, ${opacity ? opacity / 100 : '0.7'})`,
	},

	fonts: {
		arvoRegular: platformIsAndroid ? 'Arvo_400Regular' : 'Arvo-Regular',
		arvoBold: platformIsAndroid ? 'Arvo_700Bold' : 'Arvo-Bold',
		nunitoSemiBold: platformIsAndroid ? 'Nunito_600SemiBold' : 'Nunito-SemiBold',
		nunitoBold: platformIsAndroid ? 'Nunito_700Bold' : 'Nunito-Bold'
	},

	fontSizes: {
		0: relativeScreenDensity(10),
		1: relativeScreenDensity(11),
		2: relativeScreenDensity(12),
		3: relativeScreenDensity(13),
		4: relativeScreenDensity(14),
		5: relativeScreenDensity(15),
		6: relativeScreenDensity(16),
		7: relativeScreenDensity(17),
		8: relativeScreenDensity(18),
		9: relativeScreenDensity(19),
		10: relativeScreenDensity(20),
		11: relativeScreenDensity(21),
		12: relativeScreenDensity(22),
		13: relativeScreenDensity(23),
		14: relativeScreenDensity(24),
		15: relativeScreenDensity(25),
		16: relativeScreenDensity(26),
		17: relativeScreenDensity(27),
		18: relativeScreenDensity(28),
		19: relativeScreenDensity(29),
		20: relativeScreenDensity(30),
		21: relativeScreenDensity(31),
		22: relativeScreenDensity(32),
		23: relativeScreenDensity(33),
		24: relativeScreenDensity(34),
		25: relativeScreenDensity(35),
		26: relativeScreenDensity(36),
		27: relativeScreenDensity(37),
		28: relativeScreenDensity(38),
		29: relativeScreenDensity(39),
		30: relativeScreenDensity(40),
	},

	shadowSize: {
		small: relativeScreenDensity(3),
		medium: relativeScreenDensity(4),
		large: relativeScreenDensity(5)
	}
}
