import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`

`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding-vertical: ${relativeScreenHeight(2)}px;
	padding-horizontal: ${relativeScreenWidth(3)}px;
`

export const ButtonContainer = styled.View`
	width: 100%;
	align-items: center;
	padding-horizontal: ${relativeScreenWidth(6)}px;
	padding-top: ${relativeScreenWidth(6)}px;
`
