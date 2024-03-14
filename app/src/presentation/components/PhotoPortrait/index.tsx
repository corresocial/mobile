import { Image } from 'expo-image'
import React from 'react'
import { ImageResizeMode } from 'react-native'

import { Container, DeleteItemArea, NoPhotoContainer, PortraitImage } from './styles'
import ThashWhiteIcon from '@assets/icons/trash-white.svg'
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
	resizeMode?: ImageResizeMode | undefined
	pictureUri: string
	maxWidth?: number
	deleteCurrentPicture?: () => void
}

function PhotoPortrait({
	width,
	height,
	circle,
	borderWidth = 5,
	borderRightWidth = 10,
	pictureUri,
	resizeMode = 'contain',
	maxWidth = relativeScreenWidth(90),
	deleteCurrentPicture
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
							resizeMode={resizeMode}
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
								SvgIcon={ThashWhiteIcon}
								svgScale={['55%', '55%']}
								onPress={deleteCurrentPicture}
							/>
						</DeleteItemArea>
					)
					: null
			}
		</Container >
	)
}

export { PhotoPortrait }
