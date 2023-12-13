import { ViewStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.TouchableWithoutFeedback`
   width: 100%;
`
export const TouchableContainer = styled.TouchableWithoutFeedback`
    width: 100%;
`

interface ConainerBottomProps {
	relativeWidth: string | number
	height: number
	rounded: boolean
}

export const ContainerBottom = styled.View<ConainerBottomProps>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-left: ${RFValue(6)}px;
	position: relative;
	background-color: ${({ theme }) => theme.black4};
	height: ${({ height }) => height}px;
	width: ${({ relativeWidth }) => (typeof (relativeWidth) === 'string' ? relativeWidth : `${relativeWidth}px`)};
	border-radius: ${({ rounded, height }) => (rounded ? height / 2 : RFValue(12))}px;
`

interface ConainerSurfaceProps {
	backgroundColor: string
	flexDirection: ViewStyle['flexDirection']
	buttonPressed: boolean
	rounded: boolean
}

export const ContainerSurface = styled.View<ConainerSurfaceProps>`
	height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: ${RFValue(2.5)}px solid black;
    position: absolute;
	right: ${RFValue(5)}px;
	margin-right: ${({ buttonPressed }) => (buttonPressed ? RFValue(-4) : 0)}px;
	background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.white3};
	border-radius: ${({ rounded }) => (rounded ? 500 : RFValue(12))}px;
`

export const ButtonLabel = styled.Text`
    margin-left: ${RFValue(8)}px;
    color: ${({ theme }) => theme.white3};
    font-family: Arvo_700Bold;
`
