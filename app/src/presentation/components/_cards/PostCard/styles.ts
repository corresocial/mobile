import { ImageBackground, ImageBackgroundProps } from 'expo-image'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 98%;
	height: ${relativeScreenDensity(120)}px;
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

interface SideAreaProps {
	backgroundColor: string
	hasMediaOrSaleValue: boolean
}

export const LeftArea = styled.View<SideAreaProps>`
	background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.orange1};
	width: ${({ hasMediaOrSaleValue }) => (hasMediaOrSaleValue ? '32%' : `${0}px`)};
	height: 100%;
	flex: 1;
	overflow: hidden;
`

interface SideMediaProps extends ImageBackgroundProps {
	hasMedia: boolean
}

export const SideMedia = styled(ImageBackground) <SideMediaProps>`
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: ${({ hasMedia }) => (hasMedia ? 'flex-end' : 'center')};
	flex: 1;
`

export const SaleValueContainer = styled.View`
	border-width: ${RFValue(2)}px;
	border-right-width: ${RFValue(5)}px;
	border-color: ${({ theme }) => theme.black4};
	border-radius: ${RFValue(7)}px;
	background-color: ${({ theme }) => theme.black4};
	align-self: center;
	align-content: center;
`

export const SaleValueContainerInner = styled.View`
	border-color: ${({ theme }) => theme.black4};
	border-radius: ${RFValue(5)}px;
	padding: ${RFValue(1)}px ${RFValue(4)}px;
	background-color: ${({ theme }) => theme.white3};
`

export const LeftSideLabel = styled.View`
	width: 3%;
`

export const TitleContainer = styled.View`
	border-left-width: ${RFValue(2.5)}px;
	padding: 0px ${RFValue(6)}px;
	overflow: hidden;
	border-color: ${({ theme }) => theme.black4};
`

export const Title = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(15)}px;
`

export const RightArea = styled.View<Omit<SideAreaProps, 'backgroundColor'>>`
	width: ${({ hasMediaOrSaleValue }) => (hasMediaOrSaleValue ? '67%' : '98%')};
	height: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${RFValue(7)}px ${RFValue(7)}px;
`

export const RightAreaLimits = styled.View`
	flex: 1;
	justify-content: center; // TODO space-around?
	overflow: hidden;
`

export const VideoIconContainer = styled.View`
	flex: 1;
	width: 100%;
	height: 100%;
	position: absolute;
	justify-content: center;
	align-items: center;
`

interface WaitingApproveIconContainerProps {
	hasValues?: boolean
	hasPicture?: boolean
}

export const WaitingApproveIconContainer = styled.View<WaitingApproveIconContainerProps>`
	flex: 1;
	flex-direction: column;
	justify-content:center;
	${({ hasValues, hasPicture }) => `
		justify-content: ${(!hasValues ? (hasPicture ? 'flex-start ' : 'center') : 'flex-start')};
	`}
	padding: ${relativeScreenDensity(5)}px 0px;
`
