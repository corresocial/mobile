import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import { Container, ContainerInner, Title } from './styles'

interface CategoryCardProps {
	title: string
	withoutMargin?: boolean
	SvgIcon?: React.FC<SvgProps>
	onPress: () => void
}
function CategoryCard({ title, withoutMargin, SvgIcon, onPress }: CategoryCardProps) {
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
			style={{ marginBottom: !withoutMargin ? RFValue(15) : 0 }}
		>
			<ContainerInner style={{
				marginLeft: buttonPressed ? 0 : RFValue(-7)
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
