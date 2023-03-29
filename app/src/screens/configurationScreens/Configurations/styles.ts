import Constants from "expo-constants";
import { Platform } from "react-native";
import styled from "styled-components/native";
import {
	relativeScreenHeight,
	relativeScreenWidth,
} from "@common/screenDimensions";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
`;

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding-vertical: ${relativeScreenHeight(2)}px;
	padding-horizontal: ${relativeScreenWidth(3.5)}px;
`;

export const Body = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white1};
	padding-vertical: ${relativeScreenWidth(4)}px;
	padding-horizontal: ${relativeScreenWidth(7)}px;
`;

export const Sigh = styled.View`
	width: 100%;
	height: ${relativeScreenWidth(3)}px;
`;
