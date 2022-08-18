import styled from "styled-components/native";
import { screenHeight, screenWidth } from "../../common/screenDimensions";


export const Container = styled.View`
    flex: 1;
    padding-vertical: 50px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.black4}
`

export const CameraContainer = styled.View`
    width: ${screenWidth}px;
    height: ${screenWidth}px;
`

export const FlashButtonContainer = styled.View`
    width: 100%;
    height: 10%;
    alignItems: center;
    justifyContent: center;
    position: absolute;
    bottom: ${screenWidth * 0.25}px;
`

export const FlashButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.white3};
    min-width: 35px;
    width: ${screenWidth * 0.09}px;
    min-height: 35px;
    height: ${screenWidth * 0.09}px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`

export const Footer = styled.View`
    width: 100%;
    height: 10%;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
`

export const CameraControlsContainer = styled.View`
    width: 70%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const GaleryButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.white3};
    min-width: 35px;
    width: ${screenWidth * 0.09}px;
    min-height: 35px;
    height: ${screenWidth * 0.09}px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`

export const TakePictureButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.green2};
    border-color:${({ theme }) => theme.green5};
    min-width: 70px;
    width: ${screenWidth * 0.09}px;
    min-height: 70px;
    height: ${screenWidth * 0.09}px;
    border-radius: 70px;
    border-width: 15px;
    align-items: center;
    justify-content: center;
`

export const CameraTypeButton = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.white3};
    min-width: 35px;
    width: ${screenWidth * 0.09}px;
    min-height: 35px;
    height: ${screenWidth * 0.09}px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`