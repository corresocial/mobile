import styled from "styled-components/native";
import {StatusBar} from 'react-native';
import { Animated } from 'react-native'

import { screenHeight } from "../../common/screenDimensions";

export const Container = styled(Animated.View)`
    padding-top: ${StatusBar.currentHeight as number * 2}px;
    height: ${screenHeight * 0.55}px;
    border-bottom-width: 5px;   
    border-bottom-color:  ${({ theme }) => theme.black4}; 
    transition: background-color 1s ease;
    flex-direction: row;
`