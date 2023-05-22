import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, ContainerInner, Description, Footer, LargeStrongFont, SmallStrongFont, SmallThinFont, Title } from './styles'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

interface TitleDescriptionButtonProps {
	height: string | number
	color: string
	activeColor?: string
	title: string
	titleFontSize?: number
	description: string
	highlightedWords: string[]
	footerValue?: string
	yearly?: boolean
	selected?: boolean
	onPress: () => void
}

function TitleDescriptionButton({
	height,
	color,
	activeColor,
	title,
	titleFontSize = 22,
	description,
	highlightedWords,
	footerValue,
	yearly,
	selected,
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
				<Title
					style={{
						fontSize: RFValue(titleFontSize)
					}}
				>
					{showMessageWithHighlight(title, highlightedWords)}
				</Title>
				<Description>
					{showMessageWithHighlight(description, highlightedWords)}
				</Description>
				{renderRelativeFooterValue()}
			</ContainerInner>
		</Container>
	)
}

export { TitleDescriptionButton }
