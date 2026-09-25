import { FeedPosts } from '@domain/post/entity/types'

import { FeedSearchParams } from './types/types'

// TODO Type functions return

interface CloudFunctionServiceInterface {
	checkUserPhoneAlreadyRegistredCloud: (phoneNumber: string) => Promise<boolean>
	getPostsByLocationCloud: (searchParams: FeedSearchParams, userId: string) => Promise<FeedPosts | void>
	searchPostsCloud: (searchText: string, searchParams: FeedSearchParams, searchByRange: boolean, userId: string) => Promise<boolean>
}

export { CloudFunctionServiceInterface }
