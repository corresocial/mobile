/* eslint-disable no-unused-vars */
import { UserEntity } from '../entity/types'

function mergeUnapprovedDataOnProfileDM(postData: UserEntity) {
	const { unapprovedData, ...restData } = postData
	const { reject, owner, ...data } = unapprovedData as any //  as UserEntityOptional['unapprovedData']

	return { ...restData, ...data } as UserEntity
}

export { mergeUnapprovedDataOnProfileDM }
