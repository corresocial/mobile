import * as Network from 'expo-network'

function getNetworkStatus() {
	return Network.getNetworkStateAsync()
}

export { getNetworkStatus }
