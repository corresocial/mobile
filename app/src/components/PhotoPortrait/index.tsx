import React from 'react'
import { Image } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Container, DeleteItemArea } from './styles'
import TrashIcon from '../../assets/icons/trash.svg'
import NoPhoto from '../../assets/imgs/noPhoto.svg'

interface PhotoPortraitProps {
	width: number
	height: number
	borderWidth?: number
	borderRightWidth?: number
	pictureUri: string
	deleteCurrentPicture?: () => void
}

function PhotoPortrait({
	width,
	height,
	borderWidth = 5,
	borderRightWidth = 10,
	pictureUri,
	deleteCurrentPicture
}: PhotoPortraitProps) {
	return (
		<Container
			style={{
				height,
				width,
				borderWidth: RFValue(borderWidth),
				borderRightWidth: RFValue(borderRightWidth),
			}}
		>
			{
				pictureUri
					? (
						<Image
							source={{
								uri: pictureUri
							}}
							width={0}
							height={0}
							style={{
								width: '100%',
								height: '100%',
								resizeMode: 'contain',
								borderRadius: 5,
							}}
						/>
					)
					: <NoPhoto width={'100%'} height={'100%'} />
			}
			{
				deleteCurrentPicture && pictureUri
					? (
						<DeleteItemArea onPress={deleteCurrentPicture}>
							<TrashIcon width={'100%'} height={'100%'} />
						</DeleteItemArea>
					)
					: null
			}
		</Container>
	)
}

export { PhotoPortrait }
