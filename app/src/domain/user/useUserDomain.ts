import { approveProfileDM } from './methods/approveProfileDM'
import { createNewUserDM } from './methods/createNewUserDM'
import { getLocalUserDataDM } from './methods/getLocalUserDataDM'
import { getLocalUserDataWithDeviceAuthDM } from './methods/getLocalUserDataWithDeviceAuthDM'
import { getUnapprovedProfilesDM } from './methods/getUnapprovedProfilesDM'
import { logoutUserDM } from './methods/logoutUserDM'
import { phoneVerificationCodeIsValidDM } from './methods/phoneVerificationCodeIsValidDM'
import { rejectProfileDM } from './methods/rejectProfile'
import { requestPhoneVerificationCodeDM } from './methods/requestPhoneVerificationCodeDM'
import { syncWithRemoteUserDM } from './methods/syncWithRemoteUserDM'
import { updateUserRepositoryDM } from './methods/updateUserRepositoriesDM'
import { updateUserSubscriptionDataDM } from './methods/updateUserSubscriptionDataDm'
import { uploadUserMediaDM } from './methods/uploadUserMediaDM'
import { UserDomainInterface } from './UserDomainInterface'

function useUserDomain(): UserDomainInterface {
	return {
		syncWithRemoteUser: syncWithRemoteUserDM,
		getLocalUserDataWithDeviceAuth: getLocalUserDataWithDeviceAuthDM,
		getLocalUserData: getLocalUserDataDM,
		getUnapprovedProfiles: getUnapprovedProfilesDM,

		requestPhoneVerificationCode: requestPhoneVerificationCodeDM,
		phoneVerificationCodeIsValid: phoneVerificationCodeIsValidDM,

		createNewUser: createNewUserDM,
		approveProfile: approveProfileDM,
		rejectProfile: rejectProfileDM,

		updateUserRepository: updateUserRepositoryDM,
		updateUserSubscriptionData: updateUserSubscriptionDataDM,
		uploadUserMedia: uploadUserMediaDM,

		logoutUser: logoutUserDM,
	}
}

export { useUserDomain }
