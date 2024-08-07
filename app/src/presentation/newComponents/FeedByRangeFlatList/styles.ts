import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface FeedFlatListProps {
	backgroundColor: string | undefined
}

export const FeedFlatList = styled.FlatList<FeedFlatListProps>`
	flex: 1;
	background-color: ${({ backgroundColor }) => backgroundColor ?? 'transparent'};
	height: 100%;
	width: 100%;
`

export const NoPostNotifierContainer = styled.View`
	height: 100%;
	width: 100%;
`

export const PostCardContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`
