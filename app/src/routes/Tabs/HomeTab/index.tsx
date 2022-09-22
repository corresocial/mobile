import 'react-native-gesture-handler'
import React, { useState } from 'react'

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

import { HomeTabParamList } from './types';

import { Home } from '../../../screens/Home';
import { Profile } from '../../../screens/Profile';
import { HomeTabScreenProps } from '../../Stack/stackScreenProps';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' // TODO type
import { screenHeight } from '../../../common/screenDimensions';
import { TourStack } from '../../Stack/TourStack'

const Tab = createBottomTabNavigator<HomeTabParamList>();

export function HomeTab({ route }: HomeTabScreenProps) {
	const [firstAccessPerformed, setFirstAccessPerformed] = useState(false)

	const CustomProfile = () => <Profile
		firstAccess={true && !firstAccessPerformed} // TODO route.params.firstAccess
		firstAccessPerformed={() => setFirstAccessPerformed(true)}
	/>

	return (
		<Tab.Navigator initialRouteName={true ? 'Profile' : 'Home'} // TODO route.params.firstAccess
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					position: 'absolute',
					height: screenHeight * 0.08
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
			<Tab.Screen name='Post' component={Home}
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
			<Tab.Screen name='Profile' component={TourStack} //CustomProfile
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						focused
							? <ProfileTabIconActive height={'60%'} width={'60%'} />
							: <ProfileTabIconInactive height={'40%'} width={'40%'} />
					)
				}}
			/>
		</ Tab.Navigator>
	);
}