import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { relativeScreenWidth } from "@common/screenDimensions";

export const ScrollView = styled.ScrollView`
	width: 100%;
	flex-direction: row;
`;

export const Container = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
`;

export const AddNewPicturesButton = styled.TouchableOpacity`
	width: ${relativeScreenWidth(20)}px;
	height: ${relativeScreenWidth(20)}px;
	border: 3px solid ${({ theme }) => theme.black4};
	background-color: ${({ theme }) => theme.white3};
	border-right-width: ${RFValue(4)}px;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
	margin-right: ${RFValue(10)}px;
`;

export const PictureItemButtom = styled.TouchableOpacity``;

export const PicturePortrait = styled.View`
	width: ${relativeScreenWidth(16)}px;
	height: ${relativeScreenWidth(16)}px;
	border: 2px ${({ theme }) => theme.black4};
	background-color: ${({ theme }) => theme.white3};
	border-radius: 15px;
	align-items: center;
	justify-content: center;
	margin-right: ${RFValue(10)}px;
	overflow: hidden;
`;

export const Picture = styled.Image`
	resize-mode: contain;
	width: ${relativeScreenWidth(16)}px;
	height: ${relativeScreenWidth(16)}px;
`;
