/* eslint-disable no-undef */
import 'react-native-gesture-handler'
import * as Sentry from 'sentry-expo'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, LogBox, View } from 'react-native'

import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo'
import { theme } from './src/common/theme'

import { ignoredLogs } from './ignoredLogs'
import { sentryConfig } from './src/services/sentry'

import { AuthRegisterStack } from './src/routes/Stack/AuthRegisterStack'
import { LoaderProvider } from './src/contexts/LoaderContext'
import { ErrorBoundaryContainer } from './src/components/_containers/ErrorBoundaryContainer'

if (!__DEV__) {
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
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
				<ActivityIndicator size={'large'} color={theme.orange3} />
			</View>
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
