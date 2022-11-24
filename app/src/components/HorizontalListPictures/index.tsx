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
import AddPictureIcon from '../../assets/icons/addPicture.svg'

interface HorizontalListPicturesProps {
	picturesUri: string[]
	pictureUriSelected: number
	onSelectPicture: (index: number) => void
	openCamera: () => void
}

function HorizontalListPictures({ picturesUri, pictureUriSelected, onSelectPicture, openCamera }: HorizontalListPicturesProps) {
	const renderPictures = () => picturesUri.map((pictureUri, index) => (
		<PictureItemButtom
			key={uuid()}
			onPress={() => onSelectPicture(index)}
		>
			<PicturePortrait
				style={{
					opacity: pictureUriSelected === index ? 1 : 0.5,
					borderWidth: pictureUriSelected === index ? 3 : 2,
					borderRightWidth: pictureUriSelected === index ? 4 : 3
				}}
			>
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
						<AddPictureIcon width={'50%'} height={'50%'} />
					</AddNewPicturesButton>
					{renderPictures()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalListPictures }
