/* eslint-disable no-underscore-dangle */
import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RouteProp, useFocusEffect, useIsFocused } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useContext, useRef } from 'react'
import { Animated, Platform } from 'react-native'

import { AlertContext } from '@contexts/AlertContext'
import { useAuthContext } from '@contexts/AuthContext'
import { StateContext } from '@contexts/StateContext'

import { HomeTabParamList } from './types'
import { LeaderAreaStack } from '@routes/Stack/LeaderAreaStack'
import { UserStackParamList } from '@routes/Stack/UserStack/types'

import { AnimatedTabItemText, TabItemContainer, TabItemContent, TabItemText } from './styles'
import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import HomeWhiteIcon from '@assets/icons/home-white.svg'
import LeaderSealIcon from '@assets/icons/leaderLabel.svg'
import PlusWhiteIcon from '@assets/icons/plus.svg'
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

	const useTabAnimation = () => {
		const initialValue = relativeScreenDensity(15)
		const heightAnimatedValue = useRef(new Animated.Value(initialValue)).current

		const animateTab = (focused: boolean) => {
			Animated.timing(heightAnimatedValue, {
				toValue: focused ? 0 : initialValue,
				duration: 400,
				useNativeDriver: false
			}).start()
		}

		return { heightAnimatedValue, animateTab }
	}

	const postTab = useTabAnimation()
	const homeTab = useTabAnimation()
	const leaderTab = useTabAnimation()
	const chatTab = useTabAnimation()
	const profileTab = useTabAnimation()

	const currentUserIsLeader = () => (userDataContext.verified?.type === 'leader')

	const renderHomeIcon = (focused: boolean) => {
		const isFocused = useIsFocused()
		homeTab.animateTab(isFocused)
		return (
			<TabItemContainer>
				<TabItemContent focused={isFocused}>
					<HomeWhiteIcon height={'45%'} width={'100%'} />
					<AnimatedTabItemText style={{ height: homeTab.heightAnimatedValue }}>
						<TabItemText>{'Inicio'}</TabItemText>
					</AnimatedTabItemText>
				</TabItemContent>
			</TabItemContainer>
		)
	}

	const renderPlusIcon = (focused: boolean) => {
		const isFocused = useIsFocused()
		postTab.animateTab(isFocused)
		return (
			<TabItemContainer >
				<TabItemContent focused={isFocused}>
					<PlusWhiteIcon height={'45%'} width={'100%'} />
					<AnimatedTabItemText style={{ height: postTab.heightAnimatedValue }}>
						<TabItemText>
							{'Postar'}
						</TabItemText>
					</AnimatedTabItemText>
				</TabItemContent>
			</TabItemContainer >
		)
	}

	const renderChatIcon = (focused: boolean) => {
		const isFocused = useIsFocused()
		chatTab.animateTab(isFocused)
		return (
			<TabItemContainer >
				<TabItemContent focused={isFocused}>
					<ChatWhiteIcon height={'45%'} width={'100%'} />
					<AnimatedTabItemText style={{ height: chatTab.heightAnimatedValue }}>
						<TabItemText>{'Conversas'}</TabItemText>
					</AnimatedTabItemText>
				</TabItemContent>
			</TabItemContainer >
		)
	}

	const renderLeaderAreaIcon = (focused: boolean) => {
		const isFocused = useIsFocused()
		leaderTab.animateTab(isFocused)
		return (
			<TabItemContainer >
				<TabItemContent focused={isFocused}>
					<LeaderSealIcon height={'55%'} width={'100%'} />
					<AnimatedTabItemText style={{ height: leaderTab.heightAnimatedValue }}>
						<TabItemText>{'Líder'}</TabItemText>
					</AnimatedTabItemText>
				</TabItemContent>
			</TabItemContainer >
		)
	}

	const renderProfileIcon = (focused: boolean) => {
		const isFocused = useIsFocused()
		profileTab.animateTab(isFocused)
		return (
			<TabItemContainer >
				<TabItemContent focused={isFocused}>
					<ProfileWhiteIcon height={'45%'} width={'100%'} />
					<AnimatedTabItemText style={{ height: profileTab.heightAnimatedValue }}>
						<TabItemText>{'Perfil'}</TabItemText>
					</AnimatedTabItemText>
				</TabItemContent>
			</TabItemContainer >
		)
	}

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
					height: Platform.OS === 'ios' ? relativeScreenDensity(77) : relativeScreenDensity(60),
					borderTopColor: theme.colors.black[4],
					borderTopWidth: relativeScreenDensity(2),
					marginBottom: 0,
					backgroundColor: theme.colors.black[4],
				},
				tabBarItemStyle: Platform.OS === 'ios' && {
					flex: 1,
					height: '100%'
				},
				tabBarIconStyle: {
					height: relativeScreenDensity(30),
					width: '100%',
				},
				tabBarBadgeStyle: {
					borderRadius: 5,
					backgroundColor: theme.colors.pink[4],
					fontFamily: 'Arvo_700Bold',
					fontSize: relativeScreenDensity(10),
					margin: relativeScreenDensity(3),
				},
				tabBarActiveBackgroundColor: theme.colors.white[3],
				tabBarInactiveBackgroundColor: theme.colors.white[3],
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
