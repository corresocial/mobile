import styled from "styled-components/native";
import { Animated } from "react-native";
import { relativeScreenHeight } from "@common/screenDimensions";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.orange3};
	align-items: center;
	justify-content: center;
	position: relative;
`;

export const BuildingsContainer = styled(Animated.View)`
	position: absolute;
	bottom: 0;
	align-self: center;
`;

export const LogoContainer = styled(Animated.View)``;

export const BottomLine = styled.View`
	position: absolute;
	bottom: 0;
	height: ${relativeScreenHeight(0.4)}px;
	width: 100%;
	background-color: ${({ theme }) => theme.black4};
`;
