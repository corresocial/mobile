import styled from "styled-components/native";
import {
	relativeScreenHeight,
	relativeScreenWidth,
} from "@common/screenDimensions";

export const Container = styled.View`
	flex: 1;
	position: relative;
`;

export const ContainerBottom = styled.View`
	flex: 1;
`;

export const InputTagArea = styled.View`
	width: 100%;
	padding-horizontal: ${relativeScreenWidth(4)}px;
	padding-top: ${relativeScreenHeight(1.4)}px;
`;

export const TagsUnselectedArea = styled.View`
	padding-horizontal: ${relativeScreenWidth(3)}px;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	margin-bottom: 30px;
	flexwrap: wrap;
`;

export const FloatButtonContainer = styled.View`
	align-self: center;
	align-items: center;
	justify-content: center;
	width: 85%;
	position: absolute;
	bottom: ${relativeScreenHeight(1.4)}px;
`;

export const Sigh = styled.View`
	height: ${relativeScreenHeight(10)}px;
	width: 100%;
`;
