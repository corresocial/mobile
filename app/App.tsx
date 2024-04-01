/* eslint-disable no-undef */
import 'react-native-gesture-handler'
import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, LogBox } from 'react-native'
import { ThemeProvider } from 'styled-components'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Sentry from 'sentry-expo'

import { CacheRepositoryAdapter } from '@data/cache/CacheRepositoryAdapter'

import { LoaderContainer } from './App.styles'
import { ignoredLogs } from './ignoredLogs'
import { AlertProvider } from './src/contexts/AlertContext/index'
import { LoaderProvider } from './src/contexts/LoaderContext'
import { getEnvVars } from './src/infrastructure/environment'
import { theme } from './src/presentation/common/theme'
import { AuthRegisterStack } from './src/presentation/routes/Stack/AuthRegisterStack'
import { sentryConfig } from './src/services/sentry'

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

	const { defaultCachePersistence } = CacheRepositoryAdapter()
	const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: defaultCachePersistence, gcTime: defaultCachePersistence } } })

	return (
		<NavigationContainer>
			<ThemeProvider theme={theme}>
				<AlertProvider>
					<LoaderProvider>
						<QueryClientProvider client={queryClient}>
							<AuthRegisterStack />
						</QueryClientProvider>
					</LoaderProvider>
				</AlertProvider>
			</ThemeProvider>
		</NavigationContainer>
	)
}

// eslint-disable-next-line import/no-default-export
export default Sentry.Native.wrap(App)
