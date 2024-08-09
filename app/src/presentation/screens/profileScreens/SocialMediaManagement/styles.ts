import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenHeight(2)}px ${relativeScreenWidth(3.5)}px;
`

export const Body = styled.View`
	flex: 1;
	width: 100%;
	height: 92%;
	background-color: ${({ theme }) => theme.colors.orange[2]};
	padding: 0px ${relativeScreenWidth(3.5)}px;
`

export const NewLinkButtonContainer = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(12)}px;
	align-items: center;
	justify-content: center;
	padding: 0px ${relativeScreenWidth(12)}px;
`
