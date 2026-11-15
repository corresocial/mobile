import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute, useNavigationState } from '@react-navigation/native'
import { useLayoutEffect, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { HomeTabParamList } from './HomeTab/types'

import { getTabBarStyle } from './HomeTab/styles'

const useHomeTabDisplay = <TabScreen extends keyof HomeTabParamList, Stack>
	({ navigation, route, screens }: BottomTabScreenProps<HomeTabParamList, TabScreen>
		& { screens: Array<keyof Stack> }) => {
	const visibleRoutes = useMemo(() => screens, [])
	const { bottom: bottomInset } = useSafeAreaInsets()
	// No React Navigation 7 a tela da aba não re-renderiza quando a pilha aninhada navega (o route mantém a
	// mesma referência), então a rota focada é lida do estado da barra de abas, que notifica essas mudanças
	const routeName = useNavigationState((state) => {
		const tabRoute = state.routes.find(({ key }) => key === route.key)
		return tabRoute ? getFocusedRouteNameFromRoute(tabRoute) : undefined
	}) as keyof Stack | undefined

	useLayoutEffect(() => {
		navigation.setOptions({
			tabBarStyle: {
				display: routeName === undefined || visibleRoutes.includes(routeName) ? 'flex' : 'none',
				...getTabBarStyle(bottomInset)
			}
		})
	}, [navigation, routeName, bottomInset])
}

export { useHomeTabDisplay }
