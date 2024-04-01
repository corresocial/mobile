import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { useLayoutEffect, useMemo } from 'react'
import { Platform } from 'react-native'

import { HomeTabParamList } from './HomeTab/types'

import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

const useHomeTabDisplay = <TabScreen extends keyof HomeTabParamList, Stack>
	({ navigation, route, screens }: BottomTabScreenProps<HomeTabParamList, TabScreen>
		& { screens: Array<keyof Stack> }) => {
	const visibleRoutes = useMemo(() => screens, [])

	useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route) as keyof Stack
		navigation.setOptions({
			tabBarStyle: {
				display: routeName === undefined || visibleRoutes.includes(routeName) ? 'flex' : 'none',
				position: 'absolute',
				height: Platform.OS === 'ios' ? relativeScreenHeight(10) : relativeScreenHeight(8),
				borderTopColor: theme.black4,
				borderTopWidth: 5,
				marginBottom: 0,
				backgroundColor: theme.black4
			}
		})
	}, [navigation, route])
}

export { useHomeTabDisplay }
