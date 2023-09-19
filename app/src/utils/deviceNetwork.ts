import * as Network from 'expo-network'

function getNetworkStatus() {
	if (Network) {
		return Network.getNetworkStateAsync()
	}

	return true
}

export { getNetworkStatus }
