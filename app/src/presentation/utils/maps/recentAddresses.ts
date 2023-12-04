import AsyncStorage from '@react-native-async-storage/async-storage'
import { AddressSearchResult } from '../../../services/maps/types'

// data
const getLastRecentAddress = (recentAddresses: AddressSearchResult[]) => {
	if (recentAddresses && recentAddresses.length) {
		return {
			lat: recentAddresses[0].lat,
			lon: recentAddresses[0].lon
		}
	}
	return null
}

const getRecentAdressesFromStorage = async () => {
	const storageAddresses = await AsyncStorage.getItem('corre.addresses')
	if (storageAddresses) {
		const addressesList = JSON.parse(storageAddresses)
		return addressesList.reverse() as AddressSearchResult[]
	}
	return [] as AddressSearchResult[]
}

const setRecentAddressOnStorage = async (data: AddressSearchResult) => {
	const storedAddresses = await getRecentAdressesFromStorage()

	const filtredAddress = storedAddresses.filter((address: any) => address.formattedAddress !== data.formattedAddress)
	const allAddresses = [...filtredAddress, { ...data, recent: true }]

	if (allAddresses.length > 10) {
		allAddresses.shift()
	}

	await AsyncStorage.setItem('corre.addresses', JSON.stringify(allAddresses))
	return true
}

export {
	getLastRecentAddress,
	getRecentAdressesFromStorage,
	setRecentAddressOnStorage
}
