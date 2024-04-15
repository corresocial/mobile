import React from 'react'
import uuid from 'react-uuid'

import {
	Container,
	PictureItemButtom,
	ScrollView,
	PicturePortrait,
	Picture,
} from './styles'
import { relativeScreenWidth } from '@common/screenDimensions'

import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

interface HorizontalListPicturesProps {
	picturesUri: string[]
	videosUri: string[]
	pictureUriSelected: number
	isVideoSelected: boolean
	onSelectMedia: (index: number, isVideo: boolean) => void
}

function HorizontalListPictures({ picturesUri, videosUri, pictureUriSelected, isVideoSelected, onSelectMedia }: HorizontalListPicturesProps) {
	const renderPictures = () => picturesUri.map((pictureUri, index) => (
		<PictureItemButtom
			activeOpacity={1}
			pictureSelected={pictureUriSelected === index && !isVideoSelected}
			key={uuid()}
			onPress={() => onSelectMedia(index, false)}
		>
			<PicturePortrait pictureSelected={pictureUriSelected === index && !isVideoSelected}>
				<Picture
					source={{ uri: pictureUri }}
					width={100}
					height={100}
				/>
			</PicturePortrait>
		</PictureItemButtom>
	))

	const renderVideosPictures = () => videosUri.map((videoUri, index) => (
		<PictureItemButtom
			activeOpacity={1}
			pictureSelected={pictureUriSelected === index && isVideoSelected}
			key={uuid()}
			onPress={() => onSelectMedia(index, true)}
		>
			<PicturePortrait pictureSelected={pictureUriSelected === index && isVideoSelected}>
				<Picture
					resizeMode={'cover'}
					source={{ uri: videoUri }}
					width={100}
					height={100}
				/>
			</PicturePortrait>
		</PictureItemButtom>
	))

	return (
		<Container >
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<HorizontalSpacing width={relativeScreenWidth(4)} />
				<Container>
					<HorizontalSpacing />
					{renderVideosPictures()}
					{renderPictures()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalListPictures }
