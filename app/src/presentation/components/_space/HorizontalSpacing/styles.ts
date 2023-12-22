import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	width?: number
}

export const Container = styled.View<ContainerProps>`
	width: ${({ width }) => width || relativeScreenWidth(2.7)}px;
	height: 100%;
`
