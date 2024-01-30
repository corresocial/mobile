import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const ContainerBottom = styled.View`
	margin-left: 10px;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${RFValue(20)}px;
    align-items: center;
    align-self: center;
`

export const ContainerSurface = styled.View`
	border-radius: ${RFValue(20)}px;
	border: ${RFValue(3.5)}px solid ${({ theme }) => theme.black4};
	padding: 5px 0px;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
	flex-direction: row;
`

export const Label = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: Arvo_700Bold;
    padding: ${relativeScreenHeight(0.7)}px ${relativeScreenWidth(3)}px;
    text-align: center;
    max-width: ${relativeScreenWidth(35)}px;
`
