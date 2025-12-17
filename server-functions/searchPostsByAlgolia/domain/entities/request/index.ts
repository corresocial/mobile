import { Id, MacroCategoriesType, PostType } from "../post/common"

type LatLong = {
    lat: number,
    lon: number
}

export type Geohashes = string[]
export type GeohashField = 'geohashNearby' | 'geohashCity'
export type SearchRange = 'nearby' | 'city' | 'country'

export type SearchParams = {
    searchText: string
    range: string
    city: string
    country: string
    macroCategory: MacroCategoriesType
    category: string
    tag: string
    postType: PostType
    geohashes: Geohashes
}

export type RequestBody = {
    userId: Id
    searchText: string
    searchByRange: boolean
    searchParams: SearchParams
}