import React, { createContext, useMemo, useState, useContext } from 'react'

import { IncomeEntity, IncomeEntityOptional } from '@domain/post/entity/types'

import { ServiceContextType, ServiceProviderProps } from './types'

import { AuthContext } from '../AuthContext'

const initialValue = {
	isSecondPost: false,
	serviceDataContext: {} as IncomeEntity,
	setServiceDataOnContext: (data: IncomeEntityOptional) => { },
	getAditionalDataFromLastPost: () => { }
}

const ServiceContext = createContext<ServiceContextType>(initialValue)

function ServiceProvider({ children }: ServiceProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [serviceDataContext, setServiceDataContext] = useState(initialValue.serviceDataContext)

	const setServiceDataOnContext = async (data: IncomeEntityOptional) => {
		console.log({ ...data }) // CURRENT remove
		const customData: IncomeEntityOptional = { macroCategory: 'service', ...data } // Solução temporária para o problema de definir macro categorias de vendas, serviços e vagas
		setServiceDataContext({ ...serviceDataContext, ...customData })
	}

	const getAditionalDataFromLastPost = () => {
		const lastUserPost = getLastUserPost()
		if (!lastUserPost) return

		setServiceDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
		} as IncomeEntity)
		setIsSecondPost(true)
	}

	const serviceProviderData = useMemo(() => ({
		isSecondPost,
		serviceDataContext,
		setServiceDataOnContext,
		getAditionalDataFromLastPost
	}), [serviceDataContext])

	return (
		<ServiceContext.Provider value={serviceProviderData} >
			{children}
		</ServiceContext.Provider>
	)
}

export { ServiceProvider, ServiceContext }
