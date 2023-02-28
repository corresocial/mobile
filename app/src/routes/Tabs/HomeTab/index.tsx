import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'

import { theme } from '../../../common/theme'
import HomeTabIconActive from '../../../assets/icons/homeTabIconActive.svg'
import HomeTabIconInactive from '../../../assets/icons/homeTabIconInactive.svg'
// import LoupTabIconActive from '../../../assets/icons/loupTabIconActive.svg'
// import LoupTabIconInactive from '../../../assets/icons/loupTabIconInactive.svg'
import PlusTabIconActive from '../../../assets/icons/plusTabIconActive.svg'
import PlusTabIconInactive from '../../../assets/icons/plusTabIconInactive.svg'
// import ChatTabIconActive from '../../../assets/icons/chatTabIconActive.svg'
// import ChatTabIconInactive from '../../../assets/icons/chatTabIconInactive.svg'
import ProfileTabIconActive from '../../../assets/icons/profileTabIconActive.svg'
import ProfileTabIconInactive from '../../../assets/icons/profileTabIconInactive.svg'

import { HomeTabParamList } from './types'
import { HomeTabScreenProps } from '../../Stack/UserStack/stackScreenProps'

import { Post } from '../../../screens/homeScreens/Post'
import { StateContext } from '../../../contexts/StateContext'
import { ProfileStack } from '../../Stack/ProfileStack'
import { HomeStack } from '../../Stack/HomeStack'
import { relativeScreenHeight } from '../../../common/screenDimensions'

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
			? <HomeTabIconActive height={'60%'} width={'60%'} />
			: <HomeTabIconInactive height={'40%'} width={'40%'} />
	)

	const renderPlusIcon = (focused: boolean) => (
		focused
			? <PlusTabIconActive height={'60%'} width={'60%'} />
			: <PlusTabIconInactive height={'40%'} width={'40%'} />
	)

	const renderProfileIcon = (focused: boolean) => (
		focused
			? <ProfileTabIconActive height={'60%'} width={'60%'} />
			: <ProfileTabIconInactive height={'40%'} width={'40%'} />
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
					borderTopColor: theme.black3,
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
				name={'ProfileStack'}
				component={ProfileStack}
				initialParams={{
					teste: 'teste'
				}}
				options={{
					headerTransparent: true,
					tabBarIcon: ({ focused }) => renderProfileIcon(focused)
				}}
			/>
		</ Tab.Navigator>
	)
}
