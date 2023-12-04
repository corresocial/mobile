import styled from 'styled-components/native'

import { relativeScreenHeight } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const InstructionCardContainer = styled.View`
	flex-direction: row;
	align-items: center;
    width: 90%;
    margin-top: ${relativeScreenHeight(1)}px;
`
