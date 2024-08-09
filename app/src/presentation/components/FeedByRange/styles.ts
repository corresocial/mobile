import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps {
	backgroundColor?: string
}

export const Container = styled.ScrollView<ContainerProps>`
	background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.orange2};
`

export const PostCardContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`
