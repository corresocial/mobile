export type AuthRegisterStackParamList = {
	Splash: undefined
	SelectAuthRegister: { userId?: string, userName?: string }
	AcceptTermsAndConditions: undefined
	SelectAuthMethod: undefined
	InsertCellNumber: { authByWhatsapp?: boolean }
	InsertConfirmationCode: {
		cellNumber: string,
		verificationCodeId: string | void
	}
	InsertName: {
		cellNumber: string
		userIdentification: UserIdentification
	}
	InsertProfilePicture: {
		cellNumber: string,
		userName: string,
		profilePictureUrl?: string[]
		userIdentification: UserIdentification
	}
	ProfilePicturePreview: {
		cellNumber: string,
		userName: string,
		profilePictureUrl?: string[]
		userIdentification: UserIdentification
	}

	UserStack: { tourPerformed?: boolean }
}
