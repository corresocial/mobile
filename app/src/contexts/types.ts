import { UserCollection } from '@services/firebase/types'

export type UserIdentification = { // REFACTOR
	uid: string
	authTime?: string
	accessToken?: string
	tokenExpirationTime?: string
	refreshToken?: string
}

export type RegisterUserData = {
	cellNumber: string
	email?: string
	userName: string
	profilePictureUri?: string
	userIdentification: UserIdentification
}

export interface LocalUserData extends UserCollection {
	userId?: string,
	userIdentification?: UserIdentification
}
