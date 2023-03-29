import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { relativeScreenHeight } from "@common/screenDimensions";

export const CardHeader = styled.View`
	padding-horizontal: ${RFValue(15)}px;
	padding-vertical: ${RFValue(10)}px;
`;

export const TextAddress = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
	padding: ${RFValue(10)}px;
`;

export const MapArea = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(30)}px;
	border-width: ${RFValue(2)}px;
	border-radius: ${RFValue(15)}px;
	overflow: hidden;
	position: relative;
`;

export const NavigationApps = styled.View`
	position: absolute;
	flex-direction: row;
	align-items: center;
	bottom: ${RFValue(0)}px;
	right: ${RFValue(0)}px;
`;

export const TouchableApp = styled.TouchableOpacity``;
