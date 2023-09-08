import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'

import { theme } from '../../../common/theme'
import HomeTabIconActive from '../../../assets/icons/home-orange.svg'
import HomeTabIconInactive from '../../../assets/icons/home-white.svg'
import PlusTabIconActive from '../../../assets/icons/plus-orange.svg'
import PlusTabIconInactive from '../../../assets/icons/plus-white.svg'
import ChatTabIconActive from '../../../assets/icons/chat-orange.svg'
import ChatTabIconInactive from '../../../assets/icons/chat-white.svg'
import ProfileTabIconActive from '../../../assets/icons/profile-orange.svg'
import ProfileTabIconInactive from '../../../assets/icons/profile-white.svg'

import { HomeTabParamList } from './types'
import { HomeTabScreenProps } from '../../Stack/UserStack/stackScreenProps'

import { Post } from '../../../screens/homeScreens/Post'
import { StateContext } from '../../../contexts/StateContext'
import { ProfileStack } from '../../Stack/ProfileStack'
import { HomeStack } from '../../Stack/HomeStack'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { ChatStack } from '../../Stack/ChatStack'

const Tab = createBottomTabNavigator<HomeTabParamList>()

export function HomeTab({ route, navigation }: HomeTabScreenProps) {
	const { stateDataContext, toggleTourModalVisibility, toggleShareModalVisibility } = useContext(StateContext)

	const handlerTourButton = { navigation }

	useFocusEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			stateDataContext.showTourModal && toggleTourModalVisibility(true, handlerTourButton)
			stateDataContext.showShareModal && toggleShareModalVisibility(true)
		})
		return unsubscribe
	})

	const renderHomeIcon = (focused: boolean) => (
		focused
			? <HomeTabIconActive height={'60%'} width={'100%'} />
			: <HomeTabIconInactive height={'40%'} width={'100%'} />
	)

	const renderPlusIcon = (focused: boolean) => (
		focused
			? <PlusTabIconActive height={'60%'} width={'100%'} />
			: <PlusTabIconInactive height={'40%'} width={'100%'} />
	)

	const renderChatIcon = (focused: boolean) => (
		focused
			? <ChatTabIconActive height={'60%'} width={'100%'} />
			: <ChatTabIconInactive height={'40%'} width={'100%'} />
	)

	const renderProfileIcon = (focused: boolean) => (
		focused
			? <ProfileTabIconActive height={'60%'} width={'100%'} />
			: <ProfileTabIconInactive height={'40%'} width={'100%'} />
	)

	return (
		<Tab.Navigator
			initialRouteName={route.params?.showsInFirstTab ? 'HomeStack' : 'ProfileStack'}
			screenOptions={{
				tabBarHideOnKeyboard: true,
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					position: 'absolute',
					height: relativeScreenHeight(10),
					borderTopColor: theme.black4,
					borderTopWidth: 5
				}
			}}
		>
			<Tab.Screen
				name={'HomeStack'}
				component={HomeStack}
				options={{
					tabBarIcon: ({ focused }) => renderHomeIcon(focused)
				}}
			/>
			<Tab.Screen
				name={'Post'}
				component={Post}
				options={{
					tabBarIcon: ({ focused }) => renderPlusIcon(focused)
				}}
			/>
			<Tab.Screen
				name={'ChatStack'}
				component={ChatStack}
				options={{
					tabBarIcon: ({ focused }) => renderChatIcon(focused)
				}}
			/>
			<Tab.Screen
				name={'ProfileStack'}
				component={ProfileStack}
				options={{
					headerTransparent: true,
					tabBarIcon: ({ focused }) => renderProfileIcon(focused)
				}}
			/>
		</ Tab.Navigator>
	)
}
