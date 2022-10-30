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
import { AuthContext, authentication } from './src/contexts/AuthContext';
import { ServiceContext, serviceContext } from './src/contexts/ServiceContext';

export default function App() {

	const [fontsLoaded]: boolean[] = useFonts({ Arvo_400Regular, Arvo_700Bold });

	useEffect(() => {
		LogBox.ignoreLogs([`AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage
		at node_modules\expo\build\environment\react-native-logs.fx.js:18:4 in warn
		at node_modules\react-native\Libraries\Utilities\warnOnce.js:27:2 in warnOnce
		at node_modules\react-native\index.js:273:12 in module.exports.get__AsyncStorage
		at node_modules\@firebase\auth\dist\rn\index.js:164:43 in getReactNativePersistence$argument_0.setItem
		at node_modules\@firebase\auth\dist\rn\index.js:77:53 in tslib.__generator$argument_1
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:144:21 in step
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:125:60 in <anonymous>
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:118:17 in <anonymous>
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:45:6 in tryCallTwo
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:200:22 in doResolve
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:66:11 in Promise
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:114:15 in __awaiter
		at node_modules\@firebase\auth\dist\rn\phone-eec7f987.js:2097:69 in tslib.__generator$argument_1
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:144:21 in step
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:125:60 in <anonymous>
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:118:17 in <anonymous>
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:45:6 in tryCallTwo
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:200:22 in doResolve
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:66:11 in Promise
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:114:15 in __awaiter
		at node_modules\@firebase\auth\dist\rn\phone-eec7f987.js:2094:57 in tslib.__generator$argument_1
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:144:21 in step
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:125:60 in <anonymous>
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:118:17 in <anonymous>
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:45:6 in tryCallTwo
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:200:22 in doResolve
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:66:11 in Promise
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:114:15 in __awaiter
		at node_modules\@firebase\auth\dist\rn\phone-eec7f987.js:2434:45 in tslib.__generator$argument_1
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:144:21 in step
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:125:60 in <anonymous>
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:118:17 in <anonymous>
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:45:6 in tryCallTwo
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:200:22 in doResolve
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:66:11 in Promise
		at node_modules\@firebase\auth\node_modules\tslib\tslib.js:114:15 in __awaiter
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:37:13 in tryCallOne
		at node_modules\react-native\node_modules\promise\setimmediate\core.js:123:24 in setImmediate$argument_0
		at node_modules\react-native\Libraries\Core\Timers\JSTimers.js:248:12 in _allocateCallback$argument_0
		at node_modules\react-native\Libraries\Core\Timers\JSTimers.js:112:14 in _callTimer
		at node_modules\react-native\Libraries\Core\Timers\JSTimers.js:162:14 in _callReactNativeMicrotasksPass
		at node_modules\react-native\Libraries\Core\Timers\JSTimers.js:413:41 in callReactNativeMicrotasks
		at node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:391:6 in __callReactNativeMicrotasks
		at node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:133:6 in __guard$argument_0
		at node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:368:10 in __guard
		at node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:132:4 in flushedQueue`]);
	})

	if (!fontsLoaded) return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator size={'large'} color={theme.orange3} />
		</View>
	) 

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


