
export type UserIdentification = {
    uid: string;
    authTime: string;
    accessToken: string;
    tokenExpirationTime: string;
    refreshToken: string;
}

export type RegisterUserData = {
    userPhone: string
    userName: string
    profilePictureUri?: string 
    userIdentification: UserIdentification
}