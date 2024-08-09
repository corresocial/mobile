import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { useLayoutEffect, useMemo } from 'react'
import { Platform } from 'react-native'

import { HomeTabParamList } from './HomeTab/types'

import { relativeScreenDensity } from '@common/screenDimensions'
import { theme } from '@common/theme'

const useHomeTabDisplay = <TabScreen extends keyof HomeTabParamList, Stack>
	({ navigation, route, screens }: BottomTabScreenProps<HomeTabParamList, TabScreen>
		& { screens: Array<keyof Stack> }) => {
	const visibleRoutes = useMemo(() => screens, [])

	useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route) as keyof Stack
		navigation.setOptions({
			tabBarStyle: { // CURRENT Migrar configurações para ca
				display: routeName === undefined || visibleRoutes.includes(routeName) ? 'flex' : 'none',
				position: 'absolute',
				height: Platform.OS === 'ios' ? relativeScreenDensity(77) : relativeScreenDensity(60),
				borderTopColor: theme.colors.black[4],
				borderTopWidth: relativeScreenDensity(2),
				marginBottom: 0,
				backgroundColor: theme.colors.black[4],
			}
		})
	}, [navigation, route])
}

export { useHomeTabDisplay }
