import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const PostPadding = styled.View`
	padding: 0px ${relativeScreenWidth(2)}px;
`

export const Container = styled.View`
	flex: 1;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenHeight(2)}px ${relativeScreenWidth(3.5)}px;
`

interface BodyProps {
	backgroundColor?: string
}

export const Body = styled.View<BodyProps>`
	flex: 1;
	width: 100%;
	height: 92%;
	background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.orange2};
	padding: 0px ${relativeScreenWidth(3.5)}px;
`

export const SaveButtonContainer = styled.View`
	width: 100%;
	padding: 0px ${relativeScreenDensity(10)}px;
	padding-top: ${relativeScreenHeight(3)}px;
 `
