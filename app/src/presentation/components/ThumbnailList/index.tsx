import React, { useEffect, useRef } from 'react'

import { ListRenderItem } from '@shopify/flash-list'

import { ThumbnailFlatList } from './styles'

import { Thumbnail } from '../Thumbnail'

interface ThumbnailProps {
    thumbnailListRef: any,
    images: any[]
    currentIndex: number 
    onThumbnailPressed: (id: number) => void
}

function ThumbnailList({ thumbnailListRef, images, currentIndex, onThumbnailPressed }: ThumbnailProps) {
	const handleImagePressed = (id: number) => {
		onThumbnailPressed(id)
	}

	useEffect(() => {
		console.log('thumbnailListRef')
	}, [thumbnailListRef])
    
	useEffect(() => {
		console.log('images')
	}, [images])

	useEffect(() => {
		console.log('currentIndex')
	}, [currentIndex])

	useEffect(() => {
		console.log('onThumbnailPressed')
	}, [onThumbnailPressed])

	return (
		<ThumbnailFlatList
			ref={thumbnailListRef} // TODO type error      
			horizontal
			showsHorizontalScrollIndicator={false}
			data={images}
			renderItem={({ item, index }) => (
				<Thumbnail 
					onPress={handleImagePressed} 
					active={currentIndex === index} 
					imageId={index} 
					image={item}
				>
				</Thumbnail>
			)}
		/>
	)
}

export { ThumbnailList }