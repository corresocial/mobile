import { ReactNode } from 'react'

import { PostEntity } from '@domain/post/entity/types'
import { UserEntity } from '@domain/user/entity/types'

export interface LeaderAreaProviderProps {
	children: ReactNode
}

export type LeaderAreaContextType = {
	unapprovedProfiles: UserEntity[]
	unapprovedPosts: PostEntity[]
	loadUnapprovedProfiles: (refresh?: boolean) => Promise<void>
	loadUnapprovedPosts: (refresh?: boolean) => Promise<void>
	removeFromUnapprovedProfileList: (data?: UserEntity) => void
	removeFromUnapprovedPostList: (data?: PostEntity) => void
}
