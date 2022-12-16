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

const setRecentAddressOnStorage = async (data: any) => { // TODO type
	const storedAddresses = await getRecentAddressFromStorage()

	const filtredAddress = storedAddresses.filter((address: any) => data.formatedAddress !== address.formatedAddress)
	const allAddresses = [...filtredAddress, { ...data, recent: true }]

	await AsyncStorage.setItem('corre.addresses', JSON.stringify(allAddresses))
	return true
}

export { getRecentAddressFromStorage, setRecentAddressOnStorage }
