import * as Animatable from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { screenHeight } from "../../../common/screenDimensions";

export const Container = styled.TouchableWithoutFeedback`
   width: 100%;
`
export const TouchableContainer = styled.TouchableWithoutFeedback`
    width: 100%;
`

export const ContainerBottom = styled(Animatable.View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: ${RFValue(5)}px;
    position: relative;
    background-color: ${({ theme }) => theme.black4};
`

export const ContainerSurface = styled.View`
flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: ${RFValue(5)}px;
    border: ${RFValue(1.5)}px solid black;
    position: absolute;
	right: ${RFValue(5)}px;
`
