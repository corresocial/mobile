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
		prefixes: ['exp://192.168.1.100:8081/--/com.corresocial.corresocial'], // Substitua pelo seu prefixo
		config: {
			screens: {
				Splash: {
					path: 'redirect/:screen/:id'
				}
			},
		},
	}

	/* useEffect(() => {
		const redirectURL = useURL()
		const url = createURL('profile', {})
		console.log('URL => ', url)
		console.log('REDIRECT =>', redirectURL)
	}, [])
 */
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
