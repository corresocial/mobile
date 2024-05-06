import { UserRegisterData } from '../entity/types'

export function remoteUserPrivateData(user: UserRegisterData) {
	// eslint-disable-next-line no-unused-vars
	const { cellNumber, email, verificationCodeId, userId, ...data } = user
	return data
}
