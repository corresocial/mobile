import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const EventsContainer = styled.View`
	height: 100%;
	width: 100%;
`

export const EventsFlatList = styled.FlatList`
	width: 100%;
	padding: ${relativeScreenHeight(1)}px ${relativeScreenWidth(2)}px;
`

export const FlatListBottomPadding = styled.View`
	height: ${relativeScreenHeight(20)}px;
`

export const BottomNavigator = styled.View`
	position: absolute;
	bottom: 0px;
	background-color: ${({ theme }) => theme.colors.white[3]};
	height: ${relativeScreenHeight(10)}px;
	width: 100%;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border-top-width: ${relativeScreenHeight(0.3)}px;
`
