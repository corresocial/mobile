import { ImageContentFit } from 'expo-image'
import React, { useLayoutEffect, useState } from 'react'
import { Platform } from 'react-native'

import { generateVideoThumbnails } from '@utils-ui/common/convertion/generateVideoThumbnail'
import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container, DeleteItemArea, EditItemArea, RightBottomIndicatorContainer, NoPhotoContainer, PortraitImage, VideoIndicatorContainer } from './styles'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import EditWhiteIcon from '@assets/icons/edit-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import VideoCameraIcon from '@assets/icons/video-camera-white.svg'
import NoPhoto from '@assets/imgs/noPhoto.svg'
import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { Loader } from '@components/Loader'

const { checkMediaType } = UiUtils()

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
	const [videoThumbnail, setVideoUrlThumbnail] = useState('')
	const [loadingThumbnail, setLoadingThumbnail] = useState(false)

	useLayoutEffect(() => {
		setThumbnailsOnVideos()
	}, [])

	const setThumbnailsOnVideos = async () => {
		if (Platform.OS === 'ios' && checkMediaType(pictureUri) === 'video') {
			try {
				setLoadingThumbnail(true)
				const thumb = await generateVideoThumbnails(pictureUri || '') as string
				setLoadingThumbnail(false)
				setVideoUrlThumbnail(thumb)
			} catch (error) {
				console.log(error)
				setLoadingThumbnail(false)
			}
		}
	}

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
						!loadingThumbnail
							? (
								<PortraitImage
									source={{ uri: videoThumbnail || pictureUri }}
									recyclingKey={pictureUri}
									// placeholder={UserShadow}
									placeholderContentFit={'contain'}
									contentFit={resizeMode}
									resizeMode={'cover'}
									cachePolicy={'memory-disk'}
									circle={circle}
								// transition={200}
								/>
							)
							: <Loader flex animationScale={50} />
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
								color={theme.colors.red[3]}
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
								color={theme.colors.white[3]}
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
