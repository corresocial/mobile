import { ImageContentFit } from 'expo-image'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, DeleteItemArea, EditItemArea, NoPhotoContainer, PortraitImage, VideoIndicatorContainer } from './styles'
import EditWhiteIcon from '@assets/icons/edit-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import VideoCameraIcon from '@assets/icons/video-camera-white.svg'
import NoPhoto from '@assets/imgs/noPhoto.svg'
import UserShadow from '@assets/imgs/userShadow.jpg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'

interface PhotoPortraitProps {
	width: number | string
	height: number | string
	circle?: boolean
	borderWidth?: number
	borderRightWidth?: number
	resizeMode?: ImageContentFit | undefined
	pictureUri: string
	maxWidth?: number
	videoIndicator?: boolean
	deleteCurrentPicture?: () => void
	editCurrentPicture?: () => void
}

function PhotoPortrait({
	width,
	height,
	circle,
	borderWidth = 5,
	borderRightWidth = 10,
	pictureUri,
	resizeMode = 'contain',
	videoIndicator,
	maxWidth = relativeScreenWidth(90),
	deleteCurrentPicture,
	editCurrentPicture
}: PhotoPortraitProps) {
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
				pictureUri
					? (
						<PortraitImage
							source={{ uri: pictureUri }}
							recyclingKey={pictureUri}
							placeholder={UserShadow}
							placeholderContentFit={'contain'}
							contentFit={resizeMode}
							cachePolicy={'memory-disk'}
							circle={circle}
							transition={300}
						/>
					)
					: (
						<NoPhotoContainer>
							<NoPhoto width={'100%'} height={'100%'} />
						</NoPhotoContainer>
					)
			}
			{
				deleteCurrentPicture && pictureUri
					? (
						<DeleteItemArea onPress={deleteCurrentPicture}>
							<SmallButton
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								color={theme.red3}
								SvgIcon={TrashWhiteIcon}
								svgScale={['55%', '55%']}
								onPress={deleteCurrentPicture}
							/>
						</DeleteItemArea>
					)
					: null
			}
			{
				editCurrentPicture && pictureUri
					? (
						<EditItemArea onPress={editCurrentPicture}>
							<SmallButton
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								color={theme.white3}
								SvgIcon={EditWhiteIcon}
								svgScale={['55%', '55%']}
								onPress={editCurrentPicture}
							/>
						</EditItemArea>
					)
					: null
			}
			{
				videoIndicator && (
					<VideoIndicatorContainer>
						<VideoCameraIcon width={RFValue(40)} height={RFValue(40)} />
					</VideoIndicatorContainer>
				)
			}
		</Container >
	)
}

export { PhotoPortrait }
