import React, { createContext, useContext, useMemo, useState } from 'react'

import { VacancyEntity, VacancyEntityOptional } from '@domain/post/entity/types'

import { VacancyContextType, VacancyProviderProps } from './types'

import { AuthContext } from '../AuthContext'

const initialValue = {
	isSecondPost: false,
	vacancyDataContext: {} as VacancyEntity,
	setVacancyDataOnContext: (data: VacancyEntityOptional) => { },
	getAditionalDataFromLastPost: () => { }
}

const VacancyContext = createContext<VacancyContextType>(initialValue)

function VacancyProvider({ children }: VacancyProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [vacancyDataContext, setVacancyDataContext] = useState(initialValue.vacancyDataContext)

	const setVacancyDataOnContext = async (data: VacancyEntityOptional) => {
		const customData: VacancyEntityOptional = { macroCategory: 'vacancy', ...data } // Solução temporária para o problema de definir macro categorias de vendas, serviços e vagas
		setVacancyDataContext({ ...vacancyDataContext, ...customData })
	}

	const getAditionalDataFromLastPost = () => {
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && !userPosts.length)) return

		const lastUserPost = getLastUserPost() || {}
		if (!Object.keys(lastUserPost).length) return

		setVacancyDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
		} as VacancyEntity)
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
