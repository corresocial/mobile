import { useChatDomain } from '@domain/chat/useChatDomain'
import { usePetitionDomain } from '@domain/petition/usePetitionDomain'
import { usePollDomain } from '@domain/poll/usePollDomain'
import { usePostDomain } from '@domain/post/usePostDomain'

import { usePetitionRepository } from '@data/petition/usePetitionRepository'
import { usePollRepository } from '@data/poll/usePollRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { CompleteUser, UserOwner } from '../entity/types'

import { arrayIsEmpty } from '@utils-ui/common/validation/validateArray'

import { mergeUnapprovedDataOnProfileDM } from '../core/mergeUnapprovedDataOnProfileDM'

async function approveProfileDM(useUserRepository: () => UserRepositoryInterface, profileData: CompleteUser) {
	try {
		const { remoteStorage } = useUserRepository()
		const { updateOwnerDataOnPosts } = usePostDomain()
		const { updateOwnerDataOnPolls } = usePollDomain()
		const { updateProfilePictureOnConversations } = useChatDomain()
		const { updateOwnerDataOnPetitions } = usePetitionDomain()

		const { unapprovedData } = profileData

		const newUserData = mergeUnapprovedDataOnProfileDM(profileData)
		await remoteStorage.updateUserData(profileData.userId, newUserData, false)

		if (unapprovedData) {
			if (unapprovedData.owner) {
				console.log(unapprovedData.owner)
				if (!unapprovedData.owner.userId) throw new Error('Id de usuário inválido')
				const ownerData = unapprovedData.owner as UserOwner

				await updateOwnerDataOnPosts(usePostRepository, { ...ownerData })

				if (profileData.verified && profileData.verified.type === 'leader') {
					await updateOwnerDataOnPolls(usePollRepository, { ...ownerData })
					await updateOwnerDataOnPetitions(usePetitionRepository, { ...ownerData })
				}
			}

			if (unapprovedData.profilePictureUrl && unapprovedData.profilePictureUrl.length) {
				await updateProfilePictureOnConversations(profileData.userId, unapprovedData.profilePictureUrl[0], unapprovedData.name || profileData.name)
			}

			if (!arrayIsEmpty(unapprovedData.profilePictureUrl)) {
				await remoteStorage.deleteUserProfilePicture(profileData.profilePictureUrl || [])
			}
		}
		return newUserData
	} catch (error) {
		console.log(error)
	}
}

export { approveProfileDM }
