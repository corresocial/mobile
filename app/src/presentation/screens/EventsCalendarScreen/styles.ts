import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const EventsContainer = styled.View`
	height: 100%;
	width: 100%;
`

export const EventsFlatList = styled.FlatList`
	width: 100%;
	padding: 0px ${relativeScreenDensity(10)}px;
`

export const BottomNavigator = styled.View`
	position: absolute;
	bottom: 0px;
	background-color: ${({ theme }) => theme.colors.white[3]};
	height: ${relativeScreenDensity(50)}px;
	width: 100%;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border-top-width: ${relativeScreenDensity(2.5)}px;
`

export const ColapsedEventGroup = styled.View`
	flex-direction: row;
	width: 100%;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: ${relativeScreenDensity(8)}px 0px;
`
