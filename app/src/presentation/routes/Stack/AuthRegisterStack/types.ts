export type AuthRegisterStackParamList = {
	Splash: { id: string, screen: 'profile' | 'post' | '', postType: string }
	SelectAuthRegister: { userId?: string, userName?: string }
	AcceptTermsAndConditions: undefined
	SelectAuthMethod: { newUser?: boolean } | undefined
	InsertCellNumber: { newUser?: boolean } | undefined
	InsertConfirmationCode: undefined
	InsertName: undefined
	InsertProfilePicture: undefined
	ProfilePicturePreview: undefined

	UserStack: { newUser: boolean } | undefined
}
