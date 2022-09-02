import { UserIdentification } from "../InsertConfirmationCode/types"

export type RegisterUserData = {
    userPhone: string
    userName: string
    profilePictureUri?: string 
    userIdentification: UserIdentification
}