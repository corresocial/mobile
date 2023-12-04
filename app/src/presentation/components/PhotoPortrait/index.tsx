import React from 'react'
import { ImageResizeMode } from 'react-native'

import { Container, DeleteItemArea, NoPhotoContainer, PortraitImage } from './styles'
import { relativeScreenWidth } from '../../common/screenDimensions'
import ThashWhiteIcon from '@assets/icons/trash-white.svg'
import NoPhoto from '@assets/imgs/noPhoto.svg'

import { SmallButton } from '../_buttons/SmallButton'
import { theme } from '../../common/theme'

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
							width={0} // TODO fix, why is running?
							height={0}
							resizeMode={resizeMode}
							circle={circle}
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
