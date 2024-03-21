import AsyncStorage from '@react-native-async-storage/async-storage'

import { AddressSearchResult } from '@services/maps/types'

const getRecentAddresses = async () => {
	try {
		const storageAddresses = await AsyncStorage.getItem('corre.addresses')

		if (storageAddresses) {
			const addressesList = JSON.parse(storageAddresses)
			return addressesList.reverse() as AddressSearchResult[]
		}

		return [] as AddressSearchResult[]
	} catch (error) {
		console.log(error)
		return []
	}
}

const saveAddressData = async (data: AddressSearchResult) => { // TODO Refatorar
	try {
		const storedAddresses = await getRecentAddresses()

		const filtredAddress = storedAddresses.filter((address: any) => address.formattedAddress !== data.formattedAddress)
		const allAddresses = [...filtredAddress, { ...data, recent: true }]

		if (allAddresses.length > 10) { allAddresses.shift() }

		await AsyncStorage.setItem('corre.addresses', JSON.stringify(allAddresses))

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export {
	getRecentAddresses,
	saveAddressData
}
