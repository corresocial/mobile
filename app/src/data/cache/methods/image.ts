import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'

const cacheImageConfig = {
	clearCacheOnExpire: true,
	persistenceTime: 2592000000 // 30 dias
}

const getLastCacheImageDatetime = async () => {
	const lastCacheDatetime = await AsyncStorage.getItem('corre.cacheimage')
	if (lastCacheDatetime) {
		return parseInt(lastCacheDatetime)
	}
	return 0
}

const setLastCacheImageDatetime = async (datetime: number) => {
	await AsyncStorage.setItem('corre.cacheimage', JSON.stringify(datetime))
	return true
}

function clearImageCache() {
	Image.clearDiskCache()
	Image.clearMemoryCache()
}

async function checkCacheImageValidation() {
	if (cacheImageConfig.clearCacheOnExpire) {
		const currentDatetime = Date.now()
		const lastCacheDatetime = await getLastCacheImageDatetime()

		if (!lastCacheDatetime) {
			return setLastCacheImageDatetime(currentDatetime)
		}

		if (currentDatetime - lastCacheDatetime > cacheImageConfig.persistenceTime) {
			console.log('expirou')
			clearImageCache()
			return setLastCacheImageDatetime(currentDatetime)
		}
	}
}

export { cacheImageConfig, checkCacheImageValidation }
