import 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo';

import { theme } from './src/common/theme';
import { AuthRegisterStack } from './src/routes/Stack/AuthRegisterStack';
import { AuthContext, authentication } from './src/contexts/AuthContext';
import { ServiceContext, serviceContext } from './src/contexts/ServiceContext';

export default function App() {

	const [fontsLoaded]: boolean[] = useFonts({ Arvo_400Regular, Arvo_700Bold });

	if (!fontsLoaded) return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator size={'large'} color={theme.orange3} />
		</View>
	) // TODO Temporary

	return (
		<NavigationContainer>
			<ThemeProvider theme={theme}>
				<AuthContext.Provider value={authentication}>
					<AuthRegisterStack />
				</AuthContext.Provider>
			</ThemeProvider>
		</NavigationContainer>
	);
}


