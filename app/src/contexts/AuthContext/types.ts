import { ReactNode } from 'react'

import { PostCollection } from '@domain/post/entity/types'
import { UserEntity, UserEntityOptional } from '@domain/user/entity/types'

import { UserIdentification } from '@services/authentication/types'

export interface AuthProviderProps {
	children: ReactNode
}

export type RegisterUserData = {
	cellNumber: string
	email: string
	userName: string
	profilePictureUri?: string
	userIdentification: UserIdentification
}

export type AuthContextType = {
	userDataContext: UserEntity
	setUserDataOnContext: (data: UserEntityOptional) => void
	setRemoteUserOnLocal: (uid?: string, userData?: UserEntity) => Promise<boolean | undefined>
	getLastUserPost: () => PostCollection
}
