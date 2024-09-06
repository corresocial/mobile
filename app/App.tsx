import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { createURL } from 'expo-linking'
import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import { ActivityIndicator, LogBox } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { sendEvent } from '@newutils/methods/analyticsEvents'
import * as Sentry from '@sentry/react-native'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { LoaderContainer } from 'App.styles'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'

import { startSentry } from '@infrastructure/sentry'
import { errorBoundaryHandler } from '@utils/errorBoundaryHandler'

import { appFonts } from '@assets/fonts/appFonts'

import { ErrorBoundaryFallback } from '@screens/ErrorBoundaryFallback'

import { ignoredLogs } from './ignoredLogs'
import { AlertProvider } from './src/contexts/AlertContext/index'
import { LoaderProvider } from './src/contexts/LoaderContext'
import { theme } from './src/presentation/common/theme'
import { AuthRegisterStack } from './src/presentation/routes/Stack/AuthRegisterStack'

LogBox.ignoreLogs(ignoredLogs)

startSentry()
sendEvent('opened_app', {}, true)

SplashScreen.preventAutoHideAsync()

function App() {
	// CURRENT
	// const [fontsLoaded] = useFonts(appFonts)

	const routeNameRef = React.useRef<string>()
	const navigationRef = React.useRef<any>()

	// if (!fontsLoaded) {
	// 	return (
	// 		<LoaderContainer style={{ backgroundColor: theme.colors.orange[3] }}>
	// 			<ActivityIndicator size={'large'} color={theme.colors.orange[4]} />
	// 		</LoaderContainer>
	// 	)
	// }

	const { defaultCachePersistence } = useCacheRepository()
	const linking = {
		prefixes: [createURL('', { scheme: 'com.corresocial.corresocial' }), createURL('', { scheme: 'corre' })],
		config: {
			screens: {
				Splash: {
					path: 'redirect/:screen/:id/:postType?'
				}
			},
		},
	}

	const asyncStoragePersister = createAsyncStoragePersister({ storage: AsyncStorage })
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: defaultCachePersistence,
				gcTime: defaultCachePersistence,
			},
		}
	})

	return (
		<Sentry.ErrorBoundary
			fallback={ErrorBoundaryFallback}
			onError={errorBoundaryHandler}
		>
			<NavigationContainer
				ref={navigationRef}
				linking={linking}
				onReady={() => {
					routeNameRef.current = navigationRef.current.getCurrentRoute().name
				}}
				onStateChange={() => {
					const previousRouteName = routeNameRef.current
					const currentRouteName = navigationRef.current.getCurrentRoute().name
					if (previousRouteName !== currentRouteName) {
						sendEvent('user_opened_screen', { screenName: currentRouteName })
					}
					routeNameRef.current = currentRouteName
				}}
			>
				<ThemeProvider theme={theme}>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<BottomSheetModalProvider>
							<AlertProvider>
								<LoaderProvider>
									<PersistQueryClientProvider
										client={queryClient}
										persistOptions={{ persister: asyncStoragePersister }}
									>
										<AuthRegisterStack />
									</PersistQueryClientProvider>
								</LoaderProvider>
							</AlertProvider>
						</BottomSheetModalProvider>
					</GestureHandlerRootView>
				</ThemeProvider>
			</NavigationContainer >
		</Sentry.ErrorBoundary>
	)
}

// eslint-disable-next-line import/no-default-export
export default Sentry.wrap(App)
