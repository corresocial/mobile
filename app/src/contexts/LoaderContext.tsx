import React, { createContext, useMemo, useState, useCallback } from 'react'
import { LoaderModal } from '../components/_modals/LoaderModal'

type LoaderContextType = {
	loaderIsVisible: boolean;
	setLoaderIsVisible: (visibility: boolean) => void;
};

interface LoaderProviderProps {
	children: React.ReactNode;
}

const initialValue: LoaderContextType = {
	loaderIsVisible: false,
	setLoaderIsVisible: () => { },
}

const LoaderContext = createContext<LoaderContextType>(initialValue)

function LoaderProvider({ children }: LoaderProviderProps) {
	const [loaderIsVisible, setLoaderIsVisible] = useState(initialValue.loaderIsVisible)

	const memoizedSetLoaderIsVisible = useCallback((visibility: boolean) => {
		setLoaderIsVisible(visibility)
	}, [])

	const loaderDataProvider = useMemo(() => ({
		loaderIsVisible,
		setLoaderIsVisible: memoizedSetLoaderIsVisible,
	}), [loaderIsVisible, memoizedSetLoaderIsVisible])

	return (
		<LoaderContext.Provider value={loaderDataProvider}>
			{children}
			<LoaderModal visible={loaderIsVisible} closeModal={() => setLoaderIsVisible(false)} />
		</LoaderContext.Provider>
	)
}

export { LoaderProvider, LoaderContext }
