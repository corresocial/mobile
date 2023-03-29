/* import React from 'react'
import MaskedView from '@react-native-community/masked-view'
import { LinearGradient } from 'expo-linear-gradient'

import { theme } from '@common/theme'

interface TextGradientProps {
	children: any // Type not used
}

function TextGradient({ children }: TextGradientProps) {
	return (
		<MaskedView
			maskElement={children({ backgroundColor: 'transparent' })}
		>
			<LinearGradient
				start={{ x: 1, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[theme.black4, theme.black1]}
			>
				{children({ opacity: 0 })}
			</LinearGradient>
		</MaskedView>
	)
}

export { TextGradient }
 */
