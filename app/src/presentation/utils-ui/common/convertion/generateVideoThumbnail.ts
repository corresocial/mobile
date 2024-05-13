import { createVideoThumbnail } from 'react-native-compressor'

async function generateVideoThumbnails(videosUrl: string | string[]) {
	if (videosUrl && typeof videosUrl === 'string') {
		const thumbnail = await createVideoThumbnail(videosUrl)
		return thumbnail.path
	}

	return Promise.all(
		(videosUrl as string[]).map(async (videoUrl: string) => {
			const thumbnail = await createVideoThumbnail(videoUrl)
			return thumbnail.path
		})
	)
}

export { generateVideoThumbnails }
