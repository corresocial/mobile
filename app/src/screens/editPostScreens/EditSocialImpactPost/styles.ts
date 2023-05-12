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

interface ErrorProps {
	hasError: boolean
}

export const Body = styled.ScrollView<ErrorProps>`
 	flex: 1;
`

export const BodyPadding = styled(Body) <ErrorProps>`
	background-color: ${({ theme, hasError }) => (hasError ? theme.red2 : theme.pink2)};
	padding: ${relativeScreenWidth(3.5)}px;
`

export const SaveButtonContainer = styled.View`
	width: 100%;
	padding-horizontal: ${relativeScreenWidth(3)}px;
	padding-top: ${relativeScreenHeight(3)}px;
`

export const PostCardContainer = styled.View<ErrorProps>`
	background-color: ${({ theme, hasError }) => (hasError ? theme.red2 : theme.pink2)};
	padding: ${relativeScreenWidth(3.5)}px;
`
