import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity, PostEntityOptional } from './entity/types'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'

interface PostDomainInterface {
	updateOwnerDataOnPosts(
		usePostRepository: () => PostRepositoryInterface,
		ownerData: Partial<PostEntityOptional['owner']>
	): Promise<boolean | void>
	updatePost(
		usePostRepository: () => PostRepositoryInterface,
		userSubscriptionRange: UserSubscription['subscriptionRange'],
		userPosts: PostEntity[],
		storedPostData: PostEntity,
		newPostData: PostEntity,
		newPostPicturesUri: string[],
		unsavedPostVideos: string[]
	): Promise<{ updatedUserPosts: PostEntity[], picturesUrlUploaded: string[] }>
	savePost(
		usePostRepository: () => PostRepositoryInterface,
		useCloudFunctionService: () => CloudFunctionServiceInterface,
		userSubscriptionRange: UserSubscription['subscriptionRange'],
		userPosts: PostEntity[],
		storedPostData: PostEntity,
		newPostData: PostEntity,
		unsavedPostPictures: string[],
		notifyUsersByLocation?: boolean
	): Promise<{ newPost: PostEntity, updatedUserPosts: PostEntity[], picturesUrlUploaded: string[] }>
}

export { PostDomainInterface }
