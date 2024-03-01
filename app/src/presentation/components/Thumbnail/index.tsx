import React from 'react'

import { ThumbnailContainer, ThumbnailImage } from './styles'

interface ThumbnailProps{
    imageId: number,
    active: boolean,
    pictureUrl: string,
    onPress: (imageId: number) => void
}

function Thumbnail({ imageId, active, pictureUrl, onPress }: ThumbnailProps) {
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
				source={{ uri: pictureUrl }}
			/>
		</ThumbnailContainer>
	)
}

export { Thumbnail }
