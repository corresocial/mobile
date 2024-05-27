import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

interface ContainerProps {
	bottomNavigatorSpace: boolean
	height?: number
}
relativeScreenDensity(75)
export const Container = styled.View<ContainerProps>`
	width: 100%;
	height: ${({ bottomNavigatorSpace, height }) => (
		bottomNavigatorSpace
			? relativeScreenDensity(75)
			: height ? relativeScreenHeight(height) : relativeScreenDensity(10)
	)}px;
`
