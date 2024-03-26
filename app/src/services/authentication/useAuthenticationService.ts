import { AuthenticationServiceInterface } from './AuthenticationServiceInterface'
import { handleMethodWithDeviceAuthentication } from './methods/handleMethodWithDeviceAuthentication'

function useAuthenticationService(): AuthenticationServiceInterface {
	return {
		handleMethodWithDeviceAuthentication: handleMethodWithDeviceAuthentication
	}
}

export { useAuthenticationService }
