import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Header = styled.View`
	background-color: ${({ theme }) => theme.colors.orange[1]};
	width: 100%;
 	padding: ${relativeScreenWidth(4)}px;
`

export const SaveButtonContainer = styled.View`
	width: 100%;
	padding: 0px ${relativeScreenDensity(10)}px;
	padding-top: ${relativeScreenHeight(3)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const Body = styled.View`
	flex: 1;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: ${relativeScreenDensity(20)}px;
    padding: 0 ${relativeScreenDensity(15)}px;
	background-color: ${({ theme }) => theme.colors.orange[2]};
`

export const QuestionaryList = styled.FlatList`
	flex: 1;
`
