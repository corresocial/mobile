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
	pictureUriSelected: number
	onSelectPicture: (index: number) => void
}

function HorizontalListPictures({ picturesUri, pictureUriSelected, onSelectPicture }: HorizontalListPicturesProps) {
	const renderPictures = () => picturesUri.map((pictureUri, index) => (
		<PictureItemButtom
			activeOpacity={1}
			pictureSelected={pictureUriSelected === index}
			key={uuid()}
			onPress={() => onSelectPicture(index)}
		>
			<PicturePortrait pictureSelected={pictureUriSelected === index}>
				<Picture
					source={{ uri: pictureUri }}
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
					{renderPictures()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalListPictures }
