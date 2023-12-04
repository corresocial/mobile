import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { AlertContext } from '@contexts/AlertContext'
import { StateContext } from '@contexts/StateContext'

import { HomeTabParamList } from './types'

import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import HomeWhiteIcon from '@assets/icons/home-white.svg'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import ProfileWhiteIcon from '@assets/icons/profile-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { Post } from '../../../screens/homeScreens/Post'
import { ChatStack } from '../../Stack/ChatStack'
import { HomeStack } from '../../Stack/HomeStack'
import { ProfileStack } from '../../Stack/ProfileStack'
import { HomeTabScreenProps } from '../../Stack/UserStack/stackScreenProps'

const Tab = createBottomTabNavigator<HomeTabParamList>()

export function HomeTab({ route, navigation }: HomeTabScreenProps) {
	const { stateDataContext, toggleTourModalVisibility, toggleShareModalVisibility } = useContext(StateContext)
	const { notificationState } = useContext(AlertContext)

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
			? <HomeWhiteIcon height={'50%'} width={'100%'} />
			: <HomeWhiteIcon height={'40%'} width={'100%'} />
	)

	const renderPlusIcon = (focused: boolean) => (
		focused
			? <PlusWhiteIcon height={'50%'} width={'100%'} />
			: <PlusWhiteIcon height={'40%'} width={'100%'} />
	)

	const renderChatIcon = (focused: boolean) => (
		focused
			? <ChatWhiteIcon height={'50%'} width={'100%'} />
			: <ChatWhiteIcon height={'40%'} width={'100%'} />
	)

	const renderProfileIcon = (focused: boolean) => (
		focused
			? <ProfileWhiteIcon height={'50%'} width={'100%'} />
			: <ProfileWhiteIcon height={'40%'} width={'100%'} />
	)

	const getProfileNotification = () => {
		if (notificationState.configNotificationButton || notificationState.configNotificationEntryMethod) {
			return '!'
		}
		return undefined
	}

	const getChatNotification = () => {
		if (notificationState.notificationAlertModal) return '!'
		return undefined
	}

	return (
		<Tab.Navigator
			initialRouteName={route.params?.showsInFirstTab ? 'HomeStack' : 'ProfileStack'}
			screenOptions={{
				tabBarHideOnKeyboard: true,
				headerShown: false,
				tabBarShowLabel: false,

				tabBarStyle: {
					flex: 1,
					position: 'absolute',
					height: Platform.OS === 'ios' ? relativeScreenHeight(10) : relativeScreenHeight(8),
					borderTopColor: theme.black4,
					borderTopWidth: 5,
					marginBottom: 0,
					backgroundColor: theme.black4
				},
				tabBarItemStyle: Platform.OS === 'ios' && {
					flex: 1,
					height: relativeScreenHeight(6.5)
				},
				tabBarBadgeStyle: {
					borderRadius: 5,
					backgroundColor: theme.pink3,
					fontFamily: 'Arvo_700Bold',
					fontSize: RFValue(10),
					margin: RFValue(3),
				},
				tabBarActiveBackgroundColor: theme.orange3,
				tabBarInactiveBackgroundColor: theme.white3,
			}}
		>
			<Tab.Screen
				name={'HomeStack'}
				component={HomeStack}
				options={{
					tabBarIcon: ({ focused }) => renderHomeIcon(focused),
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
					tabBarIcon: ({ focused }) => renderChatIcon(focused),
					tabBarBadge: getChatNotification()
				}}
			/>
			<Tab.Screen
				name={'ProfileStack'}
				component={ProfileStack}
				options={{
					headerTransparent: true,
					tabBarIcon: ({ focused }) => renderProfileIcon(focused),
					tabBarBadge: getProfileNotification()
				}}
			/>
		</ Tab.Navigator>
	)
}
