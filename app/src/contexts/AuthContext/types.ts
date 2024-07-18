import { ReactNode } from 'react'

import { PostEntity } from '@domain/post/entity/types'
import { UserAuthData, UserEntity, UserEntityOptional, UserRegisterData } from '@domain/user/entity/types'

export interface AuthProviderProps {
	children: ReactNode
}

export type AuthContextType = {
	userDataContext: UserEntity
	userPostsContext: PostEntity[]
	setUserDataOnContext: (data: UserEntityOptional) => void
	setRemoteUserOnLocal: (uid?: string, refreshMode?: boolean) => Promise<boolean | undefined>
	userAuthData: UserAuthData
	setUserAuthDataOnContext: (data: Partial<UserAuthData>) => void
	userRegistrationData: UserRegisterData
	setUserRegisterDataOnContext: (data: Partial<UserRegisterData>) => void
	performQuickSignin(userId?: string, requireAuth?: boolean, noRedirect?: boolean): Promise<boolean>

	getLastUserPost: () => PostEntity | null
	loadUserPosts: (userId?: string, refresh?: boolean) => Promise<PostEntity[] | void>
	addUserPost: (postData: PostEntity) => void
	updateUserPost: (postData: PostEntity | PostEntity[]) => void
	removeUserPost: (postData: PostEntity) => Promise<void>
}
