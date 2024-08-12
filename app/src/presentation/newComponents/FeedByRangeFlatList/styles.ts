import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const NoPostNotifierContainer = styled.View`
	height: 100%;
	width: 100%;
`

export const PostCardContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`
