import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenHeight } from '../../../common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 100%;
	height: ${screenHeight * 0.20}
    background-color: ${({ theme }) => theme.black4};
    border: ${RFValue(3)}px solid ${({ theme }) => theme.black4};
    border-radius: ${RFValue(13)}px;
    position: relative;
    overflow: hidden;
`

export const ContainerInner = styled.View`
	width: 97.9%;
    height: 100%;
    border-radius: ${RFValue(10)}px;
    position: absolute;
	flex-direction: row;
	overflow: hidden;
`

export const LeftArea = styled.View`
	width: 65%;
	height: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${RFValue(7)}px;
`

export const LeftAreaLimits = styled.View`
	flex: 1;
	justify-content: space-between;
	overflow: hidden;
`

export const Title = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(16)}px;
`

export const RightArea = styled.View`
	background-color: ${({ theme }) => theme.white3};
	height: 100%;
	width: 35%;
`

export const SidePicture = styled.ImageBackground`
	width: 100%;
	height: 100%;
	resize-mode: contain;
`
