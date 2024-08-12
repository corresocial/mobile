import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { StateProvider } from '@contexts/StateContext'

import { ProfileStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { Configurations } from '@screens/configurationScreens/Configurations'
import { ContactUs } from '@screens/configurationScreens/ContactUs'
import { ContactUsInsertMessage } from '@screens/configurationScreens/ContactUsInsertMessage'
import { ContactUsSuccess } from '@screens/configurationScreens/ContactUsSuccess'
import { EntryMethodManagement } from '@screens/configurationScreens/EntryMethodManagement'
import { HelpUs } from '@screens/configurationScreens/HelpUs'
import { InsertCellNumberLinkAccount } from '@screens/configurationScreens/InsertCellNumberLinkAccount'
import { InsertConfirmationCodeLinkAccount } from '@screens/configurationScreens/InsertConfirmationCodeLinkAccount'
import { LinkingAccountResult } from '@screens/configurationScreens/LinkingAccountResult'
import { NotificationPublicServicesSettings } from '@screens/configurationScreens/NotificationPublicServicesSettings'
import { NotificationSettings } from '@screens/configurationScreens/NotificationtSettings'
import { PrivacyAndSecurity } from '@screens/configurationScreens/PrivacyAndSecurity'
import { UserDataConfigurations } from '@screens/configurationScreens/UserDataConfigurations'
import { ViewCompletedPosts } from '@screens/configurationScreens/ViewCompletedPosts'
import { WhoWeAre } from '@screens/configurationScreens/WhoWeAre'
import { WhoWeAreCulture } from '@screens/configurationScreens/WhoWeAreCulture'
import { WhoWeAreIncome } from '@screens/configurationScreens/WhoWeAreIncome'
import { WhoWeAreTransformation } from '@screens/configurationScreens/WhoWeAreTransformation'
import { EditCulturePost } from '@screens/editPostScreens/EditCulturePost'
import { EditSocialImpactPost } from '@screens/editPostScreens/EditSocialImpactPost'
import { IncomePostReview } from '@screens/editPostScreens/IncomePostReview'
import { EditProfile } from '@screens/profileScreens/EditProfile'
import { EditUserDescription } from '@screens/profileScreens/EditUserDescription'
import { EditUserLocation } from '@screens/profileScreens/EditUserLocation'
import { EditUserName } from '@screens/profileScreens/EditUserName'
import { EditUserPicture } from '@screens/profileScreens/EditUserPicture'
import { InsertLinkTitle } from '@screens/profileScreens/InsertLinkTitle'
import { InsertLinkValue } from '@screens/profileScreens/InsertLinkValue'
import { Profile } from '@screens/profileScreens/Profile'
import { SocialMediaManagement } from '@screens/profileScreens/SocialMediaManagement'
import { PostView } from '@screens/viewPostScreens/PostView'

const Stack = createStackNavigator<ProfileStackParamList>()

export function ProfileStack({ route, navigation }: any) { // REFACTOR type route
	useHomeTabDisplay<'ProfileStack', ProfileStackParamList>({
		navigation,
		route,
		screens: ['Profile'],
	})

	return (
		<StateProvider>
			<Stack.Navigator
				initialRouteName={'Profile'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'Profile'} component={Profile} />
				{/* // REFACTOR usar estratégia de tipagem dinâmica */}
				<Stack.Screen name={'PostViewProfile'} component={PostView as any} />
				{/* REFACTOR Erro de tipagem, typecasting? */}
				<Stack.Screen name={'IncomePostReview'} component={IncomePostReview as any} />
				<Stack.Screen name={'EditSocialImpactPost'} component={EditSocialImpactPost as any} />
				<Stack.Screen name={'EditCulturePost'} component={EditCulturePost as any} />

				<Stack.Screen name={'EditProfile'} component={EditProfile} />
				<Stack.Screen name={'EditUserName'} component={EditUserName} />
				<Stack.Screen name={'EditUserDescription'} component={EditUserDescription} />
				<Stack.Screen name={'EditUserLocation'} component={EditUserLocation} />
				<Stack.Screen name={'EditUserPicture'} component={EditUserPicture} />
				<Stack.Screen name={'SocialMediaManagement'} component={SocialMediaManagement} />
				<Stack.Screen name={'InsertLinkTitle'} component={InsertLinkTitle} />
				<Stack.Screen name={'InsertLinkValue'} component={InsertLinkValue} />

				<Stack.Screen name={'Configurations'} component={Configurations} />
				<Stack.Screen name={'ViewCompletedPosts'} component={ViewCompletedPosts} />
				<Stack.Screen name={'EntryMethodManagement'} component={EntryMethodManagement} />
				<Stack.Screen name={'InsertCellNumberLinkAccount'} component={InsertCellNumberLinkAccount} />
				<Stack.Screen name={'InsertConfirmationCodeLinkAccount'} component={InsertConfirmationCodeLinkAccount} />
				<Stack.Screen name={'LinkingAccountResult'} component={LinkingAccountResult} />
				<Stack.Screen name={'WhoWeAre'} component={WhoWeAre} />
				<Stack.Screen name={'WhoWeAreIncome'} component={WhoWeAreIncome} />
				<Stack.Screen name={'WhoWeAreCulture'} component={WhoWeAreCulture} />
				<Stack.Screen name={'WhoWeAreTransformation'} component={WhoWeAreTransformation} />
				<Stack.Screen name={'HelpUs'} component={HelpUs} />
				<Stack.Screen name={'ContactUs'} component={ContactUs} />
				<Stack.Screen name={'ContactUsInsertMessage'} component={ContactUsInsertMessage} />
				<Stack.Screen name={'ContactUsSuccess'} component={ContactUsSuccess} />
				<Stack.Screen name={'UserDataConfigurations'} component={UserDataConfigurations} />
				<Stack.Screen name={'PrivacyAndSecurity'} component={PrivacyAndSecurity} />
				<Stack.Screen name={'NotificationSettings'} component={NotificationSettings} />
				<Stack.Screen name={'NotificationPublicServicesSettings'} component={NotificationPublicServicesSettings} />

				<Stack.Screen name={'PostView'} component={PostView as any} />
			</Stack.Navigator>
		</StateProvider>
	)
}
