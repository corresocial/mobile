import 'react-native-gesture-handler'
import * as Sentry from 'sentry-expo'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, LogBox, View } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'

import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo'
import { theme } from './src/common/theme'

import { AuthRegisterStack } from './src/routes/Stack/AuthRegisterStack'
import { LoaderProvider } from './src/contexts/LoaderContext'
import { ErrorBoundaryFallback } from './src/screens/ErrorBoundaryFallback'
import { errorHandler } from './src/utils/errorHandler'
import { ignoredLogs } from './ignoredLogs'

Sentry.init({
	dsn: 'https://e75bbf5cd26e44a6a43c7a9098b5f65e@o4504849825005568.ingest.sentry.io/4504849830641664',
	enableInExpoDevelopment: true,
	debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
	enableNative: true
})

LogBox.ignoreLogs(ignoredLogs)

function App() {
	const [fontsLoaded]: boolean[] = useFonts({
		Arvo_400Regular, Arvo_700Bold
	})

	setTimeout(() => {
		console.log('lauchError')
		Sentry.Native.captureException(new Error('teste sentry'))
		Sentry.Native.captureEvent(new Error('teste sentry'))
	}, 20000)

	if (!fontsLoaded) {
		return (
			<View style={{
				flex: 1, alignItems: 'center', justifyContent: 'center'
			}}
			>
				<ActivityIndicator size={'large'} color={theme.orange3} />
			</View>
		)
	}

	return (
		<ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={errorHandler}>
			<NavigationContainer>
				<ThemeProvider theme={theme}>
					<LoaderProvider>
						<AuthRegisterStack />
					</LoaderProvider>
				</ThemeProvider>
			</NavigationContainer>
		</ErrorBoundary>
	)
}

// eslint-disable-next-line import/no-default-export
export default App
