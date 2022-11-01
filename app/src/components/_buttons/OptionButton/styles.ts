import * as Animatable from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
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
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: ${RFValue(13)}px;
    position: relative;
    background-color: ${({ theme }) => theme.black4};
`

export const ContainerSurface = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius:${RFValue(13)}px;
    border: ${RFValue(2)}px solid black;
    background-color: ${({ theme }) => theme.white3};
    overflow: hidden;
    position: absolute;
	right: ${RFValue(8)}px;
`

export const IconArea = styled.View`
    background-color: ${({ theme }) => theme.orange3}
    height: 100%; 
    align-items: center;
    justify-content: center;
`

export const LabelDescriptionArea = styled.View`
    flex: 1;
    padding-vertical: ${RFValue(15)}px;
    padding-horizontal: ${RFValue(15)}px;
    height: 100%;
    justify-content: space-around;
`

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: ${RFValue(20)}px;
    font-family: Arvo_400Regular;
`

export const ButtonDescription = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: ${RFValue(13)}px;
    font-family: Arvo_400Regular;
`