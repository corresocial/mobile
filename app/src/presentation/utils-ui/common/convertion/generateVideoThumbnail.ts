// import * as VideoThumbnails from 'expo-video-thumbnails'

async function generateVideoThumbnails(videosUrl: string[]) {
	return Promise.all(
		videosUrl.map(async (videoUrl) => {
			// const { uri } = await VideoThumbnails.getThumbnailAsync(videoUrl, { time: 1000 })
			// return uri
			return []
		})
	)
}

export { generateVideoThumbnails }
