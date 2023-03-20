import 'react-native-gesture-handler'
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

LogBox.ignoreLogs(ignoredLogs)

function App() {
	const [fontsLoaded]: boolean[] = useFonts({
		Arvo_400Regular, Arvo_700Bold
	})

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
		// <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={errorHandler}>
		<NavigationContainer>
			<ThemeProvider theme={theme}>
				<LoaderProvider>
					<AuthRegisterStack />
				</LoaderProvider>
			</ThemeProvider>
		</NavigationContainer>
		// </ErrorBoundary>
	)
}

// eslint-disable-next-line import/no-default-export
export default App
