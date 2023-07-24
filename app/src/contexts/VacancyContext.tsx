import React, { createContext, useContext, useMemo, useState } from 'react'

import { VacancyData } from './types'
import { VacancyCollectionRemote } from '../services/firebase/types'

import { AuthContext } from './AuthContext'

type VacancyContextType = {
	isSecondPost: boolean
	vacancyDataContext: VacancyData
	setVacancyDataOnContext: (data: VacancyData) => void
	getAditionalDataFromLastPost: () => void
}

interface VacancyProviderProps {
	children: React.ReactNode
}

const initialValue = {
	isSecondPost: false,
	vacancyDataContext: {},
	setVacancyDataOnContext: (data: VacancyData) => { },
	getAditionalDataFromLastPost: () => { }
}

const VacancyContext = createContext<VacancyContextType>(initialValue)

function VacancyProvider({ children }: VacancyProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [vacancyDataContext, setVacancyDataContext] = useState(initialValue.vacancyDataContext)

	const setVacancyDataOnContext = async (data: VacancyData) => {
		setVacancyDataContext({ ...vacancyDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && !userPosts.length)) return

		const lastUserPost: VacancyCollectionRemote | any = getLastUserPost() || {} // TODO Type
		if (!Object.keys(lastUserPost).length) return

		setVacancyDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || '',
			attendanceFrequency: lastUserPost.workFrequency || 'someday',
			daysOfWeek: lastUserPost.daysOfWeek || [],
			startDate: lastUserPost.startDate || '',
			startHour: lastUserPost.startHour || '',
			endDate: lastUserPost.endDate || '',
			endHour: lastUserPost.endHour || '',
			importantPoints: lastUserPost.importantPoints || [],
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
