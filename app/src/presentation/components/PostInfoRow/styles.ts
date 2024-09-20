import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	withoutMarginTop?: boolean
	topic?: boolean
}

export const Container = styled.View<ContainerProps>`
	margin-top:  ${({ withoutMarginTop, topic }) => (!withoutMarginTop && !topic ? relativeScreenHeight(2) : relativeScreenWidth(0.5))}px;
	margin-bottom: ${({ topic }) => (!topic ? relativeScreenHeight(1) : 0)}px;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`

interface PostInfoTextProps {
	hasSeccondSvgIcon: boolean,
	topic?: boolean
}

export const PostInfoText = styled.Text<PostInfoTextProps>`
	${({ hasSeccondSvgIcon }) => (!hasSeccondSvgIcon ? 'flex: 1' : 'margin-right: 4%')};
	margin-left: ${({ topic }) => (topic ? 0 : relativeScreenWidth(4))}px;
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: 'Arvo_400Regular';
`
