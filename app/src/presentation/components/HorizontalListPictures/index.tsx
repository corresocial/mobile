import React, { useState } from 'react'
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
	onSelectMedia: (index: number, isVideo: boolean) => void
}

function HorizontalListPictures({ picturesUri, videosUri, pictureUriSelected, onSelectMedia }: HorizontalListPicturesProps) {
	const [isVideoSelected, setIsVideoSelected] = useState<boolean>(false) 

	const pictureSelectionHandler = (id: number, isVideo: boolean) => {
		setIsVideoSelected(isVideo)
		onSelectMedia(id, isVideo)
	} 

	const renderPictures = () => picturesUri.map((pictureUri, index) => (
		<PictureItemButtom
			activeOpacity={1}
			pictureSelected={pictureUriSelected === index && !isVideoSelected}
			key={uuid()}
			onPress={() => pictureSelectionHandler(index, false)}
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
			onPress={() => pictureSelectionHandler(index, true)}
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

	const renderMedias = () => {
		const renderData = []
		const videoElements = renderVideosPictures()
		renderData.push(...videoElements)
		const pictureElements = renderPictures()
		renderData.push(...pictureElements)
		return renderData
	}

	return (
		<Container >
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<HorizontalSpacing width={relativeScreenWidth(4)} />
				<Container>
					<HorizontalSpacing />
					{renderMedias()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalListPictures }
