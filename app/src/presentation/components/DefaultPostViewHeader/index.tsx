import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import { Container, PathBar, PathTitle, SmallButtonRightSpace, Title } from './styles'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { SmallButton } from '@components/_buttons/SmallButton'

interface DefaultPostViewHeaderProps {
	text?: string
	textPath?: string
	highlightedWords?: string[]
	path?: boolean
	showResults?: boolean
	destructiveButton?: boolean
	smallIconArea?: boolean
	ignorePlatform?: boolean // TODO Implementado temporariamente após ser inserido gradativamente o componente "ScreenContainer" para lidar com status bar IOS
	SvgIcon?: React.FC<SvgProps> | null
	endButton?: boolean
	endButtonColor?: string
	endButtonSvgIcon?: React.FC<SvgProps>
	endButtonText?: string
	onBackPress: () => void
	endButtonPress?: () => void
}

function DefaultPostViewHeader({
	text = '',
	textPath = '',
	highlightedWords = [],
	path,
	showResults,
	destructiveButton,
	ignorePlatform,
	smallIconArea,
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
		if (path && !SvgIcon && textPath) return '30%'
		if (path && !SvgIcon) return '65%'
		if (endButton) return '70%'
		return '85%'
	}

	const renderSvgIcon = () => {
		if (path && textPath) {
			return <PathTitle bold>{textPath}</PathTitle>
		}

		if (smallIconArea && SvgIcon) {
			return <SvgIcon width={'20%'} height={'60%'} />
		}
		if (SvgIcon) {
			return <SvgIcon width={'25%'} height={'60%'} />
		}
	}

	return (
		<Container ignorePlatform={ignorePlatform}>
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
			{endButton && (
				<SmallButton
					color={endButtonColor}
					label={endButtonText}
					SvgIcon={endButtonSvgIcon}
					relativeWidth={relativeScreenWidth(11)}
					height={relativeScreenWidth(11)}
					onPress={() => endButtonPress && endButtonPress()}
				/>
			)}
		</Container>
	)
}

export { DefaultPostViewHeader }
