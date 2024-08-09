import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.purple[2]};
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenDensity(10)}px;
`

export const PetitionList = styled.FlatList`
	flex: 1;
`

export const CardContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`
