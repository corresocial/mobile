export type FlatListItem<Item> = { item: Item, index: number }

export type Id = string

export type MediaAsset = { url: string, mediaType: 'photo' | 'video' | 'audio', videoThumbnail?: string }
