import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { screenWidth } from "../../common/screenDimensions";

export const Container = styled.TouchableHighlight`
    min-height: ${RFValue(52)}px;
    min-width: ${RFValue(42)}px;
    width: ${screenWidth * 0.127}px;
    height: ${screenWidth * 0.127}px;
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
    padding: 15px;

`