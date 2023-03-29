import styled from "styled-components/native";
import {
	relativeScreenHeight,
	relativeScreenWidth,
} from "@common/screenDimensions";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.purple2};
`;

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding-vertical: ${relativeScreenHeight(2)}px;
	padding-horizontal: ${relativeScreenWidth(3)}px;
`;

export const UserAndValueContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const OptionsArea = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Body = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.purple2};
	padding: ${relativeScreenWidth(3)}px;
`;

export const Sigh = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(1.5)}px;
`;

export const LastSigh = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(10)}px;
`;
