import React, { createContext, useContext, useMemo, useState } from 'react'

import { CultureContextType, CulturePostData, CultureProviderProps } from './types'
import { CultureCollectionRemote } from '@services/firebase/types'

import { AuthContext } from '../AuthContext'

const initialValue: CultureContextType = {
	isSecondPost: false,
	cultureDataContext: {},
	setCultureDataOnContext: (data: CulturePostData) => { },
	getAditionalDataFromLastPost: () => { },
}

const CultureContext = createContext<CultureContextType>(initialValue)

function CultureProvider({ children }: CultureProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [cultureDataContext, setCultureDataContext] = useState(initialValue.cultureDataContext)

	const setCultureDataOnContext = async (data: CulturePostData) => {
		setCultureDataContext({ ...cultureDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && !userPosts.length)) return

		const lastUserPost: CultureCollectionRemote | any = getLastUserPost() || {} // TODO Tipagem de posts deve ser Genérico
		if (!Object.keys(lastUserPost).length) return

		setCultureDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || '',
			entryValue: lastUserPost.entryValue || '',
			exhibitionFrequency: lastUserPost.exhibitionFrequency || '',
			daysOfWeek: lastUserPost.daysOfWeek || [],
			repeat: lastUserPost.repeat || 'unrepeatable',
			startDate: lastUserPost.startDate || '',
			startHour: lastUserPost.startHour || '',
			endDate: lastUserPost.endDate || '',
			endHour: lastUserPost.endHour || '',
		})
		setIsSecondPost(true)
	}

	const cultureProviderData = useMemo(() => ({
		isSecondPost,
		cultureDataContext,
		setCultureDataOnContext,
		getAditionalDataFromLastPost
	}), [cultureDataContext])

	return (
		<CultureContext.Provider value={cultureProviderData}>
			{children}
		</CultureContext.Provider>
	)
}

export { CultureProvider, CultureContext }
