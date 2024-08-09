import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { Platform } from 'react-native'

import { AlertContext } from '@contexts/AlertContext'
import { useAuthContext } from '@contexts/AuthContext'
import { StateContext } from '@contexts/StateContext'

import { HomeTabParamList } from './types'
import { LeaderAreaStack } from '@routes/Stack/LeaderAreaStack'
import { UserStackParamList } from '@routes/Stack/UserStack/types'

import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import HomeWhiteIcon from '@assets/icons/home-white.svg'
import LeaderSealIcon from '@assets/icons/leaderLabel.svg'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import ProfileWhiteIcon from '@assets/icons/profile-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { Post } from '@screens/postScreens/Post'

import { ChatStack } from '../../Stack/ChatStack'
import { HomeStack } from '../../Stack/HomeStack'
import { ProfileStack } from '../../Stack/ProfileStack'

const Tab = createBottomTabNavigator<HomeTabParamList>()

type HomeTabProps = {
	navigation: NativeStackNavigationProp<UserStackParamList, 'HomeTab', undefined>
	route: RouteProp<UserStackParamList, 'HomeTab'>
}

export function HomeTab({ route, navigation }: HomeTabProps) {
	const { userDataContext } = useAuthContext()
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

	const currentUserIsLeader = () => (userDataContext.verified?.type === 'leader')

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

	const renderLeaderAreaIcon = (focused: boolean) => (
		focused
			? <LeaderSealIcon height={'60%'} width={'100%'} />
			: <LeaderSealIcon height={'50%'} width={'100%'} />
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
					height: Platform.OS === 'ios' ? relativeScreenDensity(75) : relativeScreenDensity(60),
					borderTopColor: theme.black4,
					borderTopWidth: 5,
					marginBottom: 0,
					backgroundColor: theme.black4
				},
				tabBarItemStyle: Platform.OS === 'ios' && {
					flex: 1,
					height: relativeScreenDensity(50)
				},
				tabBarIconStyle: {
					overflow: 'hidden',
					height: relativeScreenDensity(50),
					width: '70%',
				},
				tabBarBadgeStyle: {
					borderRadius: 5,
					backgroundColor: theme.pink3,
					fontFamily: 'Arvo_700Bold',
					fontSize: relativeScreenDensity(10),
					margin: relativeScreenDensity(3),
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
				component={Post} // REFACTOR
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
			{
				currentUserIsLeader() && (
					<Tab.Screen
						name={'LeaderAreaStack'}
						component={LeaderAreaStack}
						options={{
							tabBarIcon: ({ focused }) => renderLeaderAreaIcon(focused)
						}}
					/>
				)
			}

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
