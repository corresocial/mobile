import styled from "styled-components/native";
import { Animated } from 'react-native'

import { statusBarHeight } from "../../../common/screenDimensions";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(Animated.View)`
    padding-top: ${statusBarHeight}px;
    border-bottom-width: ${RFValue(5)}px;   
    border-bottom-color:  ${({ theme }) => theme.black4}; 
    transition: background-color 1s ease;
    flex-direction: row;
`