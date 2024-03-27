import { getLocalUserDataDM } from './methods/getLocalUserDataDM'
import { getLocalUserDataWithDeviceAuthDM } from './methods/getLocalUserDataWithDeviceAuthDM'
import { logoutUserDM } from './methods/logoutUserDM'
import { phoneVerificationCodeIsValidDM } from './methods/phoneVerificationCodeIsValidDM'
import { requestPhoneVerificationCodeDM } from './methods/requestPhoneVerificationCodeDM'
import { syncWithRemoteUserDM } from './methods/syncWithRemoteUserDM'
import { updateUserRepositoryDM } from './methods/updateUserRepositoriesDM'
import { updateUserSubscriptionDataDM } from './methods/updateUserSubscriptionDataDm'
import { UserDomainInterface } from './UserDomainInterface'

function useUserDomain(): UserDomainInterface {
	return {
		getLocalUserDataWithDeviceAuth: getLocalUserDataWithDeviceAuthDM,
		getLocalUserData: getLocalUserDataDM,
		syncWithRemoteUser: syncWithRemoteUserDM,

		requestPhoneVerificationCode: requestPhoneVerificationCodeDM,
		phoneVerificationCodeIsValid: phoneVerificationCodeIsValidDM,

		updateUserRepository: updateUserRepositoryDM,
		updateUserSubscriptionData: updateUserSubscriptionDataDM,

		logoutUser: logoutUserDM
	}
}

export { useUserDomain }
