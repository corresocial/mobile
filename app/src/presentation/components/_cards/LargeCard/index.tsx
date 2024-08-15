import React, { useState } from 'react'

import { IconName } from '@assets/icons/iconMap/types'

import { ButtonText, Container, ContainerInner, Footer, Header } from './styles'

import { IconComponent } from '@newComponents/IconComponent'

interface LargeCardProps {
	text: string
	icon?: IconName
	relativeWidth?: number | string
	relativeHeight?: number | string
	tone?: 'green' | 'blue' | 'pink'

	onPress: () => void
}

// REFACTOR Pensar em nome melhor
function LargeCard({ text, icon, tone, relativeWidth = 0, relativeHeight = 35, onPress }: LargeCardProps) {
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

	return (
		<Container
			width={relativeWidth}
			height={relativeHeight}
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerInner buttonPressed={buttonPressed}>
				<Header tone={tone}>
					{
						icon && (
							<IconComponent
								iconName={icon}
								relativeHeight={'50%'}
								relativeWidth={'50%'}
							/>
						)
					}
				</Header>
				<Footer>
					<ButtonText>{text}</ButtonText>
				</Footer>
			</ContainerInner>
		</Container>
	)
}

export { LargeCard }
