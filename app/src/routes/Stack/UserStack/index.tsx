import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { UserStackParamList } from './types'

import { StateProvider } from '../../../contexts/StateContext'
import { ChatProvider } from '../../../contexts/ChatContext'
import { EditProvider } from '../../../contexts/EditContext'

import { WelcomeNewUser } from '../../../screens/homeScreens/WelcomeNewUser'
import { SelectPostType } from '../../../screens/homeScreens/SelectPostType'
import { HomeTab } from '../../Tabs/HomeTab'
import { ServiceStack } from '../ServiceStack'
import { SaleStack } from '../SaleStack'
import { VacancyStack } from '../VacancyStack'
import { SocialImpactStack } from '../SocialImpactStack'
import { CultureStack } from '../CultureStack'
import { EditProfile } from '../../../screens/profileScreens/EditProfile'
import { EditUserName } from '../../../screens/profileScreens/EditUserName'
import { EditUserDescription } from '../../../screens/profileScreens/EditUserDescription'
import { EditUserPicture } from '../../../screens/profileScreens/EditUserPicture'
import { SocialMediaManagement } from '../../../screens/profileScreens/SocialMediaManagement'
import { InsertLinkTitle } from '../../../screens/profileScreens/InsertLinkTitle'
import { InsertLinkValue } from '../../../screens/profileScreens/InsertLinkValue'
import { Configurations } from '../../../screens/configurationScreens/Configurations'
import { WhoWeAre } from '../../../screens/configurationScreens/WhoWeAre'
import { WhoWeAreIncome } from '../../../screens/configurationScreens/WhoWeAreIncome'
import { WhoWeAreCulture } from '../../../screens/configurationScreens/WhoWeAreCulture'
import { WhoWeAreTransformation } from '../../../screens/configurationScreens/WhoWeAreTransformation'
import { HelpUs } from '../../../screens/configurationScreens/HelpUs'
import { ContactUs } from '../../../screens/configurationScreens/ContactUs'
import { ContactUsInsertMessage } from '../../../screens/configurationScreens/ContactUsInsertMessage'
import { ContactUsSuccess } from '../../../screens/configurationScreens/ContactUsSuccess'
import { PrivacyAndSecurity } from '../../../screens/configurationScreens/PrivacyAndSecurity'
import { EditServicePost } from '../../../screens/editPostScreens/EditServicePost'
import { EditSalePost } from '../../../screens/editPostScreens/EditSalePost'
import { EditVacancyPost } from '../../../screens/editPostScreens/EditVacancyPost'
import { EditSocialImpactPost } from '../../../screens/editPostScreens/EditSocialImpactPost'
import { EditCulturePost } from '../../../screens/editPostScreens/EditCulturePost'
import { ChatMessages } from '../../../screens/chatScreens/ChatMessages'
import { UserDataConfigurations } from '../../../screens/configurationScreens/UserDataConfigurations'
import { ViewPostsByRange } from '../../../screens/homeScreens/ViewPostsByRange'
import { LocationProvider } from '../../../contexts/LocationContext'
import { SelectSubscriptionPlan } from '../../../screens/paymentSystemScreens/SelectSubscriptionPlan'
import { SelectSubsciptionPaymentMethod } from '../../../screens/paymentSystemScreens/SelectSubsciptionPaymentMethod'
import { FinishSubscriptionPaymentByPix } from '../../../screens/paymentSystemScreens/FinishSubscriptionPaymentByPix'
import { FinishSubscriptionPaymentByCard } from '../../../screens/paymentSystemScreens/FinishSubscriptionPaymentByCard'
import { SubscriptionPaymentResult } from '../../../screens/paymentSystemScreens/SubscriptionPaymentResult'
import { SubscriptionProvider } from '../../../contexts/SubscriptionContext'
import { SelectSubscriptionRange } from '../../../screens/paymentSystemScreens/SelectSubscriptionRange'
import { EditCurrentSubscription } from '../../../screens/paymentSystemScreens/EditCurrentSubscription'
import { StripeProvider } from '../../../contexts/StripeContext'

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
									<Stack.Screen name={'ViewPostsByRange'} component={ViewPostsByRange} />
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

									<Stack.Screen name={'EditServicePost'} component={EditServicePost} />
									<Stack.Screen name={'EditSalePost'} component={EditSalePost} />
									<Stack.Screen name={'EditVacancyPost'} component={EditVacancyPost} />
									<Stack.Screen name={'EditSocialImpactPost'} component={EditSocialImpactPost} />
									<Stack.Screen name={'EditCulturePost'} component={EditCulturePost} />

									<Stack.Screen name={'SocialMediaManagement'} component={SocialMediaManagement} />
									<Stack.Screen name={'InsertLinkTitle'} component={InsertLinkTitle} />
									<Stack.Screen name={'InsertLinkValue'} component={InsertLinkValue} />
									<Stack.Screen name={'Configurations'} component={Configurations} />
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
								</Stack.Navigator>
							</LocationProvider>
						</StripeProvider>
					</SubscriptionProvider>
				</EditProvider>
			</StateProvider>
		</ChatProvider>
	)
}
