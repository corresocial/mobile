import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const HeaderContainer = styled.View`
	position: relative;
    background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenDensity(15)}px;
	gap: ${relativeScreenDensity(20)}px;
`

export const HeaderActionsContainer = styled.View`
	width: 85%;
	padding-left: ${relativeScreenDensity(10)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap:${relativeScreenDensity(5)}px;
`

export const Body = styled.View`
	flex: 1;
	width: 100%;
    flex-direction: column;
    padding: 0 ${relativeScreenDensity(10)}px;
	background-color: ${({ theme }) => theme.orange2};
`

export const ToggleButtonContainer = styled.View`
	width: 100%;
	align-items: center;
`

export const QuestionsList = styled.FlatList`
	flex: 1;
`
