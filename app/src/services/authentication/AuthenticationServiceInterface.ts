type UnknowFunction = any

interface AuthenticationServiceInterface {
	handleMethodWithDeviceAuthentication: (secureMethod: UnknowFunction) => Promise<any>
}

export { AuthenticationServiceInterface }
