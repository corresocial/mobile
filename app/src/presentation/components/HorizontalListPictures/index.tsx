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
	videosUri?: string[]
	pictureUriSelected: number
	onSelectMedia: (index: number) => void
}

function HorizontalListPictures({ picturesUri, videosUri = [], pictureUriSelected, onSelectMedia }: HorizontalListPicturesProps) {
	const renderPictures = () => picturesUri.map((pictureUri, index) => {
		return (
			<PictureItemButtom
				activeOpacity={1}
				pictureSelected={pictureUriSelected === index}
				key={uuid()}
				onPress={() => onSelectMedia(index)}
			>
				<PicturePortrait pictureSelected={pictureUriSelected === index}>
					<Picture
						source={{ uri: pictureUri }}
						width={100}
						height={100}
					/>
					{/* <PortraitImage
						source={{ uri: pictureUri }}
						recyclingKey={pictureUri}
						placeholderContentFit={'contain'}
						resizeMode={'cover'}
						cachePolicy={'memory-disk'}
						transition={300}
					/> */}
				</PicturePortrait>
			</PictureItemButtom>
		)
	})

	/* const renderVideosPictures = () => videosUri.map((videoUri, index) => (
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
	)) */

	// const renderMedias = () => {
	// 	const renderData = []
	// 	/* const videoElements = renderVideosPictures()
	// 	renderData.push(...videoElements) */
	// 	const pictureElements = renderPictures()
	// 	renderData.push(...pictureElements)
	// 	return renderData
	// }

	return (
		<Container >
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<HorizontalSpacing width={relativeScreenWidth(4)} />
				<Container>
					<HorizontalSpacing />
					{renderPictures()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalListPictures }
