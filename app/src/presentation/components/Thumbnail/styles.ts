import styled from "styled-components/native";

interface ContainerProps {
    active: boolean
}

export const ThumbnailContainer = styled.TouchableOpacity<ContainerProps>`
    display:flex;
    align-items: center;
    justify-content: center;
    margin-left: 7px;
    margin-right: 7px;
    width: 70px;
    height: 70px;
    border-radius: 22px;
    background-color: ${(props) => (props.active ? 'white' : 'black')};
`

export const ThumbnailImage = styled.Image`
    width: 96%;
    height: 96%;
    border-radius: 20px;
    border-color: black;
    border-width: 4px;
`