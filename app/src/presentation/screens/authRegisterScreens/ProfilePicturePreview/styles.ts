import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const InstructionCardContainer = styled.View`
	flex-direction: row;
	align-items: center;
    width: 90%;
    margin-top: ${relativeScreenHeight(1)}px;
`

export const ButtonsContainer = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(20)}px;
`
