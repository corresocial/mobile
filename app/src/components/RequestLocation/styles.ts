import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { relativeScreenHeight } from "@common/screenDimensions";

export const Container = styled.View`
	height: ${relativeScreenHeight(25)}px;

	background-color: ${({ theme }) => theme.white3};
	align-items: flex-start;
	justify-content: space-between;
	padding-horizontal: ${30}px;
	padding-vertical: ${15}px;
	border-left-width: ${RFValue(5)}px;
	border-color: ${({ theme }) => theme.black4};
`;

export const Title = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${20}px;
`;

export const Text = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${13}px;
`;
