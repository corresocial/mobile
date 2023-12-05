import React, { createContext, useMemo, useState, useContext } from 'react'

import { IncomeCollectionRemote } from '@services/firebase/types'

import { AuthContext } from './AuthContext'
import { ServiceData } from './types'

type ServiceContextType = {
	isSecondPost: boolean
	serviceDataContext: ServiceData
	setServiceDataOnContext: (data: ServiceData) => void
	getAditionalDataFromLastPost: () => void
}

interface ServiceProviderProps {
	children: React.ReactNode
}

const initialValue = {
	isSecondPost: false,
	serviceDataContext: {},
	setServiceDataOnContext: (data: ServiceData) => { },
	getAditionalDataFromLastPost: () => { }
}

const ServiceContext = createContext<ServiceContextType>(initialValue)

function ServiceProvider({ children }: ServiceProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [serviceDataContext, setServiceDataContext] = useState(initialValue.serviceDataContext)

	const setServiceDataOnContext = async (data: ServiceData) => {
		setServiceDataContext({ ...serviceDataContext, ...data })
	}

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
