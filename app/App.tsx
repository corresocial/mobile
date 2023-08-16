/* eslint-disable no-undef */
import 'react-native-gesture-handler'
import * as Sentry from 'sentry-expo'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, LogBox } from 'react-native'

import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo'
import { ENVIRONMENT } from '@env'
import { theme } from './src/common/theme'

import { ignoredLogs } from './ignoredLogs'
import { sentryConfig } from './src/services/sentry'

import { AuthRegisterStack } from './src/routes/Stack/AuthRegisterStack'
import { LoaderProvider } from './src/contexts/LoaderContext'
import { ErrorBoundaryContainer } from './src/components/_containers/ErrorBoundaryContainer'
import { LoaderContainer } from './App.styles'

console.log(__DEV__)
if (!__DEV__ && ENVIRONMENT !== 'dev') {
	Sentry.init(sentryConfig)
}
LogBox.ignoreLogs(ignoredLogs)

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

	return (
		<ErrorBoundaryContainer>
			<NavigationContainer>
				<ThemeProvider theme={theme}>
					<LoaderProvider>
						<AuthRegisterStack />
					</LoaderProvider>
				</ThemeProvider>
			</NavigationContainer>
		</ErrorBoundaryContainer>
	)
}

// eslint-disable-next-line import/no-default-export
export default Sentry.Native.wrap(App)
