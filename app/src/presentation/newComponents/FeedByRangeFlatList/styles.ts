import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

export const FlashListContainer = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(100)}px;
`

export const NoPostNotifierContainer = styled.View`
	height: 100%;
	width: 100%;
`

export const PostCardContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`
