import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const ButtonsContainer = styled.View`
   width: 100%;
   height: 100%;
   justify-content: center;
`

export const Sigh = styled.View`
	height: ${relativeScreenHeight(6)}px;
`
