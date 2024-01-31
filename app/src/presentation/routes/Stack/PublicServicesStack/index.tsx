import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { SmasProvider } from '@contexts/SmasContext'

import { PublicServiceStackParamList } from './types'

import { InsertMotherNameNIS } from '@screens/smasScreens/InserMotherNameNIS'
import { InsertAnonymizedCpfNIS } from '@screens/smasScreens/InsertAnonymizedCpfNIS'
import { InsertNameNIS } from '@screens/smasScreens/InsertNameNIS'
import { InsertNIS } from '@screens/smasScreens/InsertNIS'
import { InsertDateOfBirthNIS } from '@screens/smasScreens/InsetDateOfBirthNIS'
import { QueryBeeByNISResult } from '@screens/smasScreens/QueryBeeByNISResult'
import { QueryCadunicoByNISResult } from '@screens/smasScreens/QueryCadunicoByNISResult'
import { QueryNISResult } from '@screens/smasScreens/QueryNISResult'
import { QueryPbfByNISResult } from '@screens/smasScreens/QueryPbfByNISResult'
import { SelectNISQueryData } from '@screens/smasScreens/SelectNISQueryData'
import { SelectPublicService } from '@screens/smasScreens/SelectPublicService'

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
				<Stack.Screen name={'InsertNIS'} component={InsertNIS} />
				<Stack.Screen name={'InsertNameNIS'} component={InsertNameNIS} />
				<Stack.Screen name={'SelectNISQueryData'} component={SelectNISQueryData} />
				<Stack.Screen name={'InsertMotherNameNIS'} component={InsertMotherNameNIS} />
				<Stack.Screen name={'InsertDateOfBirthNIS'} component={InsertDateOfBirthNIS} />
				<Stack.Screen name={'InsertAnonymizedCpfNIS'} component={InsertAnonymizedCpfNIS} />
				<Stack.Screen name={'QueryNISResult'} component={QueryNISResult} />
				<Stack.Screen name={'QueryBeeByNISResult'} component={QueryBeeByNISResult} />
				<Stack.Screen name={'QueryPbfByNISResult'} component={QueryPbfByNISResult} />
				<Stack.Screen name={'QueryCadunicoByNISResult'} component={QueryCadunicoByNISResult} />
			</Stack.Navigator>
		</SmasProvider>
	)
}
