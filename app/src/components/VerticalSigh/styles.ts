import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../common/screenDimensions'

interface ContainerProps {
	height?: number
}

export const Container = styled.View<ContainerProps>`
	width: 100 %;
	height: ${({ height }) => height || relativeScreenHeight(1.5)}px;
`
