import { ImageBackground } from 'expo-image'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 98%;
	height: ${relativeScreenDensity(100)}px;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${RFValue(23)}px;
    position: relative;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

export const ContainerInner = styled.View`
	width: 100%;
    height: 100%;
	flex-direction: row;
	background-color: ${({ theme }) => theme.white3};
    border: ${RFValue(3)}px solid ${({ theme }) => theme.black4};
    border-radius: ${RFValue(23)}px;
    position: absolute;
	overflow: hidden;
	left: ${-relativeScreenWidth(2)}px;
`

export const LeftArea = styled.View`
	background-color: ${({ theme }) => theme.orange1};
	height: 100%;
	flex: 1;
	overflow: hidden;
`

export const SidePicture = styled(ImageBackground)`
	width: 100%;
	height: 100%;
	align-items: center;
	flex: 1;
`

export const UserName = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(15)}px;
`

export const DescriptionContainer = styled.View`
	border-left-width: ${RFValue(2.5)}px;
	padding: 0px ${RFValue(6)}px;
	overflow: hidden;
	border-color: ${({ theme }) => theme.black4};
`

export const UserDescription = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(13)}px;
`

export const RightArea = styled.View`
	width: 70%;
	height: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${RFValue(7)}px ${RFValue(7)}px;
`

export const RightAreaLimits = styled.View`
	flex: 1;
	justify-content: space-around;
	overflow: hidden;
`
export const WaitingApproveIconContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: flex-end;
	padding: ${relativeScreenDensity(5)}px 0px;
`
