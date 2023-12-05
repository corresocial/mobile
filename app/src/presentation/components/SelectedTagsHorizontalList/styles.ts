import styled from 'styled-components/native'

import { relativeScreenHeight } from '@common/screenDimensions'

export const TagsSelectedArea = styled.View`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-top: ${relativeScreenHeight(1)}px;
	overflow: visible;
`
