import React from 'react'
import { theme } from '../../common/theme'

import { Container, Title } from './styles'
import AngleLeftThin from '../../assets/icons/angleLeftThin.svg'

import { SmallButton } from '../_buttons/SmallButton'
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'

interface DefaultPostViewHeaderProps {
	text?: string
	highlightedWords?: string[]
	onBackPress: () => void
}

function DefaultPostViewHeader({ text = '', highlightedWords = [], onBackPress }: DefaultPostViewHeaderProps) {
	return (
		<Container>
			<SmallButton
				relativeWidth={40}
				height={40}
				color={theme.white3}
				SvgIcon={AngleLeftThin}
				onPress={onBackPress}
			/>
			<Title
				numberOfLines={2}
				style={{ fontFamily: highlightedWords.length > 0 ? 'Arvo_400Regular' : 'Arvo_700Bold' }}
			>
				{showMessageWithHighlight(text, highlightedWords)}
			</Title>
		</Container>
	)
}

export { DefaultPostViewHeader }
