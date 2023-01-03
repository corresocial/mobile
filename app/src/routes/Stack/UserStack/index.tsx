import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { UserStackParamList } from './types'

import { StateProvider } from '../../../contexts/StateContext'

import { WelcomeNewUser } from '../../../screens/homeScreens/WelcomeNewUser'
import { SelectPostType } from '../../../screens/homeScreens/SelectPostType'
import { HomeTab } from '../../Tabs/HomeTab'
import { ServiceStack } from '../ServiceStack'
import { SaleStack } from '../SaleStack'
import { VacancyStack } from '../VacancyStack'
import { SocialImpactStack } from '../SocialImpactStack'
import { CultureStack } from '../CultureStack'
import { EditProfile } from '../../../screens/homeScreens/EditProfile'
import { EditUserName } from '../../../screens/homeScreens/EditUserName'
import { EditUserDescription } from '../../../screens/homeScreens/EditUserDescription'
import { EditUserPicture } from '../../../screens/homeScreens/EditUserPicture'
import { SocialMediaManagement } from '../../../screens/homeScreens/SocialMediaManagement'
import { InsertLinkTitle } from '../../../screens/homeScreens/InsertLinkTitle'
import { InsertLinkValue } from '../../../screens/homeScreens/InsertLinkValue'
import { Configurations } from '../../../screens/homeScreens/Configurations'

const Stack = createStackNavigator<UserStackParamList>()

export function UserStack({ route }: any) {
	const tourPerformed = (route.params && route.params.tourPerformed) || false

	return (
		<StateProvider>
			<Stack.Navigator
				initialRouteName={tourPerformed ? 'HomeTab' : 'WelcomeNewUser'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} />
				<Stack.Screen name={'HomeTab'} component={HomeTab} />
				<Stack.Screen name={'SelectPostType'} component={SelectPostType} />
				<Stack.Screen name={'ServiceStack'} component={ServiceStack} />
				<Stack.Screen name={'SaleStack'} component={SaleStack} />
				<Stack.Screen name={'VacancyStack'} component={VacancyStack} />
				<Stack.Screen name={'CultureStack'} component={CultureStack} />
				<Stack.Screen name={'SocialImpactStack'} component={SocialImpactStack} />
				<Stack.Screen name={'EditProfile'} component={EditProfile} />
				<Stack.Screen name={'EditUserName'} component={EditUserName} />
				<Stack.Screen name={'EditUserDescription'} component={EditUserDescription} />
				<Stack.Screen name={'EditUserPicture'} component={EditUserPicture} />
				<Stack.Screen name={'SocialMediaManagement'} component={SocialMediaManagement} />
				<Stack.Screen name={'InsertLinkTitle'} component={InsertLinkTitle} />
				<Stack.Screen name={'InsertLinkValue'} component={InsertLinkValue} />
				<Stack.Screen name={'Configurations'} component={Configurations} />
			</Stack.Navigator>
		</StateProvider>
	)
}
