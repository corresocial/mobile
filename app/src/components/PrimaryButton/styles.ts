import styled from "styled-components/native";
import { screenHeight } from "../../common/screenDimensions";

export const Container = styled.TouchableWithoutFeedback`
   width: 100%;
`
export const TouchableContainer = styled.TouchableWithoutFeedback`
    width: 100%
`

export const ContainerBottom = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 52px;
    height: ${screenHeight * 0.07}px;
    border-radius: 10px;
    
    position: relative;
    background-color: ${({ theme }) => theme.background.quaternary};
`

export const ContainerSurface = styled.View`
flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 52px;
    height: ${screenHeight * 0.07}px;
    border-radius: 10px;
    border: 2px solid black;
    padding-horizontal: 20px;
    
    position: absolute;
	right: 4px;
`

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.font.primary};
    font-size: 18px;
    font-family: Arvo_400Regular;
    margin-right: 15px;
`

/* LEGADO

import styled from "styled-components/native";
import { screenHeight } from "../../common/screenDimensions";

export const Container= styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 52px;
    height: ${screenHeight * 0.07}px;
    border-radius: 10px;
    border: 2px solid black;
    border-right-width: 5px;
    padding-horizontal: 20px;
`

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.font.primary};
    font-size: 18px;
    font-family: Arvo_400Regular;
    margin-right: 15px;
`
*/