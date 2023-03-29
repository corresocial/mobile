import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {
	relativeScreenHeight,
	relativeScreenWidth,
} from "@common/screenDimensions";

export const Container = styled.TouchableOpacity`
	width: 98%;
	height: ${relativeScreenHeight(20)}px;
	background-color: ${({ theme }) => theme.black4};
	border-radius: ${RFValue(13)}px;
	position: relative;
	overflow: visible;
	margin-left: ${relativeScreenWidth(1.9)}px;
`;

export const ContainerInner = styled.View`
	width: 100%;
	height: 100%;

	background-color: ${({ theme }) => theme.white3};
	border: ${RFValue(3)}px solid ${({ theme }) => theme.black4};

	border-radius: ${RFValue(13)}px;
	position: absolute;
	flex-direction: row;
	overflow: hidden;
	left: ${-relativeScreenWidth(2)}px;
`;

export const LeftArea = styled.View`
	width: 65%;
	height: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${RFValue(7)}px;
`;

export const LeftAreaLimits = styled.View`
	flex: 1;
	justify-content: space-between;
	overflow: hidden;
`;

export const Title = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(16)}px;
`;

export const RightArea = styled.View`
	background-color: ${({ theme }) => theme.black4};
	height: 100%;
	width: 35%;
	overflow: hidden;
`;

export const SidePicture = styled.ImageBackground`
	width: 100%;
	height: 100%;
	resize-mode: contain;
`;
