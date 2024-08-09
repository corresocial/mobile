import * as Animatable from 'react-native-animatable'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const TouchableContainer = styled.TouchableWithoutFeedback`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white[2]};
`

export const ContainerBottom = styled(Animatable.View as any)`
	width: 100%;
	align-self: flex-end;
	flex-direction: row;
    border-radius: ${relativeScreenDensity(18)}px;
    position: relative;
    background-color: ${({ theme }) => theme.colors.black[4]};
`

export const ContainerSurface = styled.View`
	width: 100%;
	height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: ${relativeScreenDensity(3)}px solid black;
    border-radius: ${relativeScreenDensity(18)}px;
    padding: 0px ${relativeScreenDensity(20)}px;
    position: absolute;
	left: ${-relativeScreenDensity(9)}px;
`

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.colors.black[4]};
    font-family: Arvo_400Regular;
    text-align: center;
`
