import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const Header = styled.View`
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenDensity(12)}px;
	padding-bottom: 0px;
`

export const TextInstruction = styled.Text`
	color: ${({ theme }) => theme.colors.black[4]};
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    font-family: Arvo_400Regular;
	text-align: center;
`

export const InputContainer = styled.View`
	margin: ${relativeScreenWidth(5)}px 0px;
	height: ${relativeScreenDensity(50)}px;
	padding: ${relativeScreenWidth(2)}px ${relativeScreenWidth(2)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const Body = styled.View`
	flex: 1;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.orange[2]};
`

export const ProfileList = styled.FlatList`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.orange[2]};
`
