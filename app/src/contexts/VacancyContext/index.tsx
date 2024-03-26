import React, { createContext, useContext, useMemo, useState } from 'react'

import { VacancyContextType, VacancyProviderProps, VacancyPostData } from './types'
import { PostCollectionCommonFields } from '@domain/post/entity/types'

import { AuthContext } from '../AuthContext'

const initialValue = {
	isSecondPost: false,
	vacancyDataContext: {},
	setVacancyDataOnContext: (data: VacancyPostData) => { },
	getAditionalDataFromLastPost: () => { }
}

const VacancyContext = createContext<VacancyContextType>(initialValue)

function VacancyProvider({ children }: VacancyProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [vacancyDataContext, setVacancyDataContext] = useState(initialValue.vacancyDataContext)

	const setVacancyDataOnContext = async (data: VacancyPostData) => {
		setVacancyDataContext({ ...vacancyDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && !userPosts.length)) return

		const lastUserPost: PostCollectionCommonFields = getLastUserPost() || {}
		if (!Object.keys(lastUserPost).length) return

		setVacancyDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
		})
		setIsSecondPost(true)
	}

	const vacanyDataProvider = useMemo(() => ({
		isSecondPost,
		vacancyDataContext,
		setVacancyDataOnContext,
		getAditionalDataFromLastPost
	}), [vacancyDataContext])

	return (
		<VacancyContext.Provider value={vacanyDataProvider}>
			{children}
		</VacancyContext.Provider>
	)
}

export { VacancyProvider, VacancyContext }
