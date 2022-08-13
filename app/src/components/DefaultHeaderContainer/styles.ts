import styled from "styled-components/native";
import { Animated } from 'react-native'

import { screenHeight } from "../../common/screenDimensions";

export const Container = styled(Animated.View)`
    height: ${screenHeight * 0.55}px;
    background-color: ${({ theme }) => theme.background.secondary};
    border-bottom-width: 5px;   
    border-bottom-color:  ${({ theme }) => theme.background.quaternary}; 
    transition: background-color 1s ease;
`