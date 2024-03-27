import { getLocalUserDataDM } from './methods/getLocalUserDataDM'
import { getLocalUserDataWithDeviceAuthDM } from './methods/getLocalUserDataWithDeviceAuthDM'
import { logoutUser } from './methods/logoutUser'
import { phoneVerificationCodeIsValidDM } from './methods/phoneVerificationCodeIsValidDM'
import { requestPhoneVerificationCodeDM } from './methods/requestPhoneVerificationCodeDM'
import { syncWithRemoteUserDM } from './methods/syncWithRemoteUserDM'
import { UserDomainInterface } from './UserDomainInterface'

function useUserDomain(): UserDomainInterface {
	return {
		getLocalUserDataWithDeviceAuth: getLocalUserDataWithDeviceAuthDM,
		getLocalUserData: getLocalUserDataDM,
		syncWithRemoteUser: syncWithRemoteUserDM,

		requestPhoneVerificationCode: requestPhoneVerificationCodeDM,
		phoneVerificationCodeIsValid: phoneVerificationCodeIsValidDM,

		logoutUser: logoutUser
	}
}

export { useUserDomain }
