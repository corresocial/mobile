import styled from "styled-components/native";

export const GalleryModal = styled.Modal`
    flex: 1;
    height: 100%;
    width: 100%;
    background-color: black;
`

export const ImageContainer = styled.TouchableOpacity`
    flex: 1;
    border-width: 0;
    justify-content: 'center';
`

export const GalleryContainer = styled.View`
    justify-content: center;
    flex: 1;
    background-color: black;
`

export const CloseButton = styled.TouchableOpacity`
    top: 20px;
    position: absolute;
    z-index: 2;
`

export const LeftButton = styled.TouchableOpacity`
    position: absolute;
    width: 20px;
    z-index: 2;
    top: 50%;
    left: 5%;
    background-color: red;
`

export const RightButton = styled.TouchableOpacity`
    position: absolute;
    width: 20px;
    z-index: 2;
    top: 50%;
    right: 5%;
    background-color: blue;
`