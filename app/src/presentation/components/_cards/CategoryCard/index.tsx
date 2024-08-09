import React, { useState } from 'react'
import { SvgProps } from 'react-native-svg'

import { Container, ContainerInner, Title } from './styles'
import { relativeScreenDensity } from '@common/screenDimensions'

interface CategoryCardProps {
	title: string
	withoutMargin?: boolean
	SvgIcon?: React.FC<SvgProps>
	hasElements: boolean;
	inactiveColor?: string;
	onPress: () => void
}
function CategoryCard({ title, hasElements, withoutMargin, SvgIcon, inactiveColor = 'white', onPress }: CategoryCardProps) {
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
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
			activeOpacity={1}
			style={{ marginBottom: !withoutMargin ? relativeScreenDensity(15) : 0 }}
		>
			<ContainerInner
				hasElements={hasElements}
				inactiveColor={inactiveColor}
				style={{
					marginLeft: buttonPressed ? 0 : relativeScreenDensity(-7)
				}}
			>
				{SvgIcon && <SvgIcon width={'50%'} height={'50%'} />}
				<Title>
					{title}
				</Title>
			</ContainerInner>
		</Container>
	)
}

export { CategoryCard }
