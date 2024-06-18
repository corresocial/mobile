import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const HeaderContainer = styled.View`
	position: relative;
    background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenDensity(15)}px;
	gap: ${relativeScreenDensity(20)}px;
`

interface HeaderActionsContainerProps {
	isEditMode: boolean
}

export const HeaderActionsContainer = styled.View<HeaderActionsContainerProps>`
	width: ${({ isEditMode }) => (isEditMode ? '85%' : '100%')};
	padding-left: ${relativeScreenDensity(10)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap:${relativeScreenDensity(5)}px;
`

export const Body = styled.View`
	flex: 1;
    flex-direction: column;
    padding: 0 ${relativeScreenDensity(15)}px;
	background-color: ${({ theme }) => theme.orange2};
`

export const QuestionsList = styled.FlatList`
	flex: 1;
`
