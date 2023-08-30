import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../common/screenDimensions'

interface ContainerProps {
	width?: number
}

export const Container = styled.View<ContainerProps>`
	width: ${({ width }) => width || relativeScreenHeight(1.25)}px;
	height: 100%;
`
