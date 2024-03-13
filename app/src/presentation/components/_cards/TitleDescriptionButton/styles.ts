import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface TextProps {
	textColor?: string
}

interface TitleProps extends TextProps {
	checked?: boolean
	fontSize?: number
}

export const Container = styled.View`
	width: 100%;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${RFValue(17)}px;
    justify-content: space-around;
	position: relative;
`

export const ContainerInner = styled.TouchableOpacity`
   	width: 100%;
   	height: 100%;
    background-color: ${({ theme }) => theme.white3};
    border: ${RFValue(2)}px solid ${({ theme }) => theme.black4};
    border-radius: ${RFValue(15)}px;
    padding: ${RFValue(10)}px  ${RFValue(15)}px;
    justify-content: space-around;
	left: ${RFValue(-5)}px;
`

export const TitleArea = styled.View`
	flex-direction: row;
	justify-content: space-between;
`

export const Title = styled.Text<TitleProps>`
    width: ${({ checked }) => (checked ? '70%' : '100%')};
    font-size:  ${({ fontSize }) => (fontSize ? RFValue(fontSize) : RFValue(22))}px;
    color:  ${({ textColor, theme }) => (textColor || theme.black4)};
    font-family: Arvo_400Regular;
`

export const Description = styled.Text<TextProps>`
    width: 100%;
    font-family: Arvo_400Regular;
    font-size:  ${RFValue(14)}px;
	color:  ${({ textColor, theme }) => (textColor || theme.black4)};
`

export const Footer = styled.View`
    width: 100%;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-end;
`

export const SmallThinFont = styled.Text`
	text-align: right;
    font-family: Arvo_400Regular;
    font-size:  ${RFValue(18)}px;
    color: ${({ theme }) => theme.black4};
`

export const SmallStrongFont = styled.Text`
	text-align: right;
    font-family: Arvo_700Bold;
    font-size:  ${RFValue(18)}px;
    color: ${({ theme }) => theme.black4};
`

export const LargeStrongFont = styled.Text`
	text-align: right;
    font-family: Arvo_700Bold;
    font-size:  ${RFValue(25)}px;
    color: ${({ theme }) => theme.black4};
`
