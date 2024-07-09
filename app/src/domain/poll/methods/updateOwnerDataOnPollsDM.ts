import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

import { PollEntityOptional } from '../entity/types'

async function updateOwnerDataOnPollsDM(
	usePollRepository: () => PollRepositoryInterface,
	ownerData: Partial<PollEntityOptional['owner']>
) {
	try {
		const { getPollIdsByUser, updateOwnerDataOnPolls } = usePollRepository()

		if (!ownerData?.userId) throw new Error('Id de usuário inválido')

		const pollIds = await getPollIdsByUser(ownerData.userId)
		await updateOwnerDataOnPolls(ownerData, pollIds || [])
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { updateOwnerDataOnPollsDM }
