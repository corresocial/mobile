import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
 	flex: 1;
	position: relative;
 `

export const Header = styled.View`
	background-color: ${({ theme }) => theme.white3}
	width: 100%;
 	padding: ${relativeScreenWidth(4)}px;
 `

export const Body = styled.ScrollView`
	flex: 1;
	background-color: ${({ theme }) => theme.purple2}
	padding: ${relativeScreenWidth(3.5)}px;
 `

export const SaveButtonContainer = styled.View`
	width: 100%;
	padding-horizontal: ${relativeScreenWidth(3)}px;
	padding-top: ${relativeScreenHeight(3)}px;
 `

export const Sigh = styled.View`
	height: ${relativeScreenHeight(1.25)}px;
 `

export const LastSigh = styled.View`
	height: ${relativeScreenHeight(3.75)}px;
 `
