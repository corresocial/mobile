import React, { Ref } from 'react'
import { FlatList, ListRenderItem } from 'react-native'

import { ThumbnailFlatList } from './styles'

import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { Thumbnail } from '@components/Thumbnail'

interface ThumbnailProps {
	thumbnailListRef: Ref<FlatList>,
	picturesUrl: string[]
	currentIndex: number
	videoQuantity: number
	onThumbnailPressed: (id: number) => void
}

function ThumbnailList({ thumbnailListRef, picturesUrl, currentIndex, videoQuantity, onThumbnailPressed }: ThumbnailProps) {
	const handleImagePressed = (id: number) => onThumbnailPressed(id)

	const renderThumbnailItem: ListRenderItem<string> = ({ item, index }) => (
		<Thumbnail
			onPress={handleImagePressed}
			active={currentIndex === index}
			imageId={index}
			pictureUrl={item}
			isVideo={index <= videoQuantity - 1}
		/>
	)

	return (
		<ThumbnailFlatList
			ref={thumbnailListRef}
			horizontal
			showsHorizontalScrollIndicator={false}
			data={picturesUrl}
			ListHeaderComponent={<HorizontalSpacing />}
			renderItem={renderThumbnailItem as ListRenderItem<unknown>}
		/>
	)
}

export { ThumbnailList }
