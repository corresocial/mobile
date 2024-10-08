import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const EventsContainer = styled.View`
	height: 100%;
	width: 100%;
`

export const EventsFlatList = styled.FlatList`
	width: 100%;
`

export const BottomNavigator = styled.View`
	bottom: 0px;
	height: ${relativeScreenDensity(50)}px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const ColapsedEventGroup = styled.View`
	flex-direction: row;
	width: 100%;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: ${relativeScreenDensity(8)}px;
`

export const NoPostNotifierContainer = styled.View`
	height: 100%;
	width: 100%;
`
