import admin from 'firebase-admin'

export type CollectionRef = admin.firestore.CollectionReference<admin.firestore.DocumentData>
export type SearchParams = {
    searchLeaderPosts?: boolean
    geohashes: string[]
    city: string
    country: string
}

export type RequestBody = {
    searchParams: SearchParams
    userId: string
}


