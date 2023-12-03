import * as Network from 'expo-network' // services/  **clean archtecture

function getNetworkStatus() {
	if (Network) {
		return Network.getNetworkStateAsync()
	}

	return {
		isConnected: true,
		isInternetReachable: true
	}
}

export { getNetworkStatus }
