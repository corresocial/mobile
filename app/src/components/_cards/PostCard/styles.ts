import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenHeight } from '../../../common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 100%;
	height: ${screenHeight * 0.20}
    background-color: ${({ theme }) => theme.black4};
    border: ${RFValue(3)}px solid ${({ theme }) => theme.black4};
    border-right-width:  ${RFValue(8)}px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
`

export const ContainerInner = styled.View`
	width: 100%;
    height: 100%;
    border-radius: 10px;
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
	height: 17%;
	overflow: hidden;
`
export const Ower = styled.View`
	width: 100%;
	align-items: center;
	flex-direction: row;
`

export const OwerPicture = styled.View`
	width: ${RFValue(35)}px;
	height: ${RFValue(35)}px;
	border: ${RFValue(2)}px solid ${({ theme }) => theme.black4};
	border-radius: 5px;
`

export const MiniaturePortrait = styled.Image`
	width: 100%;
	height: 100%;
`

export const OwerInfo = styled.View`
	padding: ${RFValue(8)}px;
`

export const OwerName = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_700Bold;
`

export const PostDateTime = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`

export const SaleExchangeValue = styled.View`
	flex-direction: row;
	align-items: flex-end;
`

export const SmallFont = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
	padding-bottom: 1%;
`

export const LargeFont = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: Arvo_700Bold;
	margin-left: 1%;
`

export const Decimals = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
	margin-right: 1%;
	padding-bottom: 1%;
`

export const RightArea = styled.View`
	background-color: gray;
	height: 100%;
	width: 35%;
`

export const SidePicture = styled.ImageBackground`
	width: 100%;
	height: 100%;
	resize-mode: contain;
`
