import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const HeaderContainer = styled.View`
	flex: 0.23;
    background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenDensity(15)}px;
	padding-bottom: 0px;
	width: 100%;
	align-items: center;
	justify-content: center;
	gap: ${relativeScreenDensity(8)}px;
`

export const HeaderActionsContainer = styled.View`
	flex: 1;
	width: 100%;
	justify-content: center;
	gap: ${relativeScreenDensity(15)}px;
`

export const Body = styled.View`
	flex: 1;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: ${relativeScreenDensity(20)}px;
    padding: 0 ${relativeScreenDensity(15)}px;
	background-color: ${({ theme }) => theme.orange2};
`

export const QuestionsList = styled.FlatList`
	flex: 1;
`
