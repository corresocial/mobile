import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../common/screenDimensions'

export const ScrollView = styled.ScrollView`
    width: 100%;
    flex-direction: row;
`

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
`

export const HorizontalSigh = styled.View`
	width: ${relativeScreenWidth(5)}px;
`
