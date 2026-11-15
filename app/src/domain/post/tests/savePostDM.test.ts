import { savePostDM } from '../methods/savePostDM'

jest.mock('../methods/updateLocationDataOnPostsDM', () => ({ updateLocationDataOnPostsDM: jest.fn() }))
jest.mock('../core/postLocationChangedDM', () => ({ postLocationChangedDM: jest.fn().mockResolvedValue(false) }))

const owner = { userId: 'user-1', name: 'Teste' }

function buildDependencies() {
	const createPost = jest.fn(async (post: any) => ({ ...post, postId: 'post-1' }))
	const uploadPostMedias = jest.fn(async (uris: string[], folder: string) => (
		uris.map((_, index) => `https://storage.test/${folder}/${index}.jpg`)
	))

	const usePostRepository = (() => ({ remoteStorage: { createPost, uploadPostMedias } })) as any
	const useCloudFunctionService = (() => ({ notifyUsersOnLocation: jest.fn() })) as any

	return { createPost, uploadPostMedias, usePostRepository, useCloudFunctionService }
}

function buildPost(unapprovedData: Record<string, unknown>) {
	return { owner, postType: 'culture', unapprovedData: { description: 'post de teste', ...unapprovedData } } as any
}

describe('savePostDM', () => {
	it('grava no post as URLs das fotos enviadas ao Storage', async () => {
		const { createPost, uploadPostMedias, usePostRepository, useCloudFunctionService } = buildDependencies()
		const localPictures = ['file:///cache/a.jpg', 'file:///cache/b.jpg']
		const post = buildPost({ picturesUrl: localPictures, videosUrl: [] })

		await savePostDM(usePostRepository, useCloudFunctionService, 'country', post, post, localPictures)

		expect(uploadPostMedias).toHaveBeenCalledWith(localPictures, 'pictures')
		const savedPost = createPost.mock.calls[0][0]
		expect(savedPost.unapprovedData.picturesUrl).toEqual([
			'https://storage.test/pictures/0.jpg',
			'https://storage.test/pictures/1.jpg'
		])
	})

	it('mantém fotos já enviadas e acrescenta as novas', async () => {
		const { createPost, usePostRepository, useCloudFunctionService } = buildDependencies()
		const pictures = ['https://storage.test/old.jpg', 'file:///cache/new.jpg']
		const post = buildPost({ picturesUrl: pictures })

		await savePostDM(usePostRepository, useCloudFunctionService, 'country', post, post, pictures)

		const savedPost = createPost.mock.calls[0][0]
		expect(savedPost.unapprovedData.picturesUrl).toEqual([
			'https://storage.test/old.jpg',
			'https://storage.test/pictures/0.jpg'
		])
	})

	it('remove os arrays de mídia vazios, para a aprovação não sobrescrevê-los', async () => {
		const { createPost, usePostRepository, useCloudFunctionService } = buildDependencies()
		const post = buildPost({ picturesUrl: [], videosUrl: [] })

		await savePostDM(usePostRepository, useCloudFunctionService, 'country', post, post, [])

		const savedPost = createPost.mock.calls[0][0]
		expect(savedPost.unapprovedData).not.toHaveProperty('picturesUrl')
		expect(savedPost.unapprovedData).not.toHaveProperty('videosUrl')
	})

	it('grava as URLs dos vídeos enviados', async () => {
		const { createPost, uploadPostMedias, usePostRepository, useCloudFunctionService } = buildDependencies()
		const post = buildPost({ picturesUrl: [], videosUrl: ['file:///cache/v.mp4'] })

		await savePostDM(usePostRepository, useCloudFunctionService, 'country', post, post, [])

		expect(uploadPostMedias).toHaveBeenCalledWith(['file:///cache/v.mp4'], 'videos')
		expect(createPost.mock.calls[0][0].unapprovedData.videosUrl).toEqual(['https://storage.test/videos/0.jpg'])
	})
})
