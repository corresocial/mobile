import { MediaAsset } from 'src/presentation/types'

export function convertToMediaAsset(medias: { picturesUrl: string[], videosUrl: string[] }) {
	const videosAssets: MediaAsset[] = medias?.videosUrl?.map((url) => ({
		url,
		mediaType: 'video',
	})) ?? []
	const picturesAssets: MediaAsset[] = medias?.picturesUrl?.map((url) => ({
		url,
		mediaType: 'photo'
	})) ?? []

	return [...videosAssets ?? [], ...picturesAssets ?? []]
}
