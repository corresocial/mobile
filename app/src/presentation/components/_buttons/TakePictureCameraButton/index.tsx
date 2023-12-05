import React, { useState } from 'react'

import { OutlinedContainer, ShadowButton, TakePictureButtonBottom, TakePictureButtonSurface } from './styles'

interface TakePictureCameraButtonProps {
	onPress?: () => Promise<void>
}

function TakePictureCameraButton({ onPress }: TakePictureCameraButtonProps) {
	const [buttonPressed, setButtonPressed] = useState(false)

	function pressingButton() {
		setButtonPressed(true)
	}

	function notPressingButton() {
		setButtonPressed(false)
	}

	function releaseButton() {
		setButtonPressed(false)
		onPress && onPress()
	}

	return (
		<OutlinedContainer buttonPressed={buttonPressed} >
			<ShadowButton buttonPressed={buttonPressed} >
				<TakePictureButtonBottom buttonPressed={buttonPressed}>
					<TakePictureButtonSurface
						opacity={1}
						buttonPressed={buttonPressed}
						onPressIn={pressingButton}
						onPressOut={notPressingButton}
						onPress={releaseButton}
					/>
				</TakePictureButtonBottom>
			</ShadowButton>
		</OutlinedContainer >
	)
}

export { TakePictureCameraButton }
