import React from 'react'
import uuid from 'react-uuid'

import {
	AddNewPicturesButton,
	Container,
	PictureItemButtom,
	ScrollView,
	PicturePortrait,
	Picture,
} from './styles'
import AddPictureWhiteIcon from '../../assets/icons/addPicture-white.svg'

interface HorizontalListPicturesProps {
	picturesUri: string[]
	pictureUriSelected: number
	onSelectPicture: (index: number) => void
	openCamera: () => void
}

function HorizontalListPictures({ picturesUri, pictureUriSelected, onSelectPicture, openCamera }: HorizontalListPicturesProps) {
	const renderPictures = () => picturesUri.map((pictureUri, index) => (
		<PictureItemButtom
			pictureSelected={pictureUriSelected === index}
			key={uuid()}
			onPress={() => onSelectPicture(index)}
		>
			<PicturePortrait pictureSelected={pictureUriSelected === index}>
				<Picture
					source={{
						uri: pictureUri
					}}
					width={100}
					height={100}
				/>
			</PicturePortrait>
		</PictureItemButtom>
	))

	return (
		<Container >
			<ScrollView horizontal>
				<Container>
					<AddNewPicturesButton onPress={openCamera}>
						<AddPictureWhiteIcon width={'50%'} height={'50%'} />
					</AddNewPicturesButton>
					{renderPictures()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalListPictures }
