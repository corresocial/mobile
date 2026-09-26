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
			<AlbumThumbnailImage contentFit={'cover'} source={{ uri: album.thumbnail }} recyclingKey={album.id}/>
			<AlbumThumbnailInfo>
				<AlbumThumbnailBackground/>
				<AlbumThumbnailTitle>{album.title}</AlbumThumbnailTitle>
			</AlbumThumbnailInfo>
		</AlbumView>
	)
}

export { AlbumThumbnail }
