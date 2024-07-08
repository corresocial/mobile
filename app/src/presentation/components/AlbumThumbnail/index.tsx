import React from 'react'

import { AlbumType } from './types'

import { AlbumView, AlbumThumbnailImage, AlbumThumbnailInfo, AlbumThumbnailBackground, AlbumThumbnailTitle } from './styles'

interface AlbumThumbnailProps{
    album: AlbumType,
    onSelectAlbum: (album: AlbumType) => void
}

function AlbumThumbnail({ album, onSelectAlbum }: AlbumThumbnailProps) {
	return (
		<AlbumView key={album.id} onPress={async () => onSelectAlbum(album)}>
			<AlbumThumbnailImage resizeMode={'cover'} source={{ uri: album.thumbnail }}/>
			<AlbumThumbnailInfo>
				<AlbumThumbnailBackground/>
				<AlbumThumbnailTitle>{album.title}</AlbumThumbnailTitle>
			</AlbumThumbnailInfo>
		</AlbumView>
	)
}

export { AlbumThumbnail }
