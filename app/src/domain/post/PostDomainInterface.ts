import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from './entity/types'

interface PostDomainInterface {
	updatePostData: (
		usePostRepository: () => PostRepositoryInterface,
		userSubscriptionRange: UserSubscription['subscriptionRange'],
		userPosts: PostEntity[],
		storedPostData: PostEntity,
		newPostData: PostEntity
	) => Promise<PostEntity[]>;
}

export { PostDomainInterface }
