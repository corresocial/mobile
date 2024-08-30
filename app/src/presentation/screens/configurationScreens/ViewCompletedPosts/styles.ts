import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenHeight(2)}px ${relativeScreenWidth(3.5)}px;
`

export const Body = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.orange[2]};
`

export const PostPadding = styled.View`
	padding: 0px ${relativeScreenWidth(2)}px;
`
