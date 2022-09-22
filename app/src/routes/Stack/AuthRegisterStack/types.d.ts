export type AuthRegisterStackParamList = {
    Splash: undefined
    AcceptAndContinue: undefined
    InsertPhone: undefined
    InsertConfirmationCode: {
        userPhone: string,
        verificationCodeId: string | void
    }
    InsertName: {
        userPhone: string
        userIdentification: UserIdentification
    }
    InsertProfilePicture: {
        userPhone: string,
        userName: string,
        userIdentification: UserIdentification
    }
    CustomCamera: {
        userPhone: string,
        userName: string,
        userIdentification: UserIdentification
    }
    ProfilePicturePreview: {
        userPhone: string,
        userName: string,
        profilePictureUri: string,
        userIdentification: UserIdentification
    }

    UserStack: undefined
};