import { getLocalUserDataDM } from './methods/getLocalUserDataDM'
import { getLocalUserDataWithDeviceAuthDM } from './methods/getLocalUserDataWithDeviceAuthDM'
import { UserDomainInterface } from './UserDomainInterface'

function useUserDomain(): UserDomainInterface {
	return {
		getLocalUserDataWithDeviceAuth: getLocalUserDataWithDeviceAuthDM,
		getLocalUserData: getLocalUserDataDM
	}
}

export { useUserDomain }
