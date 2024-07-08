import * as ImageManipulator from 'expo-image-manipulator'

async function compressImage(imageUri: string) {
	const { uri } = await ImageManipulator.manipulateAsync(
		imageUri,
		[],
		{ compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
	)

	return uri
}

export { compressImage }
