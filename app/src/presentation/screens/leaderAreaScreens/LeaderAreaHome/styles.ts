import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const UnapprovedPostsList = styled.FlatList`
	flex: 1;
	width: 100%;
	background-color: ${({ theme }) => theme.orange2};
`

export const HeaderButtonsContainer = styled.View`
	background-color: ${({ theme }) => theme.orange2};
	width: ${relativeScreenWidth(100)}px;
  	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${relativeScreenDensity(3)}px;
`

export const HeaderSection = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: ${relativeScreenDensity(10)}px;
`

export const ListItemContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`
