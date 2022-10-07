import * as Animatable from 'react-native-animatable';
import styled from "styled-components/native";
import { screenHeight } from "../../../common/screenDimensions";

export const Container = styled.TouchableWithoutFeedback`
   width: 100%;
`
export const TouchableContainer = styled.TouchableWithoutFeedback`
    width: 100%;
    background-color: ${({ theme }) => theme.white2}
`

export const ContainerBottom = styled(Animatable.View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${screenHeight * 0.16}px;
    border-radius: 10px;
    
    position: relative;
    background-color: ${({ theme }) => theme.black4};
`

export const ContainerSurface = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: ${screenHeight * 0.16}px;
    border-radius: 10px;
    border: 3px solid black;
    position: absolute;
	right: 5px;
    background-color: ${({ theme }) => theme.white3};
    overflow: hidden;
`

export const IconArea = styled.View`
    background-color: ${({ theme }) => theme.orange3}
    width: 30%;
    height: 101%; 
    align-items: center;
    justify-content: center;
`

export const LabelDescriptionArea = styled.View`
    flex: 1;
    padding-vertical: 15px;
    padding-horizontal: 25px;
    height: 100%;
    justify-content: space-around;
`

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: 20px;
    font-family: Arvo_400Regular;
    margin-right: 15px;
`

export const ButtonDescription = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: 13px;
    font-family: Arvo_400Regular;
    margin-right: 15px;
`