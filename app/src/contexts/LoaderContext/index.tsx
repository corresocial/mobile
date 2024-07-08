import React, { createContext, useMemo, useState, useCallback, useContext } from 'react'
import { View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { LoaderContextType, LoaderProviderProps } from './types'

import { Loader } from '@components/Loader'

import { relativeScreenHeight, relativeScreenWidth } from '../../presentation/common/screenDimensions'

const initialValue: LoaderContextType = {
	loaderIsVisible: false,
	setLoaderIsVisible: () => { },
}

const LoaderContext = createContext<LoaderContextType>(initialValue)

function LoaderProvider({ children }: LoaderProviderProps) {
	const [loaderIsVisible, setLoaderIsVisible] = useState(initialValue.loaderIsVisible)

	const getLoaderYAxisCenter = useCallback(() => relativeScreenHeight(50) - (RFValue(loaderScale) / 2), [loaderIsVisible])
	const getLoaderXAxisCenter = useCallback(() => relativeScreenWidth(50) - (RFValue(loaderScale) / 2), [loaderIsVisible])

	const loaderScale = 70
	const loaderYAxisCenter = getLoaderYAxisCenter()
	const loaderXAxisCenter = getLoaderXAxisCenter()

	const setLoaderModalIsVisible = useCallback((visibility: boolean) => {
		setLoaderIsVisible(visibility)
	}, [])

	const loaderDataProvider = useMemo(() => ({
		loaderIsVisible,
		setLoaderIsVisible: setLoaderModalIsVisible,
	}), [loaderIsVisible, setLoaderModalIsVisible])

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

const useLoaderContext = () => useContext(LoaderContext)

export { LoaderProvider, useLoaderContext, LoaderContext }
