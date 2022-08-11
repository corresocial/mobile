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
import { theme } from './src/commonStyles/theme/theme';
import { AuthRegisterStack } from './src/routes/Stack/AuthRegisterStack';

export default function App() {

	const [fontsLoaded]: boolean[] = useFonts({ Arvo_400Regular, Arvo_700Bold });

	return (
		<NavigationContainer>
			<ThemeProvider theme={theme}>
				{/* {
					fontsLoaded
						? <Splash />
						: <View><Text>Welcome</Text></View>
				} */}
				<AuthRegisterStack/>
			</ThemeProvider>
		</NavigationContainer>
	);
}


