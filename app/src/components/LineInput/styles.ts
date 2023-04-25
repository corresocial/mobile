import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../common/screenDimensions'

export const Container = styled.TouchableHighlight`
    min-height: ${RFValue(52)}px;
    min-width: ${RFValue(42)}px;
    width: ${relativeScreenWidth(12.7)}px;
    height: ${relativeScreenWidth(12.7)}px;
    border-bottom-width: 2.5px;
    border-bottom-color: black;
    aling-items: center;
    justify-content: center;
`

export const TextInput = styled.TextInput`
    height: 100%;
    font-size: 20px;
    font-family: Arvo_400Regular;
    text-align: center;
	color: ${({ theme }) => theme.black4};
    padding: ${relativeScreenHeight(2)}px;
    max-Height: ${relativeScreenHeight(25)}px;

`
