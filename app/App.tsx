/* eslint-disable no-undef */
import 'react-native-gesture-handler'
import { useFonts, Arvo_400Regular, Arvo_700Bold } from '@expo-google-fonts/arvo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createURL } from 'expo-linking'
import React from 'react'
import { ActivityIndicator, LogBox } from 'react-native'
import { ThemeProvider } from 'styled-components'

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import * as Sentry from 'sentry-expo'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'

import { LoaderContainer } from './App.styles'
import { ignoredLogs } from './ignoredLogs'
import { AlertProvider } from './src/contexts/AlertContext/index'
import { LoaderProvider } from './src/contexts/LoaderContext'
import { getEnvVars } from './src/infrastructure/environment'
import { sentryConfig } from './src/infrastructure/sentry'
import { theme } from './src/presentation/common/theme'
import { AuthRegisterStack } from './src/presentation/routes/Stack/AuthRegisterStack'

const { ENVIRONMENT } = getEnvVars()

LogBox.ignoreLogs(ignoredLogs)

const startSentry = () => {
	console.log(`Dev Mode: ${__DEV__}`)
	if (!__DEV__ && ENVIRONMENT !== 'dev') {
		Sentry.init(sentryConfig)
	}
}

startSentry()

function App() {
	const [fontsLoaded]: boolean[] = useFonts({
		Arvo_400Regular,
		Arvo_700Bold,
	})

	if (!fontsLoaded) {
		return (
			<LoaderContainer style={{ backgroundColor: theme.orange3 }}>
				<ActivityIndicator size={'large'} color={theme.orange4} />
			</LoaderContainer>
		)
	}

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
		<NavigationContainer linking={linking}>
			<ThemeProvider theme={theme}>
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
			</ThemeProvider>
		</NavigationContainer >
	)
}

// eslint-disable-next-line import/no-default-export
export default Sentry.Native.wrap(App)
