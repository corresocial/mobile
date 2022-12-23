import AsyncStorage from '@react-native-async-storage/async-storage'
import { AddressSearchResult } from './types'

const getRecentAddressFromStorage = async () => {
	// await AsyncStorage.removeItem('corre.addresses')
	const storageAddresses = await AsyncStorage.getItem('corre.addresses')
	if (storageAddresses) {
		const addressesList = JSON.parse(storageAddresses)
		return addressesList as AddressSearchResult[]
	}
	return [] as AddressSearchResult[]
}

const setRecentAddressOnStorage = async (data: AddressSearchResult) => {
	const storedAddresses = await getRecentAddressFromStorage()

	const filtredAddress = storedAddresses.filter((address: any) => address.formattedAddress !== data.formattedAddress)
	const allAddresses = [...filtredAddress, { ...data, recent: true }]

	if (allAddresses.length > 10) {
		allAddresses.shift()
	}

	await AsyncStorage.setItem('corre.addresses', JSON.stringify(allAddresses))
	return true
}

export { getRecentAddressFromStorage, setRecentAddressOnStorage }
