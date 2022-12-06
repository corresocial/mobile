import React, { createContext, useMemo, useState } from 'react'

import { ServiceData } from './types'

type ServiceContextType = {
	serviceDataContext: ServiceData
	setServiceDataOnContext: (data: ServiceData) => void
}

interface ServiceProviderProps {
	children: React.ReactNode
}

const initialValue = {
	serviceDataContext: {
	},
	setServiceDataOnContext: (data: ServiceData) => { }
}

const ServiceContext = createContext<ServiceContextType>(initialValue)

function ServiceProvider({ children }: ServiceProviderProps) {
	const [serviceDataContext, setServiceDataContext] = useState(initialValue.serviceDataContext)

	const setServiceDataOnContext = async (data: ServiceData) => {
		console.log(data)
		setServiceDataContext({
			...serviceDataContext, ...data
		})
	}

	const serviceProviderData = useMemo(() => ({
		serviceDataContext,
		setServiceDataOnContext
	}), [serviceDataContext])

	return (
		<ServiceContext.Provider value={serviceProviderData} >
			{children}
		</ServiceContext.Provider>
	)
}

export { ServiceProvider, ServiceContext }
