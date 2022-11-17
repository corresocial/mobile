import 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, LogBox, View } from 'react-native';
import React, { useEffect } from 'react';
import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo';
import { theme } from './src/common/theme';

import { AuthRegisterStack } from './src/routes/Stack/AuthRegisterStack';
import { ignoredLogs } from './ignoredLogs';
import { LoaderProvider } from './src/contexts/LoaderContext';

export default function App() {

	const [fontsLoaded]: boolean[] = useFonts({ Arvo_400Regular, Arvo_700Bold });

	useEffect(() => {
		LogBox.ignoreLogs(ignoredLogs)
	})

	if (!fontsLoaded) return ( // Temporary
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator size={'large'} color={theme.orange3} />
		</View>
	)

	return (
			<NavigationContainer>
			<ThemeProvider theme={theme}>
				<LoaderProvider>
					<AuthRegisterStack />
				</LoaderProvider>
			</ThemeProvider>
		</NavigationContainer>
	);
}


