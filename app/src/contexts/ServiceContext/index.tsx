import React, { createContext, useMemo, useState, useContext } from 'react'

import { ServiceContextType, ServicePostData, ServiceProviderProps } from './types'
import { IncomeCollectionRemote } from '@services/firebase/types'

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

	console.log('ContextUpdated === ServiceContext')

	const getAditionalDataFromLastPost = () => {
		const lastUserPost: IncomeCollectionRemote | any = getLastUserPost() || {} // TODO Type
		if (!Object.keys(lastUserPost).length) return

		setServiceDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || '',
			deliveryMethod: lastUserPost.deliveryMethod || '',
			attendanceFrequency: lastUserPost.attendanceFrequency || '',
			daysOfWeek: lastUserPost.daysOfWeek || '',
			startHour: lastUserPost.startHour || '',
			endHour: lastUserPost.endHour || '',
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
