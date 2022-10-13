import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { screenWidth } from "../../../common/screenDimensions";

export const Container = styled.View`
    flex: 1;
    padding:  ${RFValue(25)}px;
    align-items: center;
    justify-content: space-around;
`