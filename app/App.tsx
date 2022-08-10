import { View, Text } from 'react-native';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import {
	useFonts,
	Arvo_400Regular,
	Arvo_700Bold,
} from '@expo-google-fonts/arvo';

import { Splash } from './src/screens/Splash';
import { theme } from './src/commonStyles/theme/theme';

export default function App() {

	const [fontsLoaded]: boolean[] = useFonts({ Arvo_400Regular, Arvo_700Bold });

	return (
		<ThemeProvider theme={theme}>
			{
				fontsLoaded
					? <Splash />
					: <View><Text>Welcome</Text></View>
			}
		</ThemeProvider>

	);
}


