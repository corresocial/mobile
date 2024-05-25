import { ReactNode } from 'react'

import { PostEntity } from '@domain/post/entity/types'

export interface LeaderAreaProviderProps {
	children: ReactNode
}

export type LeaderAreaContextType = {
	unapprovedPosts: PostEntity[]
	removeFromUnapprovedPostList: (data?: PostEntity) => void
	loadUnapprovedPosts: () => Promise<void>
}
