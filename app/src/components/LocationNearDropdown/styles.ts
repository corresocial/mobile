import { Animated } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../common/screenDimensions'

export const Container = styled(Animated.View)`
	width: 100%;
	background-color: ${({ theme }) => theme.black4};
	border: ${RFValue(2.5)}px solid black;
	border-right-width: ${RFValue(6)}px;
	border-radius: ${RFValue(15)}px;
	overflow: hidden;
`

export const ContainerInner = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
	border-radius: ${RFValue(13)}px;
	overflow: hidden;
`

export const DropdownHeaderContainer = styled.View`
	background-color: ${({ theme }) => theme.white3};
	width: 100%;
	height: ${relativeScreenHeight(8)}px;
	border-radius: ${RFValue(13)}px;
	padding-horizontal: ${RFValue(15)}px;
	padding-vertical: ${RFValue(10)}px;
	padding-bottom: 0px;
`

export const DropdownHeader = styled.TouchableOpacity`
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const DropdownBody = styled.View`
	padding: ${RFValue(10)}px;
`

export const MyLocationButtonContainer = styled.View`
	width: 100%;
	padding-left: ${RFValue(7)}px;
`
