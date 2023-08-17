import React, { ReactElement, useState } from 'react'
import { ViewStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, ContainerInner } from './styles'

interface DefaultCardContainerProps {
	withoutPadding?: boolean
	flex?: ViewStyle['flex']
	pressionable?: boolean
	children: ReactElement<any, any> | ReactElement<any, any>[] | any
	onPress?: () => void
}

function DefaultCardContainer({
	pressionable,
	withoutPadding = false,
	flex = 0,
	children,
	onPress
}: DefaultCardContainerProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)
	const [cardHeight, setCardHeight] = useState<number>()

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		onPress && onPress()
	}

	const handleLayout = (event: any) => {
		const { height } = event.nativeEvent.layout
		setCardHeight(height)
	}

	const pressionableStyle = {
		flex,
		height: cardHeight
	}

	return (
		<Container
			flex={flex}
			style={pressionable && pressionableStyle}
			activeOpacity={1}
			onPressIn={pressionable && pressingButton}
			onPressOut={pressionable && notPressingButton}
			onPress={pressionable && releaseButton}
		>
			<ContainerInner
				pressionable={pressionable}
				onLayout={handleLayout}
				style={{
					paddingHorizontal: !withoutPadding ? RFValue(15) : 0,
					paddingVertical: !withoutPadding ? RFValue(10) : 0,
					flex,
					justifyContent: flex ? 'space-around' : 'flex-start',
					right: buttonPressed ? 0 : RFValue(5)
				}}
			>
				{children && children}
			</ContainerInner>
		</Container >
	)
}

export { DefaultCardContainer }
