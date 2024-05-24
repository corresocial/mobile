/* eslint-disable no-unused-vars */
import { PostEntity } from '../entity/types'

function mergeUnapprovedDataOnPostDM(postData: PostEntity) {
	const { unapprovedData, createdAt, ...restData } = postData
	const { reject, ...data } = unapprovedData as any //  as PostEntityOptional['unapprovedData']

	return { ...restData, ...data } as PostEntity
}

export { mergeUnapprovedDataOnPostDM }
