export type AuthRegisterStackParamList = {
	Splash: undefined
	AcceptAndContinue: undefined
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
