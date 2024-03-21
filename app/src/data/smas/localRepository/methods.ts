import AsyncStorage from '@react-native-async-storage/async-storage'

async function getNisValue() {
	try {
		const storedNis = await AsyncStorage.getItem('corre.nis')

		if (storedNis) {
			const storedNisObject = JSON.parse(storedNis)
			return storedNisObject.nis
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

async function saveNisValue(nis: string) {
	try {
		const nisObject = { nis }
		await AsyncStorage.setItem('corre.nis', JSON.stringify(nisObject))
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

async function clearNisValue() {
	try {
		await AsyncStorage.removeItem('corre.nis')
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { getNisValue, saveNisValue, clearNisValue }
