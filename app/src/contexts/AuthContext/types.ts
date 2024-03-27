import { ReactNode } from 'react'

import { PostCollection } from '@domain/post/entity/types'
import { UserEntity } from '@domain/user/entity/types'

import { UserIdentification } from '@services/authentication/types'

export interface AuthProviderProps {
	children: ReactNode
}

export type RegisterUserData = {
	cellNumber: string
	email?: string
	userName: string
	profilePictureUri?: string
	userIdentification: UserIdentification
}

export type UserData = UserEntity

export type LocalUserData = Partial<UserEntity>
// userIdentification?: UserIdentification
// }

export type AuthContextType = {
	userDataContext: LocalUserData
	setUserDataOnContext: (data: LocalUserData) => void
	setRemoteUserOnLocal: (uid?: string, userData?: UserData) => Promise<boolean | undefined>
	getLastUserPost: () => PostCollection
}
