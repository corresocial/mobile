import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { ChatProvider } from '@contexts/ChatContext'
import { EditProvider } from '@contexts/EditContext'
import { LocationProvider } from '@contexts/LocationContext'
import { StateProvider } from '@contexts/StateContext'
import { StripeProvider } from '@contexts/StripeContext'
import { SubscriptionProvider } from '@contexts/SubscriptionContext'

import { UserStackParamList } from './types'

import { ChatMessages } from '@screens/chatScreens/ChatMessages'
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
import { EditSalePost } from '@screens/editPostScreens/EditSalePost'
import { EditServicePost } from '@screens/editPostScreens/EditServicePost'
import { EditSocialImpactPost } from '@screens/editPostScreens/EditSocialImpactPost'
import { EditVacancyPost } from '@screens/editPostScreens/EditVacancyPost'
import { SelectIncomeType } from '@screens/homeScreens/SelectIncomeType'
import { WelcomeNewUser } from '@screens/homeScreens/WelcomeNewUser'
import { EditCurrentSubscription } from '@screens/paymentSystemScreens/EditCurrentSubscription'
import { FinishSubscriptionPaymentByCard } from '@screens/paymentSystemScreens/FinishSubscriptionPaymentByCard'
import { FinishSubscriptionPaymentByPix } from '@screens/paymentSystemScreens/FinishSubscriptionPaymentByPix'
import { SelectSubsciptionPaymentMethod } from '@screens/paymentSystemScreens/SelectSubsciptionPaymentMethod'
import { SelectSubscriptionPlan } from '@screens/paymentSystemScreens/SelectSubscriptionPlan'
import { SelectSubscriptionRange } from '@screens/paymentSystemScreens/SelectSubscriptionRange'
import { SubscriptionPaymentResult } from '@screens/paymentSystemScreens/SubscriptionPaymentResult'
import { SelectPostType } from '@screens/postScreens/SelectPostType'
import { EditProfile } from '@screens/profileScreens/EditProfile'
import { EditUserDescription } from '@screens/profileScreens/EditUserDescription'
import { EditUserLocation } from '@screens/profileScreens/EditUserLocation'
import { EditUserName } from '@screens/profileScreens/EditUserName'
import { EditUserPicture } from '@screens/profileScreens/EditUserPicture'
import { InsertLinkTitle } from '@screens/profileScreens/InsertLinkTitle'
import { InsertLinkValue } from '@screens/profileScreens/InsertLinkValue'
import { OfflinePostsManagement } from '@screens/profileScreens/OfflinePostsManagement'
import { SocialMediaManagement } from '@screens/profileScreens/SocialMediaManagement'
import { ViewCulturePost } from '@screens/viewPostScreens/ViewCulturePost'
import { ViewIncomePost } from '@screens/viewPostScreens/ViewIncomePost'
import { ViewSocialImpactPost } from '@screens/viewPostScreens/ViewSocialImpactPost'
import { ViewVacancyPost } from '@screens/viewPostScreens/ViewVacancyPost'

import { HomeTab } from '../../Tabs/HomeTab'
import { CultureStack } from '../CultureStack'
import { PublicServicesStack } from '../PublicServicesStack'
import { SaleStack } from '../SaleStack'
import { ServiceStack } from '../ServiceStack'
import { SocialImpactStack } from '../SocialImpactStack'
import { VacancyStack } from '../VacancyStack'

const Stack = createStackNavigator<UserStackParamList>()

export function UserStack({ route }: any) {
	const tourPerformed = (route.params && route.params.tourPerformed) || false

	return (
		<ChatProvider>
			<StateProvider>
				<EditProvider>
					<SubscriptionProvider>
						<StripeProvider>
							<LocationProvider>
								<Stack.Navigator
									initialRouteName={tourPerformed ? 'HomeTab' : 'WelcomeNewUser'}
									screenOptions={{
										headerShown: false,
										gestureEnabled: true,
										...TransitionPresets.SlideFromRightIOS,
									}}
								>
									<Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} />
									<Stack.Screen name={'HomeTab'} component={HomeTab} />
									<Stack.Screen name={'SelectPostType'} component={SelectPostType} />
									<Stack.Screen name={'SelectIncomeType'} component={SelectIncomeType} />
									<Stack.Screen name={'ServiceStack'} component={ServiceStack} />
									<Stack.Screen name={'SaleStack'} component={SaleStack} />
									<Stack.Screen name={'VacancyStack'} component={VacancyStack} />
									<Stack.Screen name={'CultureStack'} component={CultureStack} />
									<Stack.Screen name={'SocialImpactStack'} component={SocialImpactStack} />
									<Stack.Screen name={'EditProfile'} component={EditProfile} />
									<Stack.Screen name={'EditUserName'} component={EditUserName} />
									<Stack.Screen name={'EditUserDescription'} component={EditUserDescription} />
									<Stack.Screen name={'EditUserLocation'} component={EditUserLocation} />
									<Stack.Screen name={'EditUserPicture'} component={EditUserPicture} />
									<Stack.Screen name={'OfflinePostsManagement'} component={OfflinePostsManagement} />

									<Stack.Screen name={'EditServicePost'} component={EditServicePost} />
									<Stack.Screen name={'EditSalePost'} component={EditSalePost} />
									<Stack.Screen name={'EditVacancyPost'} component={EditVacancyPost} />
									<Stack.Screen name={'EditSocialImpactPost'} component={EditSocialImpactPost} />
									<Stack.Screen name={'EditCulturePost'} component={EditCulturePost} />

									<Stack.Screen name={'ViewCompletedPosts'} component={ViewCompletedPosts} />
									<Stack.Screen name={'SocialMediaManagement'} component={SocialMediaManagement} />
									<Stack.Screen name={'InsertLinkTitle'} component={InsertLinkTitle} />
									<Stack.Screen name={'InsertLinkValue'} component={InsertLinkValue} />
									<Stack.Screen name={'Configurations'} component={Configurations} />
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

									<Stack.Screen name={'ViewIncomePostUser'} component={ViewIncomePost} />
									<Stack.Screen name={'ViewVacancyPostUser'} component={ViewVacancyPost} />
									<Stack.Screen name={'ViewCulturePostUser'} component={ViewCulturePost} />
									<Stack.Screen name={'ViewSocialImpactPostUser'} component={ViewSocialImpactPost} />

									<Stack.Screen name={'ChatMessages'} component={ChatMessages} />

									<Stack.Screen name={'SelectSubscriptionPlan'} component={SelectSubscriptionPlan} />
									<Stack.Screen name={'SelectSubsciptionPaymentMethod'} component={SelectSubsciptionPaymentMethod} />
									<Stack.Screen name={'FinishSubscriptionPaymentByPix'} component={FinishSubscriptionPaymentByPix} />
									<Stack.Screen name={'FinishSubscriptionPaymentByCard'} component={FinishSubscriptionPaymentByCard} />
									<Stack.Screen
										options={{ gestureEnabled: false }}
										name={'SubscriptionPaymentResult'}
										component={SubscriptionPaymentResult}
									/>
									<Stack.Screen name={'SelectSubscriptionRange'} component={SelectSubscriptionRange} />
									<Stack.Screen name={'EditCurrentSubscription'} component={EditCurrentSubscription} />

									<Stack.Screen name={'PublicServicesStack'} component={PublicServicesStack} />
								</Stack.Navigator>
							</LocationProvider>
						</StripeProvider>
					</SubscriptionProvider>
				</EditProvider>
			</StateProvider>
		</ChatProvider>
	)
}
