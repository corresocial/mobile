import { createNewUserDM } from './methods/createNewUserDM'
import { getLocalUserDataDM } from './methods/getLocalUserDataDM'
import { getLocalUserDataWithDeviceAuthDM } from './methods/getLocalUserDataWithDeviceAuthDM'
import { logoutUserDM } from './methods/logoutUserDM'
import { phoneVerificationCodeIsValidDM } from './methods/phoneVerificationCodeIsValidDM'
import { requestPhoneVerificationCodeDM } from './methods/requestPhoneVerificationCodeDM'
import { syncWithRemoteUserDM } from './methods/syncWithRemoteUserDM'
import { updateUserRepositoryDM } from './methods/updateUserRepositoriesDM'
import { updateUserSubscriptionDataDM } from './methods/updateUserSubscriptionDataDm'
import { uploadUserMediaDM } from './methods/uploadUserMediaDM'
import { UserDomainInterface } from './UserDomainInterface'

function useUserDomain(): UserDomainInterface {
	return {
		getLocalUserDataWithDeviceAuth: getLocalUserDataWithDeviceAuthDM,
		getLocalUserData: getLocalUserDataDM,
		syncWithRemoteUser: syncWithRemoteUserDM,

		requestPhoneVerificationCode: requestPhoneVerificationCodeDM,
		phoneVerificationCodeIsValid: phoneVerificationCodeIsValidDM,

		createNewUser: createNewUserDM,

		updateUserRepository: updateUserRepositoryDM,
		updateUserSubscriptionData: updateUserSubscriptionDataDM,
		uploadUserMedia: uploadUserMediaDM,

		logoutUser: logoutUserDM,
	}
}

export { useUserDomain }
