import { TextInputProps } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface DescriptionProps {
	bolded?: boolean
	fontSize?: number
}

export const Container = styled.View`
    height: 100%;
    background-color: ${({ theme }) => theme.transparence.orange1};
	justify-content: center;
	align-items: center;
`

export const TouchCloseArea = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const Content = styled.View`
    width: 88%;
    background-color: ${({ theme }) => theme.black4}
    border-radius: ${RFValue(15)}px;
    border-width: ${RFValue(5)}px;
    justify-content: space-between;
    border-color: ${({ theme }) => theme.black4}
    border-right-width: ${RFValue(11)}px;
 `

export const ContentInner = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.white3}
	padding: ${RFValue(25)}px;
	padding-top: ${RFValue(15)}px;
	border-radius: ${RFValue(10)}px;
	justify-content: space-between;
`

export const Header = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${RFValue(20)}px;
`

export const Title = styled.Text`
	flex: 1;
    font-family: Arvo_700Bold;
    font-size: ${RFValue(22)}px;
    color: ${({ theme }) => theme.black3}
`

export const Description = styled.Text<DescriptionProps>`
	margin-bottom: ${RFValue(20)}px;
    font-family: ${({ bolded }) => (bolded ? 'Arvo_700Bold' : 'Arvo_400Regular')};
    font-size: ${({ fontSize }) => (fontSize ? RFValue(fontSize) : RFValue(17))}px;
    color: ${({ theme }) => theme.black3}
`

export const TextInput = styled.TextInput<TextInputProps>`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(13)}px;
	margin: ${RFValue(20)}px 0px;
	padding: ${RFValue(10)}px;
	border-bottom-width: ${RFValue(5)}px;
`
