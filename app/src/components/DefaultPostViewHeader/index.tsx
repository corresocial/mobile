import React from 'react'
import { theme } from '../../common/theme'

import { Container, Title } from './styles'
import AngleLeftThin from '../../assets/icons/angleLeftThin.svg'

import { SmallButton } from '../_buttons/SmallButton'

interface DefaultPostViewHeaderProps {
	text?: string
	onBackPress: () => void
}

function DefaultPostViewHeader({ text = '', onBackPress }: DefaultPostViewHeaderProps) {
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
			>
				{text}
			</Title>
		</Container>
	)
}

export { DefaultPostViewHeader }
