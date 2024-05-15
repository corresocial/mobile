import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.purple2};
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenDensity(10)}px;
`

export const PollList = styled.FlatList`
	flex: 1;
`

export const CardContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`
