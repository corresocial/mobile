import { getLocalUserData } from './getLocalUserData'

async function hasValidLocalUser() {
	const storedUser = await getLocalUserData()
	return !!(storedUser && storedUser.userId)
}

export { hasValidLocalUser }
