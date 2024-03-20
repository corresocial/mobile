import { useState } from 'react'

import { LocalUserData } from '@contexts/AuthContext/types'

function useViewController() {
	const [user, setUser] = useState<LocalUserData>({})
	const [isLoggedUser, setIsLoggedUser] = useState(false)
	const [userDescriptionIsExpanded, setUserDescriptionIsExpanded] = useState(false)
	const [hostDescriptionIsExpanded, setHostDescriptionIsExpanded] = useState(false)

	const [toggleVerifiedModal, setToggleVerifiedModal] = useState(false)
	const [numberOfOfflinePostsStored, setNumberOfOfflinePostsStored] = useState(0)
	const [hasNetworkConnection, setHasNetworkConnection] = useState(false)
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [profileOptionsIsOpen, setProfileOptionsIsOpen] = useState(false)

	return {
		user, setUser,
		isLoggedUser, setIsLoggedUser,
		userDescriptionIsExpanded, setUserDescriptionIsExpanded,
		hostDescriptionIsExpanded, setHostDescriptionIsExpanded,
		selectedTags, setSelectedTags,
		profileOptionsIsOpen, setProfileOptionsIsOpen,
		toggleVerifiedModal, setToggleVerifiedModal,
		numberOfOfflinePostsStored, setNumberOfOfflinePostsStored,
		hasNetworkConnection, setHasNetworkConnection
	}
}

export { useViewController }
