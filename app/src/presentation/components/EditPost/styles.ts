import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
 	flex: 1;
	position: relative;
	background-color: ${({ theme }) => theme.colors.white[3]};
 `

export const Header = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	width: 100%;
 	padding: ${relativeScreenWidth(4)}px;
`

interface EditPostStyleProps {
	hasError?: boolean
	backgroundColor?: string
}

export const Body = styled.ScrollView<EditPostStyleProps>`
	flex: 1;
	background-color: ${({ theme, backgroundColor }) => (backgroundColor || theme.colors.white[3])};
 `

export const BodyPadding = styled(Body) <EditPostStyleProps>`
	background-color: ${({ theme, hasError, backgroundColor }) => (hasError ? theme.colors.red[2] : backgroundColor || theme.colors.orange[2])};
	padding: ${relativeScreenWidth(3.5)}px;
 `

export const SaveButtonContainer = styled.View`
	width: 100%;
	padding: 0px ${relativeScreenDensity(10)}px;
	padding-top: ${relativeScreenHeight(3)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const PostCardContainer = styled.View<EditPostStyleProps>`
	background-color: ${({ theme, hasError, backgroundColor }) => (hasError ? theme.colors.red[2] : backgroundColor || theme.colors.orange[2])};
	padding: ${relativeScreenWidth(3.5)}px;
 `
