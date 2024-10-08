import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const HeaderContainer = styled.View`
	position: relative;
    background-color: ${({ theme }) => theme.colors.white[3]};
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

export const CreatorDataContainer = styled.View`
    padding-left: ${relativeScreenDensity(7)}px;
`

export const CreatorContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

export const InfoText = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	color: ${({ theme }) => theme.colors.black[4]};
`

export const CreatorNameText = styled(InfoText)`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
`

export const CreatedAtText = styled(InfoText)`
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
`

export const Body = styled.View`
	flex: 1;
	width: 100%;
    flex-direction: column;
    padding: 0 ${relativeScreenDensity(10)}px;
	background-color: ${({ theme }) => theme.colors.orange[2]};
`

export const ToggleButtonContainer = styled.View`
	width: 100%;
	align-items: center;
`

export const QuestionsList = styled.FlatList`
	flex: 1;
`
