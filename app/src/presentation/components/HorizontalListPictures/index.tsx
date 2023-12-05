import React from 'react'
import uuid from 'react-uuid'

import {
	Container,
	PictureItemButtom,
	ScrollView,
	PicturePortrait,
	Picture,
} from './styles'
import AddPictureWhiteIcon from '@assets/icons/addPicture-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'

import { SmallButton } from '@components/_buttons/SmallButton'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

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
					<SmallButton
						onPress={openCamera}
						relativeWidth={relativeScreenWidth(20)}
						height={relativeScreenWidth(20)}
						SvgIcon={AddPictureWhiteIcon}
						svgScale={['50%', '50%']}
					/>
					<HorizontalSpacing />
					{renderPictures()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalListPictures }
