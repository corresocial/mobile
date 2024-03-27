import React, { createContext, useMemo, useState, useContext } from 'react'

import { ServiceContextType, ServicePostData, ServiceProviderProps } from './types'

import { AuthContext } from '../AuthContext'

const initialValue = {
	isSecondPost: false,
	serviceDataContext: {},
	setServiceDataOnContext: (data: ServicePostData) => { },
	getAditionalDataFromLastPost: () => { }
}

const ServiceContext = createContext<ServiceContextType>(initialValue)

function ServiceProvider({ children }: ServiceProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [serviceDataContext, setServiceDataContext] = useState(initialValue.serviceDataContext)

	const setServiceDataOnContext = async (data: ServicePostData) => {
		setServiceDataContext({ ...serviceDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const lastUserPost = getLastUserPost() || {}
		if (!Object.keys(lastUserPost).length) return

		setServiceDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
		})
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
