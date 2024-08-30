import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const InstructionCardContainer = styled.View`
    width: 85%;
    margin-top: ${relativeScreenDensity(50)}px;
`

export const TopArea = styled.View`
	flex: 1;
	padding: 0 ${relativeScreenDensity(20)}px;
	padding-right: ${relativeScreenDensity(25)}px;
	flex-direction: row;
	align-items: center;
`

export const ButtonsContainer = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(20)}px;
`
