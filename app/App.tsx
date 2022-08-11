import 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo';

import { Splash } from './src/screens/Splash';
import { theme } from './src/common/theme';
import { AuthRegisterStack } from './src/routes/Stack/AuthRegisterStack';
import { ActivityIndicator } from 'react-native';

export default function App() {

	const [fontsLoaded]: boolean[] = useFonts({ Arvo_400Regular, Arvo_700Bold });

	if(!fontsLoaded) return <ActivityIndicator size={'large'}/> // TODO Temporary
	
	return (
		<NavigationContainer>
			<ThemeProvider theme={theme}>
				<AuthRegisterStack />
			</ThemeProvider>
		</NavigationContainer>
	);
}


