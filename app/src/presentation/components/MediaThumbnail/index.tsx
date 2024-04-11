import { Asset } from 'expo-media-library'
import React from 'react'

import { MediaThumbnailImage, MediaThumbnailView, SelectionIndicatorView, ThumbnailOverlay, VideoIndicator } from './styles'
import CheckIcon from '@assets/icons/check-white.svg'
import CameraIcon from '@assets/icons/video-camera-white.svg' 
import { relativeScreenWidth } from '@common/screenDimensions'

interface MediaThumbnailProps{
    mediaAsset: Asset,
    active: boolean,
    onSelection: (mediaAsset: Asset) => void
}

function MediaThumbnail({ mediaAsset, active, onSelection }: MediaThumbnailProps) {
	return (
		<MediaThumbnailView activeOpacity={0.8} onPress={() => onSelection(mediaAsset)}>
			<MediaThumbnailImage resizeMode={'cover'} source={{ uri: mediaAsset.uri }}/>
			{	
				active && (
					<ThumbnailOverlay>
						<SelectionIndicatorView>
							<CheckIcon width={relativeScreenWidth(4.5)}/>
						</SelectionIndicatorView>
					</ThumbnailOverlay>
				)
			}
			{
				mediaAsset.mediaType === 'video' && (
					<VideoIndicator>
						<CameraIcon/>
					</VideoIndicator>
				)	
			}
		</MediaThumbnailView>
	)
}

export { MediaThumbnail }