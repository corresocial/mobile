import React from 'react'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'
import { theme } from '../../common/theme'

import { Container, PathBar, Title } from './styles'
import AngleLeftThin from '../../assets/icons/angleLeftThin.svg'

import { SmallButton } from '../_buttons/SmallButton'
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'

interface DefaultPostViewHeaderProps {
	text?: string
	highlightedWords?: string[]
	path?: boolean
	SvgIcon?: React.FC<SvgProps>
	onBackPress: () => void
}

function DefaultPostViewHeader({
	text = '',
	highlightedWords = [],
	path,
	SvgIcon,
	onBackPress
}: DefaultPostViewHeaderProps) {
	const getTitleWidth = () => {
		if (SvgIcon && path) return '50%'
		if (SvgIcon && !path) return '65%'
		if (path && !SvgIcon) return '65%'
		return '85%'
	}

	return (
		<Container>
			<SmallButton
				relativeWidth={40}
				height={40}
				color={theme.white3}
				SvgIcon={AngleLeftThin}
				onPress={onBackPress}
			/>
			{SvgIcon && <SvgIcon width={'25%'} height={'60%'} />}
			{path && <PathBar>{'/'}</PathBar>}
			<Title
				numberOfLines={2}
				style={{
					fontFamily: highlightedWords.length > 0 ? 'Arvo_400Regular' : 'Arvo_700Bold',
					width: getTitleWidth(),
					paddingLeft: SvgIcon ? 0 : RFValue(10),
					fontSize: path ? RFValue(15) : RFValue(20)
				}}
			>
				{showMessageWithHighlight(text, highlightedWords)}
			</Title>
		</Container>
	)
}

export { DefaultPostViewHeader }
