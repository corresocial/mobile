import { ResizeMode } from 'expo-av'
import React from 'react'
import { ImageResizeMode } from 'react-native'

import { Container, DeleteItemArea, NoPhotoContainer, PortraitVideo } from './styles'
import ThashWhiteIcon from '@assets/icons/trash-white.svg'
import NoPhoto from '@assets/imgs/noPhoto.svg'
import UserShadow from '@assets/imgs/userShadow.jpg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'

interface VideoPortraitProps {
	width: number | string
	height: number | string
	circle?: boolean
	borderWidth?: number
	borderRightWidth?: number
	resizeMode?: ResizeMode
	videoUrl: string
	maxWidth?: number
	deleteCurrentVideo?: () => void
}

function VideoPortrait({
	width,
	height,
	circle,
	borderWidth = 5,
	borderRightWidth = 10,
	videoUrl,
	resizeMode = ResizeMode.CONTAIN,
	maxWidth = relativeScreenWidth(90),
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
						<PortraitVideo
							source={{ uri: videoUrl }}
							useNativeControls
							isLooping
							resizeMode={ResizeMode.CONTAIN}
						/>
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
		</Container >
	)
}

export { VideoPortrait }
