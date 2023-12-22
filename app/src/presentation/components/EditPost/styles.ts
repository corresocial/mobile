import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
 	flex: 1;
	position: relative;
	background-color: ${({ theme }) => theme.white3}
 `

export const Header = styled.View`
	background-color: ${({ theme }) => theme.white3}
	width: 100%;
 	padding: ${relativeScreenWidth(4)}px;
 `

interface EditPostStyleProps {
	hasError?: boolean
	backgroundColor?: string
}

export const Body = styled.ScrollView<EditPostStyleProps>`
	flex: 1;
	background-color: ${({ theme, backgroundColor }) => (backgroundColor || theme.white3)};
 `

export const BodyPadding = styled(Body) <EditPostStyleProps>`
	background-color: ${({ theme, hasError, backgroundColor }) => (hasError ? theme.red2 : backgroundColor || theme.orange2)};
	padding: ${relativeScreenWidth(3.5)}px;
 `

export const SaveButtonContainer = styled.View`
	width: 100%;
	padding-horizontal: ${relativeScreenWidth(3)}px;
	padding-top: ${relativeScreenHeight(3)}px;
 `

export const PostCardContainer = styled.View<EditPostStyleProps>`
	background-color: ${({ theme, hasError, backgroundColor }) => (hasError ? theme.red2 : backgroundColor || theme.orange2)};
	padding: ${relativeScreenWidth(3.5)}px;
 `
