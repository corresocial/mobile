import React from 'react'
import { SvgProps, SvgUri } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import { theme } from '../../common/theme'
import { relativeScreenWidth } from '../../common/screenDimensions'
import { Container, PathBar, PathTitle, SmallButtonRightSpace, Title } from './styles'
import XWhiteIcon from '../../assets/icons/x-white.svg'

import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'

import { BackButton } from '../_buttons/BackButton'
import { SmallButton } from '../_buttons/SmallButton'

interface DefaultPostViewHeaderProps {
	text?: string
	highlightedWords?: string[]
	path?: boolean
	showResults?: boolean
	destructiveButton?: boolean
	svgUri?: string
	SvgIcon?: React.FC<SvgProps>
	endButton?: boolean
	endButtonColor?: string
	endButtonSvgIcon?: React.FC<SvgProps>
	endButtonText?: string
	onBackPress: () => void
	endButtonPress: () => void
}

function DefaultPostViewHeader({
	text = '',
	highlightedWords = [],
	path,
	showResults,
	destructiveButton,
	svgUri,
	SvgIcon,
	endButton,
	endButtonColor,
	endButtonSvgIcon,
	endButtonText,
	endButtonPress,
	onBackPress
}: DefaultPostViewHeaderProps) {
	const getTitleWidth = () => {
		if (SvgIcon && path) return '50%'
		if (SvgIcon && !path) return '65%'
		if (path && !SvgIcon) return '65%'
		if (endButton) return '70%'
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
			{
				!destructiveButton
					? <BackButton onPress={onBackPress} />
					: (
						<>
							<SmallButton
								color={theme.red3}
								SvgIcon={XWhiteIcon}
								relativeWidth={relativeScreenWidth(11)}
								height={relativeScreenWidth(11)}
								onPress={onBackPress}
							/>
							<SmallButtonRightSpace />
						</>
					)
			}
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
			{ endButton && (

				<SmallButton
					color={endButtonColor}
					text={endButtonText}
					SvgIcon={endButtonSvgIcon}
					relativeWidth={relativeScreenWidth(11)}
					height={relativeScreenWidth(11)}
					onPress={endButtonPress}
				/>
			)}
		</Container>
	)
}

export { DefaultPostViewHeader }
