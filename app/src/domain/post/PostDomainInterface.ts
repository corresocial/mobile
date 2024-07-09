import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity, PostEntityOptional } from './entity/types'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'

import { PostRangeLocation } from './core/updatePostsLocation'

interface PostDomainInterface {
	getUnapprovedPosts(usePostRepository: () => PostRepositoryInterface, pageSize?: number, lastPost?: PostEntity | any): Promise<PostEntity[] | void>
	getPostsByOwner(usePostRepository: () => PostRepositoryInterface, userId: string, pageSize?: number, lastPost?: PostEntity, completed?: boolean): Promise<PostEntity[]>

	updatePost( // CURRENT Check Methods UPDATE
		usePostRepository: () => PostRepositoryInterface,
		userSubscriptionRange: UserSubscription['subscriptionRange'],
		userPosts: PostEntity[],
		storedPostData: PostEntity,
		newPostData: PostEntity,
		newPostPicturesUri: string[],
		unsavedPostVideos: string[]
	): Promise<{ updatedUserPosts: PostEntity[], picturesUrlUploaded: string[], videosUrlUploaded: string[] }>
	updateOwnerDataOnPosts(
		usePostRepository: () => PostRepositoryInterface,
		ownerData: Partial<PostEntityOptional['owner']>
	): Promise<boolean | void>
	updateLocationDataOnPosts(userId: string, newPostRangeLocation: PostRangeLocation, subscriptionDowngrade?: boolean): Promise<PostEntity[]>
	savePost( // CURRENT Check Methods SAVE
		usePostRepository: () => PostRepositoryInterface,
		useCloudFunctionService: () => CloudFunctionServiceInterface,
		userSubscriptionRange: UserSubscription['subscriptionRange'],
		userPosts: PostEntity[],
		storedPostData: PostEntity,
		newPostData: PostEntity,
		unsavedPostPictures: string[],
		unsavedPostVideos: string[],
		notifyUsersByLocation?: boolean
	): Promise<{ newPost: PostEntity, updatedUserPosts: PostEntity[], picturesUrlUploaded: string[] }>
	approvePost(usePostRepository: () => PostRepositoryInterface, postData: PostEntity): Promise<PostEntity | void>
	rejectPost(usePostRepository: () => PostRepositoryInterface, postData: PostEntity): Promise<PostEntity | void>
}

export { PostDomainInterface }
