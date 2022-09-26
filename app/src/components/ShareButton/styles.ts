import * as Animatable from 'react-native-animatable';
import styled from "styled-components/native";
import { screenHeight } from "../../common/screenDimensions";

export const Container = styled.TouchableWithoutFeedback`
   width: 100%;
`
export const TouchableContainer = styled.TouchableWithoutFeedback`
    width: 100%;
`

export const ContainerBottom = styled(Animatable.View)`
    margin-left: 4px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 25px;
    height: ${screenHeight * 0.04}px;
    border-radius: 5px;
    position: relative;
    background-color: ${({ theme }) => theme.black4};
`

export const ContainerSurface = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 25px;
    height: ${screenHeight * 0.04}px;
    border-radius: 5px;
    border: 1.5px solid black;
    position: absolute;
	right: 4px;
`

export const ButtonLabel = styled.Text`
    margin-left: 10px;
    color: ${({ theme }) => theme.black4};
    font-family: Arvo_400Regular;
`