import { UserIdentification } from '@services/authentication/types'

export type AuthRegisterStackParamList = {
	Splash: undefined
	SelectAuthRegister: { userId?: string, userName?: string }
	AcceptTermsAndConditions: undefined
	SelectAuthMethod: { newUser?: boolean }
	InsertCellNumber: { newUser?: boolean }
	InsertConfirmationCode: {
		cellNumber: string,
		verificationCodeId: string | void
	}
	InsertName: {
		cellNumber: string
		email?: string
		userIdentification: UserIdentification
	}
	InsertProfilePicture: {
		cellNumber: string,
		email?: string
		userName: string,
		profilePictureUrl?: string[]
		userIdentification: UserIdentification
	}
	ProfilePicturePreview: {
		cellNumber: string,
		email?: string
		userName: string,
		profilePictureUrl?: string[]
		userIdentification: UserIdentification
	}

	UserStack: { tourPerformed?: boolean }
}
