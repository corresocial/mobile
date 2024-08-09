import React, { ReactElement, useState } from 'react'

import { Container, ContainerInner } from './styles'
import { relativeScreenDensity } from '@common/screenDimensions'

interface DefaultTouchableCardContainerProps {
	withoutPadding?: boolean
	pressionable?: boolean
	children: ReactElement<any, any> | ReactElement<any, any>[] | any
	onPress?: () => void
}

function DefaultTouchableCardContainer({
	pressionable,
	withoutPadding = false,
	children,
	onPress
}: DefaultTouchableCardContainerProps) {
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
		height: cardHeight
	}

	return (
		<Container
			style={pressionable && pressionableStyle}
			activeOpacity={1}
			onPressIn={pressionable ? pressingButton : () => { }}
			onPressOut={pressionable ? notPressingButton : () => { }}
			onPress={pressionable ? releaseButton : () => { }}
		>
			<ContainerInner
				pressionable={pressionable}
				onLayout={handleLayout}
				style={{
					paddingHorizontal: !withoutPadding ? relativeScreenDensity(15) : 0,
					paddingVertical: !withoutPadding ? relativeScreenDensity(10) : 0,
					justifyContent: 'flex-start',
					right: buttonPressed ? 0 : relativeScreenDensity(5)
				}}
			>
				{children && children}
			</ContainerInner>
		</Container >
	)
}

export { DefaultTouchableCardContainer }
