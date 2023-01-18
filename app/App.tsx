import 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, LogBox, View } from 'react-native'
import React from 'react'
import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo'
import { theme } from './src/common/theme'

import { AuthRegisterStack } from './src/routes/Stack/AuthRegisterStack'
import { LoaderProvider } from './src/contexts/LoaderContext'

function App() {
	const [fontsLoaded]: boolean[] = useFonts({
		Arvo_400Regular, Arvo_700Bold
	})

	// Do not working
	LogBox.ignoreLogs([
		'Warning: Async Storage has been extracted from react-native core',
		'ViewPropTypes will be removed from React Native.Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\''
	])
	LogBox.ignoreAllLogs()

	if (!fontsLoaded) {
		return ( // Temporary
			<View style={{
				flex: 1, alignItems: 'center', justifyContent: 'center'
			}}
			>
				<ActivityIndicator size={'large'} color={theme.orange3} />
			</View>
		)
	}

	return (
		<NavigationContainer>
			<ThemeProvider theme={theme}>
				<LoaderProvider>
					<AuthRegisterStack />
				</LoaderProvider>
			</ThemeProvider>
		</NavigationContainer>
	)
}

// eslint-disable-next-line import/no-default-export
export default App
