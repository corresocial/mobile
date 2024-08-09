import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'

import { Container } from './styles'

import { GalleryModal } from '@components/_modals/GalleryModal'
import { MediaCarousel } from '@newComponents/MediaCarousel'

interface MediaViewProps {
	picturesUrl?: string[]
	videosUrl?: string[]
	onPress?: () => void
}

export function MediaView({ picturesUrl, videosUrl, onPress }: MediaViewProps) {
	const theme = useTheme()

	const [galeryIsVisible, setGaleryIsVisible] = useState(false)

	const openGallery = () => setGaleryIsVisible(true)

	const closeGallery = () => setGaleryIsVisible(false)

	const mediaPressHandler = () => {
		openGallery()
		onPress?.()
	}

	if ((!picturesUrl?.length && !videosUrl?.length)) return <></>

	return (
		<Container>
			<GalleryModal
				picturesUrl={picturesUrl || []}
				videosUrl={videosUrl || []}
				showGallery={galeryIsVisible}
				onClose={closeGallery}
			/>
			<TouchableOpacity
				activeOpacity={1}
				onPress={mediaPressHandler}
			>
				<MediaCarousel
					picturesUrl={[...(picturesUrl || [])] || []}
					videosThumbnails={[...(videosUrl || [])] || []}
					indicatorColor={theme.colors.blue[1]}
					square
					showFullscreenIcon
				/>
			</TouchableOpacity>
		</Container>
	)
}
