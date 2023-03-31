import React from 'react'
import { Image, ImageResizeMode } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import TrashIcon from '@assets/icons/trash.svg'
import NoPhoto from '@assets/imgs/noPhoto.svg'
import CheckOrange from '@assets/icons/check-orange.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import {
	CheckArea,
	Container,
	DeleteItemArea,
	NoPhotoContainer,
} from './styles'

interface PhotoPortraitProps {
	width: number | string;
	height: number | string;
	borderWidth?: number;
	borderRightWidth?: number;
	resizeMode?: ImageResizeMode | undefined;
	pictureUri: string;
	maxWidth?: number;
	checked?: boolean;
	deleteCurrentPicture?: () => void;
}

function PhotoPortrait({
	width,
	height,
	borderWidth = 5,
	borderRightWidth = 10,
	pictureUri,
	resizeMode = 'contain',
	maxWidth = relativeScreenWidth(90),
	checked = false,
	deleteCurrentPicture,
}: PhotoPortraitProps) {
	return (
		<Container
			style={{
				height,
				width,
				maxWidth,
				borderWidth: RFValue(borderWidth),
				borderRightWidth: RFValue(borderRightWidth),
			}}
		>
			{pictureUri ? (
				<Image
					source={{
						uri: pictureUri,
					}}
					width={0}
					height={0}
					style={{
						resizeMode,
						width: '100%',
						height: '100%',
						borderRadius: RFValue(10),
					}}
				/>
			) : (
				<NoPhotoContainer>
					<NoPhoto width={'100%'} height={'100%'} />
				</NoPhotoContainer>
			)}
			{deleteCurrentPicture && pictureUri ? (
				<DeleteItemArea onPress={deleteCurrentPicture}>
					<TrashIcon width={'100%'} height={'100%'} />
				</DeleteItemArea>
			) : null}
			{checked && (
				<CheckArea>
					<CheckOrange width={'100%'} height={'100%'} />
				</CheckArea>
			)}
		</Container>
	)
}

export { PhotoPortrait }
