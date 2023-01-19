import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../common/screenDimensions'

export const TagsSelectedArea = styled.View`
    padding-horizontal: 0px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: ${relativeScreenHeight(3)}px;
	overflow: visible;
`
