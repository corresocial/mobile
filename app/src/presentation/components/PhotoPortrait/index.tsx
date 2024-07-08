import { ImageContentFit } from 'expo-image'
import React from 'react'

import { Container, DeleteItemArea, EditItemArea, RightBottomIndicatorContainer, NoPhotoContainer, PortraitImage, VideoIndicatorContainer } from './styles'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import EditWhiteIcon from '@assets/icons/edit-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import VideoCameraIcon from '@assets/icons/video-camera-white.svg'
import NoPhoto from '@assets/imgs/noPhoto.svg'
import UserShadow from '@assets/imgs/userShadow.jpg'
import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'
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
	waitingApproveIndicator?: boolean
	rejectApproveIndicator?: boolean
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
	resizeMode = 'cover',
	videoIndicator,
	waitingApproveIndicator,
	rejectApproveIndicator,
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
						<VideoCameraIcon width={relativeScreenDensity(40)} height={relativeScreenDensity(40)} />
					</VideoIndicatorContainer>
				)
			}
			{
				waitingApproveIndicator && (
					<RightBottomIndicatorContainer>
						<ClockArrowWhiteIcon width={relativeScreenDensity(35)} height={relativeScreenDensity(35)} />
					</RightBottomIndicatorContainer>
				)
			}
			{
				rejectApproveIndicator && (
					<RightBottomIndicatorContainer>
						<DeniedWhiteIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
					</RightBottomIndicatorContainer>
				)
			}
		</Container >
	)
}

export { PhotoPortrait }
