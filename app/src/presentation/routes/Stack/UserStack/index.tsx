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

import { ContactUs } from '@screens/configurationScreens/ContactUs'
import { ContactUsInsertMessage } from '@screens/configurationScreens/ContactUsInsertMessage'
import { ContactUsSuccess } from '@screens/configurationScreens/ContactUsSuccess'
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
import { OfflinePostsManagement } from '@screens/profileScreens/OfflinePostsManagement'

import { HomeTab } from '../../Tabs/HomeTab'
import { CultureStack } from '../CultureStack'
import { IncomeStack } from '../IncomeStack'
import { PetitionStack } from '../PetitionStack'
import { PollStack } from '../PollStack'
import { SaleStack } from '../SaleStack'
import { ServiceStack } from '../ServiceStack'
import { SocialImpactStack } from '../SocialImpactStack'
import { VacancyStack } from '../VacancyStack'

const Stack = createStackNavigator<UserStackParamList>()

export function UserStack({ route }: any) {
	const newUser = (route.params && route.params.newUser) || false

	return (
		<ChatProvider>
			<StateProvider>
				<EditProvider>
					<SubscriptionProvider>
						<StripeProvider>
							<LocationProvider>
								<Stack.Navigator
									initialRouteName={newUser ? 'WelcomeNewUser' : 'HomeTab'}
									screenOptions={{
										headerShown: false,
										gestureEnabled: true,
										...TransitionPresets.SlideFromRightIOS,
									}}
								>
									<Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} />
									<Stack.Screen name={'HomeTab'} component={HomeTab} />

									{/* Rever a possibilidade de migrar para postStack se o custo de acesso não for grande */}
									<Stack.Screen name={'SelectPostType'} component={SelectPostType} />
									<Stack.Screen name={'SelectIncomeType'} component={SelectIncomeType} />
									<Stack.Screen name={'ServiceStack'} component={ServiceStack} />
									<Stack.Screen name={'SaleStack'} component={SaleStack} />
									<Stack.Screen name={'IncomeStack'} component={IncomeStack} />
									<Stack.Screen name={'VacancyStack'} component={VacancyStack} />
									<Stack.Screen name={'CultureStack'} component={CultureStack} />
									<Stack.Screen name={'SocialImpactStack'} component={SocialImpactStack} />
									<Stack.Screen name={'PollStack'} component={PollStack} />
									<Stack.Screen name={'PetitionStack'} component={PetitionStack} />

									<Stack.Screen name={'OfflinePostsManagement'} component={OfflinePostsManagement} />

									{/* TODO Type */}
									<Stack.Screen name={'ContactUsUserStack'} component={ContactUs as any} />
									<Stack.Screen name={'ContactUsInsertMessageUserStack'} component={ContactUsInsertMessage as any} />
									<Stack.Screen name={'ContactUsSuccessUserStack'} component={ContactUsSuccess as any} />

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
