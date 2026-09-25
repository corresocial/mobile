import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { useLayoutEffect, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { HomeTabParamList } from './HomeTab/types'

import { getTabBarStyle } from './HomeTab/styles'

const useHomeTabDisplay = <TabScreen extends keyof HomeTabParamList, Stack>
	({ navigation, route, screens }: BottomTabScreenProps<HomeTabParamList, TabScreen>
		& { screens: Array<keyof Stack> }) => {
	const visibleRoutes = useMemo(() => screens, [])
	const { bottom: bottomInset } = useSafeAreaInsets()

	useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route) as keyof Stack
		navigation.setOptions({
			tabBarStyle: {
				display: routeName === undefined || visibleRoutes.includes(routeName) ? 'flex' : 'none',
				...getTabBarStyle(bottomInset)
			}
		})
	}, [navigation, route, bottomInset])
}

export { useHomeTabDisplay }
