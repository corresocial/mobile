import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

// import { PollRegisterProvider } from '@contexts/PollRegisterContext'

import { LeaderAreaStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { LeaderAreaHome } from '@screens/leaderAreaScreens/LeaderAreaHome'
import { PollPetitionArea } from '@screens/leaderAreaScreens/PollPetitionArea'
import { ViewPetitionList } from '@screens/leaderAreaScreens/ViewPetitionList'
import { ViewPollList } from '@screens/leaderAreaScreens/ViewPollList'
import { ViewUnapprovedPost } from '@screens/leaderAreaScreens/ViewUnapprovedPost'

const Stack = createStackNavigator<LeaderAreaStackParamList>()

export function LeaderAreaStack({ route, navigation }: any) {
	useHomeTabDisplay<'ProfileStack', LeaderAreaStackParamList>({
		navigation,
		route,
		screens: ['LeaderAreaHome', 'PollPetitionArea'],
	})

	return (
		// <PollRegisterProvider>
		<Stack.Navigator
			initialRouteName={'LeaderAreaHome'}
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<Stack.Screen name={'LeaderAreaHome'} component={LeaderAreaHome} />
			<Stack.Screen name={'PollPetitionArea'} component={PollPetitionArea} />
			<Stack.Screen name={'ViewPollList'} component={ViewPollList} />
			<Stack.Screen name={'ViewPetitionList'} component={ViewPetitionList} />

			{/* REFACTOR Mostar sem bottom tabs e na rota de stack */}
			<Stack.Screen name={'ViewUnapprovedPost'} component={ViewUnapprovedPost} />
		</Stack.Navigator>
		// </PollRegisterProvider>
	)
}
