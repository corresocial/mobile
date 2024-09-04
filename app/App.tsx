/* eslint-disable camelcase */
/* eslint-disable no-undef */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createURL } from 'expo-linking'
import React from 'react'
import { LogBox } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components'

import Aptabase from '@aptabase/react-native'
import { APTABASE_APP_KEY, APTABASE_HOST } from '@env'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { sendEvent } from '@newutils/methods/analyticsEvents'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'

import { ignoredLogs } from './ignoredLogs'
import { AlertProvider } from './src/contexts/AlertContext/index'
import { LoaderProvider } from './src/contexts/LoaderContext'
import { theme } from './src/presentation/common/theme'
import { AuthRegisterStack } from './src/presentation/routes/Stack/AuthRegisterStack'

LogBox.ignoreLogs(ignoredLogs)

// CURRENT
// const startSentry = () => {
// 	console.log(`Dev Mode: ${__DEV__}`)
// 	if (!__DEV__ && ENVIRONMENT !== 'dev') {
// 		Sentry.init(sentryConfig)
// 	}
// }

// startSentry()

Aptabase.init(APTABASE_APP_KEY, { host: APTABASE_HOST })

sendEvent('opened_app', {}, true)

function App() {
	// CURRENT
	// const [fontsLoaded]: boolean[] = useFonts({
	// 	Arvo_400Regular,
	// 	Arvo_700Bold,
	// 	Nunito_600SemiBold,
	// 	Nunito_700Bold
	// })

	const routeNameRef = React.useRef<string>()
	const navigationRef = React.useRef<any>()

	// CURRENT
	// const fontsLoaded = true
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
	)
}

// eslint-disable-next-line import/no-default-export
export default App
// export default Sentry.Native.wrap(App)
