import React from 'react'
import { Image, ImageResizeMode } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { CheckArea, Container, DeleteItemArea, NoPhotoContainer } from './styles'
import XWhiteIcon from '../../assets/icons/x-white.svg'
import NoPhoto from '../../assets/imgs/noPhoto.svg'
import CheckOrange from '../../assets/icons/check-orange.svg'
import { relativeScreenWidth } from '../../common/screenDimensions'
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
	checked?: boolean
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
	checked = false,
	deleteCurrentPicture
}: PhotoPortraitProps) {
	return (
		<Container
			circle={circle}
			style={{
				height,
				width,
				maxWidth,
				borderWidth: RFValue(borderWidth),
				borderRightWidth: RFValue(borderRightWidth),
			}}
		>
			{
				pictureUri
					? (
						<Image
							source={{ uri: pictureUri }}
							width={0} // TODO fix
							height={0}
							style={{
								resizeMode,
								width: '100%',
								height: '100%',
								borderRadius: circle ? RFValue(500) : RFValue(10),
							}}
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
								SvgIcon={XWhiteIcon}
								svgScale={['55%', '55%']}
								onPress={deleteCurrentPicture}
							/>
						</DeleteItemArea>
					)
					: null
			}
			{
				checked
				&& (
					<CheckArea>
						<CheckOrange width={'100%'} height={'100%'} />
					</CheckArea>
				)
			}
		</Container>
	)
}

export { PhotoPortrait }
