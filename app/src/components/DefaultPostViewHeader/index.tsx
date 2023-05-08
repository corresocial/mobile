import React from 'react'
import { SvgProps, SvgUri } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, PathBar, PathTitle, Title } from './styles'

import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'
import { BackButton } from '../_buttons/BackButton'

interface DefaultPostViewHeaderProps {
	text?: string
	highlightedWords?: string[]
	path?: boolean
	showResults?: boolean
	svgUri?: string
	SvgIcon?: React.FC<SvgProps>
	onBackPress: () => void
}

function DefaultPostViewHeader({
	text = '',
	highlightedWords = [],
	path,
	showResults,
	svgUri,
	SvgIcon,
	onBackPress
}: DefaultPostViewHeaderProps) {
	const getTitleWidth = () => {
		if (SvgIcon && path) return '50%'
		if (SvgIcon && !path) return '65%'
		if (path && !SvgIcon) return '65%'
		return '85%'
	}

	const renderSvgIcon = () => {
		if (svgUri) {
			return <SvgUri uri={svgUri} width={'15%'} height={'60%'} />
		}
		if (SvgIcon) {
			return <SvgIcon width={'25%'} height={'60%'} />
		}
	}

	return (
		<Container>
			<BackButton onPress={onBackPress} />
			{
				showResults
					? <PathTitle>{text}</PathTitle>
					: renderSvgIcon()
			}
			{path && <PathBar>{'/'}</PathBar>}
			<Title
				numberOfLines={2}
				style={{
					fontFamily: highlightedWords.length > 0 ? 'Arvo_400Regular' : 'Arvo_700Bold',
					width: getTitleWidth(),
					fontSize: path ? RFValue(15) : RFValue(20)
				}}
			>
				{
					showResults
						? showMessageWithHighlight('resultados', ['resultados'])
						: showMessageWithHighlight(text, highlightedWords)
				}
			</Title>
		</Container>
	)
}

export { DefaultPostViewHeader }
