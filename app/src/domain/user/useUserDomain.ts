import { getLocalUserDataDM } from './methods/getLocalUserDataDM'
import { getLocalUserDataWithDeviceAuthDM } from './methods/getLocalUserDataWithDeviceAuthDM'
import { logoutUser } from './methods/logoutUser'
import { phoneVerificationCodeIsValidDM } from './methods/phoneVerificationCodeIsValidDM'
import { requestPhoneVerificationCodeDM } from './methods/requestPhoneVerificationCodeDM'
import { syncWithRemoteUserDM } from './methods/syncWithRemoteUserDM'
import { updateUserSubscriptionDataDM } from './methods/updateUserSubscriptionDataDm'
import { UserDomainInterface } from './UserDomainInterface'

function useUserDomain(): UserDomainInterface {
	return {
		getLocalUserDataWithDeviceAuth: getLocalUserDataWithDeviceAuthDM,
		getLocalUserData: getLocalUserDataDM,
		syncWithRemoteUser: syncWithRemoteUserDM,

		requestPhoneVerificationCode: requestPhoneVerificationCodeDM,
		phoneVerificationCodeIsValid: phoneVerificationCodeIsValidDM,

		updateUserSubscriptionData: updateUserSubscriptionDataDM,

		logoutUser: logoutUser
	}
}

export { useUserDomain }
