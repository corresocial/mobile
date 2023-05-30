import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { theme } from '../../../common/theme'
import { Container, ContainerInner, Description, Footer, LargeStrongFont, SmallStrongFont, SmallThinFont, Title, TitleArea } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { relativeScreenHeight } from '../../../common/screenDimensions'

import { SmallButton } from '../../_buttons/SmallButton'

interface TitleDescriptionButtonProps {
	height: string | number
	color: string
	textColor?: string
	activeColor?: string
	title: string
	titleFontSize?: number
	description: string
	highlightedWords: string[]
	footerValue?: string
	yearly?: boolean
	selected?: boolean
	checked?: boolean
	onPress: () => void
}

function TitleDescriptionButton({
	height,
	color,
	textColor,
	activeColor,
	title,
	titleFontSize = 22,
	description,
	highlightedWords,
	footerValue,
	yearly,
	selected,
	checked,
	onPress
}: TitleDescriptionButtonProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		onPress()
	}

	const renderRelativeFooterValue = () => {
		if (footerValue) {
			if (footerValue === 'free') {
				return (
					<Footer>
						<SmallThinFont>{'plano '}</SmallThinFont>
						<LargeStrongFont>{'gratuito'}</LargeStrongFont>
						<SmallStrongFont>{''}</SmallStrongFont>
					</Footer>
				)
			}

			return (
				<Footer>
					<SmallThinFont>{'R$ '}</SmallThinFont>
					<LargeStrongFont>{footerValue}</LargeStrongFont>
					<SmallThinFont>{',00 '}</SmallThinFont>
					<SmallStrongFont>{yearly ? '/ ano' : '/ mês'}</SmallStrongFont>
				</Footer>
			)
		}
	}

	return (
		<Container
			style={{ height }}
		>
			<ContainerInner
				style={{
					backgroundColor: !selected ? color : activeColor,
					marginLeft: buttonPressed || selected ? RFValue(5) : 0
				}}
				onPressIn={pressingButton}
				onPressOut={notPressingButton}
				onPress={releaseButton}
			>
				<TitleArea>
					<Title
						fontSize={titleFontSize}
						textColor={textColor}
						checked={checked}
					>
						{showMessageWithHighlight(title, highlightedWords)}
					</Title>
					{
						checked && (
							<SmallButton
								color={theme.green3}
								SvgIcon={CheckWhiteIcon}
								svgScale={['60%', '60%']}
								height={relativeScreenHeight(5)}
								relativeWidth={relativeScreenHeight(6)}
								onPress={() => { }}
							/>
						)
					}
				</TitleArea>
				<Description textColor={textColor}>
					{showMessageWithHighlight(description, highlightedWords)}
				</Description>
				{renderRelativeFooterValue()}
			</ContainerInner>
		</Container>
	)
}

export { TitleDescriptionButton }
