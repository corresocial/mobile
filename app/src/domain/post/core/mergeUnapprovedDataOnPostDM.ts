import { PostEntity } from '../entity/types'

function mergeUnapprovedDataOnPostDM(postData: PostEntity) {
	const { unapprovedData, ...data } = postData
	return { ...data, ...unapprovedData } as PostEntity
}

export { mergeUnapprovedDataOnPostDM }
