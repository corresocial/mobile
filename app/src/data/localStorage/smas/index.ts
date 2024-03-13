import AsyncStorage from '@react-native-async-storage/async-storage'

const getNisFromStorage = async () => {
	const storedNis = await AsyncStorage.getItem('corre.nis')
	if (storedNis) {
		const storedNisObject = JSON.parse(storedNis)
		return storedNisObject.nis
	}
	return ''
}

const setNisOnStorage = async (nis: string) => {
	const NisObject = { nis }
	await AsyncStorage.setItem('corre.nis', JSON.stringify(NisObject))
	return true
}

const clearStoragedNis = async () => {
	await AsyncStorage.removeItem('corre.nis')
	return true
}

export {
	getNisFromStorage,
	setNisOnStorage,
	clearStoragedNis
}
