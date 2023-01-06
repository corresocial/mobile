import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
	flex: 1;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding-vertical: ${relativeScreenHeight(2)}px;
	padding-horizontal: ${relativeScreenWidth(3.5)}px;
`

export const Body = styled.View`
	width: 100%;
	height: 92%;
	background-color: ${({ theme }) => theme.orange2};
	padding-horizontal: ${relativeScreenWidth(3.5)}px;
`

export const NewLinkButtonContainer = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(12)}px;
	align-items: center;
	justify-content: center;
	padding-horizontal: ${relativeScreenWidth(12)}px;
`

export const Sigh = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(1.3)}px;
`
