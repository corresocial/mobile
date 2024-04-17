/*
	Arquivo utilizando somente para teste
	Se encontrar, pode deletar hahah!
*/

import { UserEntity } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

const { syncWithRemoteUser } = useUserDomain()

function UserUserCaseAdapter() {
	return {
		async syncWithRemoteUser(userId?: string, localUserData?: UserEntity) {
			return syncWithRemoteUser(useUserRepository, userId, localUserData)
		},

	}
}

export { UserUserCaseAdapter }
