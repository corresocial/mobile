import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

interface ContainerProps {
	bottomNavigatorSpace: boolean
	relativeDensity: boolean
	height?: number
}
relativeScreenDensity(75)
export const Container = styled.View<ContainerProps>`
	width: 100%;
	height: ${({ bottomNavigatorSpace, relativeDensity, height }) => (
		bottomNavigatorSpace
			? relativeScreenDensity(100)
			: height
				? relativeDensity ? relativeScreenDensity(height) : relativeScreenHeight(height)
				: relativeScreenDensity(10)
	)}px;
`
