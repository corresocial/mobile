import React from 'react'

import { ThumbnailContainer, ThumbnailImage, VideoIcon } from './styles'
import VideoCameraIcon from '@assets/icons/video-camera-white.svg'

interface ThumbnailProps{
    imageId: number,
    active: boolean,
    pictureUrl: string,
	isVideo?: boolean
    onPress: (imageId: number) => void
}

function Thumbnail({ imageId, active, pictureUrl, isVideo = false, onPress }: ThumbnailProps) {
	const imagePressedHandler = () => {
		onPress(imageId)
	}

	return (
		<ThumbnailContainer
			onPress={imagePressedHandler}
			active={active}
			activeOpacity={1}
		>
			{
				isVideo && (
					<VideoIcon>
						<VideoCameraIcon/>
					</VideoIcon>
				)
			}
			
			<ThumbnailImage
				resizeMode={'cover'}
				source={{ uri: pictureUrl }}
			/>
		</ThumbnailContainer>
	)
}

export { Thumbnail }
