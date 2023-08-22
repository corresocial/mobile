import * as Animatable from 'react-native-animatable'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.TouchableWithoutFeedback`
   width: 100%;
`
export const TouchableContainer = styled.TouchableWithoutFeedback`
    width: 100%;
    background-color: ${({ theme }) => theme.white2}
`

export const ContainerBottom = styled(Animatable.View)`
    width: 98%;
	align-self: flex-end;
    flex-direction: row;
    border-radius: ${RFValue(20)}px;
    position: relative;
    background-color: ${({ theme }) => theme.black4};
`

export const ContainerSurface = styled.View`
	width: 100%;
	height: 100%;
	flex-direction: row;
    background-color: ${({ theme }) => theme.white3};
    border: ${RFValue(3.5)}px solid black;
    border-radius:${RFValue(20)}px;
    position: absolute;
    overflow: hidden;
	left: ${-RFValue(8)}px;
`

export const LeftArea = styled.View`
    background-color: ${({ theme }) => theme.orange3}
    height: 101%;
    align-items: center;
    justify-content: center;
	border-right-width: ${RFValue(3.5)}px;
	border-color: ${({ theme }) => theme.black4};
`

interface LeftSideTextProps {
	leftSideTextColor?: string
}

export const LeftSideText = styled.Text<LeftSideTextProps>`
	text-align: center;
	color: ${({ theme, leftSideTextColor }) => leftSideTextColor || theme.white3};
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`

export const LabelDescriptionArea = styled.View`
    flex: 1;
    padding-vertical: ${RFValue(12)}px;
    padding-horizontal: ${RFValue(12)}px;
    height: 100%;
    justify-content: space-around;
`

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: ${RFValue(20)}px;
    font-family: Arvo_400Regular;
`

export const Description = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-family: Arvo_400Regular;
`

interface ShortDescriptionProps {
	fontSize?: number
}

export const ShortDescription = styled.Text<ShortDescriptionProps>`
	width: 100%;
	align-self: center;
	text-align: center;
	font-size: ${({ fontSize }) => (fontSize || RFValue(11))}px;
	margin-top: 3%;
    color: ${({ theme }) => theme.black4};
    font-family: Arvo_400Regular;
`
