import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

interface ContainerProps {
	bottomNavigatorSpace: boolean
	relativeDensity: boolean
	height?: number
	extraBottom: number
}

export const Container = styled.View<ContainerProps>`
	width: 100%;
	height: ${({ bottomNavigatorSpace, relativeDensity, height, extraBottom }) => (
		bottomNavigatorSpace
			? relativeScreenDensity(100) + extraBottom
			: height
				? relativeDensity ? relativeScreenDensity(height) : relativeScreenHeight(height)
				: relativeScreenDensity(8)
	)}px;
`
