import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { LeaderAreaProvider } from '@contexts/LeaderAreaContext'

import { LeaderAreaStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { LeaderAreaHome } from '@screens/leaderAreaScreens/LeaderAreaHome'
import { PollPetitionArea } from '@screens/leaderAreaScreens/PollPetitionArea'
import { SearchProfile } from '@screens/leaderAreaScreens/SearchProfile'
import { ViewPetitionList } from '@screens/leaderAreaScreens/ViewPetitionList'
import { ViewPollList } from '@screens/leaderAreaScreens/ViewPollList'
import { ViewUnapprovedPost } from '@screens/leaderAreaScreens/ViewUnapprovedPost'
import { ViewUnapprovedProfile } from '@screens/leaderAreaScreens/ViewUnapprovedProfile'
import { ViewUnapprovedRegistersList } from '@screens/leaderAreaScreens/ViewUnapprovedRegistersList'
import { Profile } from '@screens/profileScreens/Profile'

import { CitizenRegistrationStack } from '../CitizenRegistrationStack'

const Stack = createStackNavigator<LeaderAreaStackParamList>()

export function LeaderAreaStack({ route, navigation }: any) {
	useHomeTabDisplay<'ProfileStack', LeaderAreaStackParamList>({
		navigation,
		route,
		screens: ['LeaderAreaHome', 'PollPetitionArea'],
	})

	return (
		<LeaderAreaProvider>
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

				<Stack.Screen name={'ViewUnapprovedPost'} component={ViewUnapprovedPost} />
				<Stack.Screen name={'ViewUnapprovedProfile'} component={ViewUnapprovedProfile as any} />
				<Stack.Screen name={'ViewUnapprovedRegistersList'} component={ViewUnapprovedRegistersList} />

				{/* TODO Type */}
				<Stack.Screen name={'ProfileLeaderArea'} component={Profile as any} />

				<Stack.Screen name={'CitizenRegistrationArea'} component={CitizenRegistrationStack} />
			</Stack.Navigator>
		</LeaderAreaProvider>
	)
}
