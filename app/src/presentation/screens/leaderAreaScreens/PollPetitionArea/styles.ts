import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const PollPetitionList = styled.FlatList`
	flex: 1;
	background-color: ${({ theme }) => theme.purple2};
	width: ${relativeScreenWidth(100)}px;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenDensity(10)}px;
`

export const HeaderButtonsContainer = styled.View`
	width: 100%;
  	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const HeaderSection = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: ${relativeScreenDensity(10)}px;
`

export const CardContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`
