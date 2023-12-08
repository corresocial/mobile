import { Id } from '../globalTypes'

const initialUserDataStructure = {
	blockedUsers: [''],
	chatIds: ['']
}

export type CheckBlockedUsersResponse = { hasUserBlocked: boolean, userBlockOwnerId: Id }

export { initialUserDataStructure }
