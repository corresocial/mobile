import { Video } from 'react-native-compressor'

async function compressVideo(videoUri: string) {
	const uri = await Video.compress(
		videoUri,
		{},
		// (progress) => console.log('Compression Progress: ', progress)
	)
	return uri
}

export { compressVideo }