import { UserOwner, UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from './entity/types'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'

import { PostRangeLocation } from './core/updatePostsLocation'

interface PostDomainInterface {
	getUnapprovedPosts(usePostRepository: () => PostRepositoryInterface, pageSize?: number, lastPost?: PostEntity | any): Promise<PostEntity[] | void>
	getPostsByOwner(usePostRepository: () => PostRepositoryInterface, userId: string, pageSize?: number, lastPost?: PostEntity, completed?: boolean): Promise<PostEntity[]>

	updatePost(
		usePostRepository: () => PostRepositoryInterface,
		userSubscriptionRange: UserSubscription['subscriptionRange'],
		userPosts: PostEntity[],
		storedPostData: PostEntity,
		newPostData: PostEntity,
		newPostPicturesUri: string[]
	): Promise<{ updatedUserPosts: PostEntity[], picturesUrl?: string[] }>
	updateOwnerDataOnPosts(
		usePostRepository: () => PostRepositoryInterface,
		ownerData: Partial<UserOwner>
	): Promise<boolean | void>
	updateLocationDataOnPosts(userId: string, newPostRangeLocation: PostRangeLocation, subscriptionDowngrade?: boolean): Promise<PostEntity[]>
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

	getEventPosts(usePostRepository: () => PostRepositoryInterface, macroCategory: MacroCategoriesType, maxDocs: number, lastDoc: PostEntity | null, allPosts: boolean): Promise<PostEntity[]>

	updatePostPresenceList(usePostRepository: () => PostRepositoryInterface, postData: PostEntity, userId: string): Promise<PostEntity | undefined>
}

export { PostDomainInterface }
