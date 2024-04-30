export type AlbumType = {
    assetCount: number
    id: string
    title: string
    type: string | null
    thumbnail?: string
    startTime?: number | null
    endTime?: number | null
}

export type MediaType = {
    id: number
    filename: string
    uri: string
    creationTime?: string
}

export type AlbumInfo = {
    id: string,
    albumName: string
}