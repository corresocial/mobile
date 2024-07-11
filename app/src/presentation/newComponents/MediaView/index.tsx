import React from 'react'
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

	return (
		<Container>
			<GalleryModal
				picturesUrl={picturesUrl || []}
				videosUrl={[]}
				showGallery={false}
				onClose={() => console.log('call method closeGallery(')}
			/>
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => console.log('call method openGallery(')}
			>
				<MediaCarousel
					picturesUrl={[...(picturesUrl || []), ...(picturesUrl || [])] || []}
					indicatorColor={theme.blue1}
					square
					showFullscreenIcon
				/>
			</TouchableOpacity>
		</Container>
	)
}
