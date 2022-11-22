import 'react-native-gesture-handler'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 
import { RFValue } from 'react-native-responsive-fontsize'

import { theme } from '../../../common/theme'
import HomeTabIconActive from './../../../assets/icons/homeTabIconActive.svg'
import HomeTabIconInactive from './../../../assets/icons/homeTabIconInactive.svg'
import LoupTabIconActive from './../../../assets/icons/loupTabIconActive.svg'
import LoupTabIconInactive from './../../../assets/icons/loupTabIconInactive.svg'
import PlusTabIconActive from './../../../assets/icons/plusTabIconActive.svg'
import PlusTabIconInactive from './../../../assets/icons/plusTabIconInactive.svg'
import ChatTabIconActive from './../../../assets/icons/chatTabIconActive.svg'
import ChatTabIconInactive from './../../../assets/icons/chatTabIconInactive.svg'
import ProfileTabIconActive from './../../../assets/icons/profileTabIconActive.svg'
import ProfileTabIconInactive from './../../../assets/icons/profileTabIconInactive.svg'

import { HomeTabParamList } from './types'
import { HomeTabScreenProps } from '../../Stack/UserStack/stackScreenProps'

import { Home } from '../../../screens/homeScreens/Home'
import { Profile } from '../../../screens/homeScreens/Profile'
import { SelectPostType } from '../../../screens/homeScreens/SelectPostType'

const Tab = createBottomTabNavigator<HomeTabParamList>()

export function HomeTab(props: HomeTabScreenProps) {
	const CustonProfile = () => <Profile {...props}/>
	return (
		<Tab.Navigator initialRouteName={'Profile'} 
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					position: 'absolute',
					height: RFValue(64),
					borderTopColor: theme.black3,
					borderTopWidth: 5
				}
			}}
		>
			<Tab.Screen name='Home' component={Home}
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						focused
							? <HomeTabIconActive height={'60%'} width={'60%'} />
							: <HomeTabIconInactive height={'40%'} width={'40%'} />
					)
				}}
			/>
			<Tab.Screen name='Catalog' component={Home}
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						focused
							? <LoupTabIconActive height={'60%'} width={'60%'} />
							: <LoupTabIconInactive height={'40%'} width={'40%'} />
					)
				}}
			/>
			<Tab.Screen name='Post' component={SelectPostType}
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						focused
							? <PlusTabIconActive height={'60%'} width={'60%'} />
							: <PlusTabIconInactive height={'40%'} width={'40%'} />
					)
				}}
			/>
			<Tab.Screen name='Chat' component={Home}
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						focused
							? <ChatTabIconActive height={'60%'} width={'60%'} />
							: <ChatTabIconInactive height={'40%'} width={'40%'} />
					)
				}}
			/>
			<Tab.Screen name='Profile' component={CustonProfile}
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						focused
							? <ProfileTabIconActive height={'60%'} width={'60%'} />
							: <ProfileTabIconInactive height={'40%'} width={'40%'} />
					)
				}}
			/>
		</ Tab.Navigator>
	)
}