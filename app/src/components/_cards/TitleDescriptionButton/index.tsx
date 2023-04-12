import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, ContainerInner, Description, Footer, LargeStrongFont, SmallStrongFont, SmallThinFont, Title } from './styles'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { PostRange } from '../../../services/firebase/types'

interface TitleDescriptionButtonProps {
	height: string | number
	color: string
	title: string
	titleFontSize?: number
	description: string
	highlightedWords: string[]
	footerText?: PostRange
	onPress: () => void
}

function TitleDescriptionButton({
	height,
	color,
	title,
	titleFontSize = 22,
	description,
	highlightedWords,
	footerText,
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

	const renderRelativeFooterText = () => {
		switch (footerText) {
			case 'near': return (
				<Footer>
					<SmallThinFont>{'plano '}</SmallThinFont>
					<LargeStrongFont>{'gratuito'}</LargeStrongFont>
					<SmallStrongFont>{''}</SmallStrongFont>
				</Footer>
			)
			case 'city': return (
				<Footer>
					<SmallThinFont>{'R$ '}</SmallThinFont>
					<LargeStrongFont>{'20'}</LargeStrongFont>
					<SmallThinFont>{',00 '}</SmallThinFont>
					<SmallStrongFont>{'/ mês'}</SmallStrongFont>
				</Footer>
			)
			case 'country': return (
				<Footer>
					<SmallThinFont>{'R$ '}</SmallThinFont>
					<LargeStrongFont>{'40'}</LargeStrongFont>
					<SmallThinFont>{',00 '}</SmallThinFont>
					<SmallStrongFont>{'/ mês'}</SmallStrongFont>
				</Footer>
			)
			default: return null
		}
	}

	return (
		<Container
			style={{ height }}
		>
			<ContainerInner
				style={{
					backgroundColor: color,
					marginLeft: buttonPressed ? RFValue(5) : 0
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
				{renderRelativeFooterText()}
			</ContainerInner>
		</Container>
	)
}

export { TitleDescriptionButton }
