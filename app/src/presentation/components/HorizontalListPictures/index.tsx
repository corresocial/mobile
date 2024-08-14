import React from 'react'
import uuid from 'react-uuid'

import { MediaAsset } from 'src/presentation/types'

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
	mediaAssets: MediaAsset[]
	mediaUriSelected?: number
	onSelectMedia: (index: number) => void
}

function HorizontalListPictures({ mediaAssets = [], mediaUriSelected, onSelectMedia }: HorizontalListPicturesProps) {
	const renderPictures = () => mediaAssets.map((asset, index) => {
		return (
			<PictureItemButtom
				activeOpacity={1}
				pictureSelected={mediaUriSelected === index || (!mediaUriSelected && mediaUriSelected !== 0)}
				key={uuid()}
				onPress={() => onSelectMedia(index)}
			>
				<PicturePortrait pictureSelected={mediaUriSelected === index || (!mediaUriSelected && mediaUriSelected !== 0)}>
					<Picture
						source={{ uri: asset.videoThumbnail || asset.url }}
						placeholderContentFit={'contain'}
						contentFit={'cover'}
						cachePolicy={'memory-disk'}
						transition={200}
					/>
				</PicturePortrait>
			</PictureItemButtom>
		)
	})

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
