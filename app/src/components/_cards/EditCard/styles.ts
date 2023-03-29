import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { relativeScreenWidth } from "@common/screenDimensions";

export const CardHeader = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const ValueContainer = styled.View`
	padding-top: ${RFValue(8)}px;
	padding-bottom: ${RFValue(5)}px;
`;

export const Text = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(14)}px;
`;

export const PictureArea = styled.View`
	width: 100%;
	height: ${relativeScreenWidth(88)}px;
	border-width: ${RFValue(2)}px;
	border-color: ${({ theme }) => theme.black4};
	border-radius: ${RFValue(15)}px;
	background-color: ${({ theme }) => theme.black4};
	overflow: hidden;
`;

export const ProfilePicture = styled.Image`
	flex: 1;
	resize-mode: cover;
	overflow: hidden;
`;
