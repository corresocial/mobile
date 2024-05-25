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
	getLastUserPost: () => PostEntity
	setRemoteUserOnLocal: (uid?: string, userData?: UserEntity) => Promise<boolean | undefined>
	loadUserPosts: (userId?: string) => Promise<PostEntity[]>

	userAuthData: UserAuthData
	setUserAuthDataOnContext: (data: Partial<UserAuthData>) => void
	userRegistrationData: UserRegisterData
	setUserRegisterDataOnContext: (data: Partial<UserRegisterData>) => void
}
