import { Video } from 'react-native-compressor'

async function compressVideo(videoUri: string) {
	console.log('Tô dnedo do compress')
	console.log(videoUri)
	const uri = await Video.compress(
		videoUri,
		{},
		// (progress) => console.log('Compression Progress: ', progress)
	)
	console.log('Compressed video URI: ', uri)
	return uri
}

export { compressVideo }
