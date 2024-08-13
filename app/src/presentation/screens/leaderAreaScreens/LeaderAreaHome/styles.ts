import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	width: 100%;
	background-color: ${({ theme }) => theme.orange2};
`

export const UnapprovedPostsList = styled.FlatList`
	flex: 1;
	width: 100%;
	background-color: ${({ theme }) => theme.orange2};
`

export const HeaderButtonsContainer = styled.View`
	background-color: ${({ theme }) => theme.orange2};
	width: ${relativeScreenWidth(100)}px;
	align-items: center;
	justify-content: space-between;
	padding: ${relativeScreenDensity(15)}px;
	gap: ${relativeScreenDensity(10)}px;
`

export const HeaderSection = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`

export const Row = styled.View`
	width: 100%;
	justify-content: center;
	flex-direction: row;
	gap: ${relativeScreenDensity(15)}px;
`

export const ListItemContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`
