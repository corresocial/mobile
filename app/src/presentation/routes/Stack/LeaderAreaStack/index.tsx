import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { LeaderAreaProvider } from '@contexts/LeaderAreaContext'

import { LeaderAreaStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { LeaderAreaHome } from '@screens/leaderAreaScreens/LeaderAreaHome'
import { PollPetitionArea } from '@screens/leaderAreaScreens/PollPetitionArea'
import { ViewApproveProfile } from '@screens/leaderAreaScreens/ViewApproveProfile'
import { ViewPetitionList } from '@screens/leaderAreaScreens/ViewPetitionList'
import { ViewPollList } from '@screens/leaderAreaScreens/ViewPollList'
import { ViewUnapprovedPost } from '@screens/leaderAreaScreens/ViewUnapprovedPost'
import { ViewUnapprovedRegistersList } from '@screens/leaderAreaScreens/ViewUnapprovedRegistersList'
import { Profile } from '@screens/profileScreens/Profile'
import { ViewCulturePost } from '@screens/viewPostScreens/ViewCulturePost'
import { ViewIncomePost } from '@screens/viewPostScreens/ViewIncomePost'
import { ViewSocialImpactPost } from '@screens/viewPostScreens/ViewSocialImpactPost'
import { ViewVacancyPost } from '@screens/viewPostScreens/ViewVacancyPost'

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
				<Stack.Screen name={'ViewApproveProfile'} component={ViewApproveProfile as any} />
				<Stack.Screen name={'ViewUnapprovedRegistersList'} component={ViewUnapprovedRegistersList} />

				{/* TODO Type */}
				<Stack.Screen name={'ProfileLeaderArea'} component={Profile as any} />
				<Stack.Screen name={'ViewIncomePostLeaderArea'} component={ViewIncomePost as any} />
				<Stack.Screen name={'ViewVacancyPostLeaderArea'} component={ViewVacancyPost as any} />
				<Stack.Screen name={'ViewSocialImpactPostLeaderArea'} component={ViewSocialImpactPost as any} />
				<Stack.Screen name={'ViewCulturePostLeaderArea'} component={ViewCulturePost as any} />
			</Stack.Navigator>
		</LeaderAreaProvider>
	)
}
