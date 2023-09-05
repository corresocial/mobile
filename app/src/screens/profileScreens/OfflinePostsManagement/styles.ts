import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const PostPadding = styled.View`
	padding-horizontal: ${relativeScreenWidth(2)}px;
`

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
	flex: 1;
	width: 100%;
	height: 92%;
	background-color: ${({ theme }) => theme.orange2};
	padding-horizontal: ${relativeScreenWidth(3.5)}px;
`

export const SaveButtonContainer = styled.View`
	width: 100%;
	padding-horizontal: ${relativeScreenWidth(3)}px;
	padding-top: ${relativeScreenHeight(3)}px;
 `
