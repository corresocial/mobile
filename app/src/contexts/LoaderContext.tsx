import React, { createContext, useMemo, useState } from 'react'

import { LoaderModal } from '../components/_modals/LoaderModal'

type LoaderContextType = {
	loaderIsVisible: boolean,
	setLoaderIsVisible: (visibility: boolean) => void
}

interface LoaderProviderProps {
	children: React.ReactNode
}

const initialValue = {
	loaderIsVisible: false,
	setLoaderIsVisible: (visibility: boolean) => { }
}

const LoaderContext = createContext<LoaderContextType>(initialValue)

function LoaderProvider({ children }: LoaderProviderProps) {
	const [loaderIsVisible, setLoaderIsVisible] = useState(initialValue.loaderIsVisible)

	const loaderDataProvider = useMemo(() => ({
		loaderIsVisible,
		setLoaderIsVisible
	}), [loaderIsVisible])

	return (
		<LoaderContext.Provider value={loaderDataProvider}>
			{children}
			<LoaderModal visible={loaderIsVisible} closeModal={() => setLoaderIsVisible(false)} />
		</LoaderContext.Provider>
	)
}

export { LoaderProvider, LoaderContext }
