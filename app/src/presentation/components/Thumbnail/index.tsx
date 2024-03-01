import React from 'react'

import { ThumbnailContainer, ThumbnailImage } from './styles' 

interface ThumbnailProps{
    imageId: number,
    active: boolean,
    image: any,
    onPress: (imageId: number) => void
}

function Thumbnail({ imageId, active, image, onPress }: ThumbnailProps) {
	const imagePressedHandler = () => {
		onPress(imageId)
	}

	return (
		<ThumbnailContainer 
			onPress={imagePressedHandler} 
			active={active} 
			activeOpacity={1}
		>
			<ThumbnailImage
				resizeMode={'cover'}
				source={{ uri: image }}
			/>
		</ThumbnailContainer>
	)
}

export { Thumbnail }