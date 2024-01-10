import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { SmasProvider } from '@contexts/SmasContext'

import { PublicServiceStackParamList } from './types'

import { InsertNameNIS } from '@screens/publicServicesScreens/InsertNameNIS'
import { InsertNIS } from '@screens/publicServicesScreens/InsertNIS'
import { QueryResult } from '@screens/publicServicesScreens/QueryResult'
import { SelectNISQueryData } from '@screens/publicServicesScreens/SelectNISQueryData'
import { SelectPublicService } from '@screens/publicServicesScreens/SelectPublicService'

const Stack = createStackNavigator<PublicServiceStackParamList>()

export function PublicServicesStack({ route }: any) {
	return (
		<SmasProvider>
			<Stack.Navigator
				initialRouteName={'SelectPublicService'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'SelectPublicService'} component={SelectPublicService} />
				<Stack.Screen name={'QueryResult'} component={QueryResult} />
				<Stack.Screen name={'InsertNIS'} component={InsertNIS} />
				<Stack.Screen name={'InsertNameNIS'} component={InsertNameNIS} />
				<Stack.Screen name={'SelectNISQueryData'} component={SelectNISQueryData} />
			</Stack.Navigator>
		</SmasProvider>
	)
}
