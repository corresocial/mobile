import React, { createContext, useMemo, useState, useCallback } from 'react'
import { View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Loader } from '@components/Loader'

import { relativeScreenHeight, relativeScreenWidth } from '../presentation/common/screenDimensions'

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

	const loaderScale = 70
	const loaderYAxisCenter = relativeScreenHeight(50) - (RFValue(loaderScale) / 2)
	const loaderXAxisCenter = relativeScreenWidth(50) - (RFValue(loaderScale) / 2)

	return (
		<LoaderContext.Provider value={loaderDataProvider}>
			<View style={{ flex: 1, position: 'relative' }}>
				{children}
				{
					loaderIsVisible && (
						<View style={{
							position: 'absolute',
							top: loaderYAxisCenter,
							left: loaderXAxisCenter
						}}
						>
							<Loader animationScale={loaderScale} />
						</View>
					)
				}
			</View>
		</LoaderContext.Provider>
	)
}

export { LoaderProvider, LoaderContext }
