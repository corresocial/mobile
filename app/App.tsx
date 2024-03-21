/* eslint-disable no-undef */
import 'react-native-gesture-handler'
import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo'
import { NavigationContainer } from '@react-navigation/native'
import { createURL } from 'expo-linking'
import React from 'react'
import { ActivityIndicator, LogBox } from 'react-native'
import { ThemeProvider } from 'styled-components'

import * as Sentry from 'sentry-expo'

import { LoaderContainer } from './App.styles'
import { ignoredLogs } from './ignoredLogs'
import { AlertProvider } from './src/contexts/AlertContext/index'
import { LoaderProvider } from './src/contexts/LoaderContext'
import { getEnvVars } from './src/infrastructure/environment'
import { theme } from './src/presentation/common/theme'
import { ErrorBoundaryContainer } from './src/presentation/components/_containers/ErrorBoundaryContainer'
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

	const linking = {
		prefixes: [createURL('/com.corresocial.corresocial')],
		config: {
			screens: {
				Splash: {
					path: 'redirect/:screen/:id/:postType?'
				}
			},
		},
	}

	return (
		<ErrorBoundaryContainer>
			<NavigationContainer linking={linking}>
				<ThemeProvider theme={theme}>
					<AlertProvider>
						<LoaderProvider>
							<AuthRegisterStack />
						</LoaderProvider>
					</AlertProvider>
				</ThemeProvider>
			</NavigationContainer>
		</ErrorBoundaryContainer>
	)
}

// eslint-disable-next-line import/no-default-export
export default Sentry.Native.wrap(App)
