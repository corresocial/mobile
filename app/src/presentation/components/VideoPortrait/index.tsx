import { ResizeMode } from 'expo-av'
import React from 'react'

import { Container, DeleteItemArea, NoPhotoContainer, PortraitVideo, VideoIndicatorContainer } from './styles'
import ThashWhiteIcon from '@assets/icons/trash-white.svg'
import VideoCameraIcon from '@assets/icons/video-camera-white.svg'
import NoPhoto from '@assets/imgs/noPhoto.svg'
import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'

interface VideoPortraitProps {
	width: number | string
	height: number | string
	circle?: boolean
	borderWidth?: number
	borderRightWidth?: number
	resizeMode?: /* ResizeMode */ any
	videoUrl: string
	maxWidth?: number
	showVideoPlayer?: boolean
	deleteCurrentVideo?: () => void
}

function VideoPortrait({
	width,
	height,
	circle,
	borderWidth = 5,
	borderRightWidth = 10,
	videoUrl,
	resizeMode = 'cover',
	maxWidth = relativeScreenWidth(90),
	showVideoPlayer = false,
	deleteCurrentVideo
}: VideoPortraitProps) {
	return (
		<Container
			circle={circle}
			height={height}
			width={width}
			maxWidth={maxWidth}
			borderWidth={borderWidth}
			borderRightWidth={borderRightWidth}
		>
			{
				videoUrl
					? (
						<>
							<PortraitVideo
								source={{ uri: videoUrl }}
								useNativeControls={showVideoPlayer}
								isLooping
								volume={0}
								resizeMode={ResizeMode.CONTAIN}
								shouldPlay
							/>
						</>
					)
					: (
						<NoPhotoContainer>
							<NoPhoto width={'100%'} height={'100%'} />
						</NoPhotoContainer>
					)
			}
			{
				deleteCurrentVideo && videoUrl
					? (
						<DeleteItemArea onPress={deleteCurrentVideo}>
							<SmallButton
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								color={theme.red3}
								SvgIcon={ThashWhiteIcon}
								svgScale={['55%', '55%']}
								onPress={deleteCurrentVideo}
							/>
						</DeleteItemArea>
					)
					: null
			}
			<VideoIndicatorContainer>
				<VideoCameraIcon width={relativeScreenDensity(40)} height={relativeScreenDensity(40)} />
			</VideoIndicatorContainer>
		</Container >
	)
}

export { VideoPortrait }
