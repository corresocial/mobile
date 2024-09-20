import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const HeaderContainer = styled.View`
	gap: ${relativeScreenDensity(15)}px;
    background-color: ${({ theme }) => theme.colors.orange[2]};
	padding: ${relativeScreenDensity(15)}px;
	padding-bottom: ${relativeScreenDensity(25)}px;
`

export const HeaderActionsContainer = styled.View`
	gap: ${relativeScreenDensity(15)}px;
`

export const GreetingText = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
	font-family: 'Arvo_400Regular';
	color: ${({ theme }) => theme.colors.black[4]};
	text-align: center;
`

export const Body = styled.View`
	flex: 1;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: ${relativeScreenDensity(20)}px;
    padding: ${relativeScreenDensity(15)}px;
	background-color: ${({ theme }) => theme.colors.orange[1]};
`
