import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {
	relativeScreenHeight,
	relativeScreenWidth,
} from "@common/screenDimensions";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
`;

export const ContainerContent = styled.View``;

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding-vertical: ${relativeScreenHeight(2)}px;
	padding-horizontal: ${relativeScreenWidth(3.5)}px;
`;

export const Body = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.green2};
	padding-horizontal: ${relativeScreenWidth(7)}px;
	padding-vertical: ${relativeScreenWidth(4)}px;
`;

export const BoldPhrase = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: Arvo_700Bold;
`;

export const Title = styled.Text`
	font-size: ${RFValue(30)}px;
	font-family: Arvo_700Bold;
`;

export const TextMedium = styled.Text`
	font-size: ${RFValue(20)}px;
	font-family: Arvo_400Regular;
`;

export const Sigh = styled.View`
	width: 100%;
	height: ${relativeScreenWidth(6)}px;
`;

export const ButtonContainer = styled.View`
	margin-vertical: ${relativeScreenHeight(2)}px;
	width: 100%;
`;
