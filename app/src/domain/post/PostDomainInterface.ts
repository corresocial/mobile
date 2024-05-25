import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity, PostEntityOptional } from './entity/types'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'

interface PostDomainInterface {
	getUnapprovedPosts(usePostRepository: () => PostRepositoryInterface, pageSize?: number, lastPost?: PostEntity | any): Promise<PostEntity[] | void>
	getPostsByOwner(usePostRepository: () => PostRepositoryInterface, userId: string, pageSize?: number, lastPost?: PostEntity): Promise<PostEntity[]>

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
		newPostPicturesUri: string[]
	): Promise<{ updatedUserPosts: PostEntity[], picturesUrl?: string[] }>
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
	approvePost(usePostRepository: () => PostRepositoryInterface, postData: PostEntity): Promise<PostEntity | void>
	rejectPost(usePostRepository: () => PostRepositoryInterface, postData: PostEntity): Promise<PostEntity | void>
}

export { PostDomainInterface }
