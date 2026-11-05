import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

import { MediaAsset } from 'src/presentation/types'

import { generateVideoThumbnails } from './convertion/generateVideoThumbnail'

interface PickMediaFromLibraryOptions {
	maxSelection?: number
	allowVideos?: boolean
	videoDurationLimit?: number // em segundos
}

// Usa o seletor de fotos do sistema (Photo Picker no Android, PHPicker no iOS): não exige permissão de galeria
async function pickMediaFromLibrary({
	maxSelection = 10,
	allowVideos = false,
	videoDurationLimit = 180
}: PickMediaFromLibraryOptions = {}): Promise<MediaAsset[]> {
	if (maxSelection < 1) return []

	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: allowVideos ? ['images', 'videos'] : ['images'],
		allowsMultipleSelection: maxSelection > 1,
		selectionLimit: maxSelection,
		orderedSelection: true
	})

	if (result.canceled) return []

	const exceedsVideoLimit = (asset: ImagePicker.ImagePickerAsset) => {
		return asset.type === 'video' && !!asset.duration && asset.duration / 1000 > videoDurationLimit
	}

	const validAssets = result.assets.filter((asset) => !exceedsVideoLimit(asset))
	if (validAssets.length < result.assets.length) {
		Alert.alert('', `Seu vídeo tem mais que ${videoDurationLimit / 60} minutos`)
	}

	return Promise.all(validAssets.map(async (asset): Promise<MediaAsset> => {
		if (asset.type !== 'video') return { url: asset.uri, mediaType: 'photo' }

		try {
			const videoThumbnail = await generateVideoThumbnails(asset.uri) as string
			return { url: asset.uri, mediaType: 'video', videoThumbnail }
		} catch (error) {
			console.log(error)
			return { url: asset.uri, mediaType: 'video' }
		}
	}))
}

export { pickMediaFromLibrary }
