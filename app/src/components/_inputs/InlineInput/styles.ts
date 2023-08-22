import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { TextStyle } from 'react-native'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface ContainerProps {
	multiline?: boolean
	multilineInputHeight?: number
	width?: string
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	width: ${({ width }) => width || '100%'};
	height: ${({ multiline, multilineInputHeight }) => (multiline ? multilineInputHeight : relativeScreenHeight(9))}px;
	min-height: ${RFValue(52)}px;
	min-width: ${RFValue(42)}px;

    aling-items: center;
    justify-content: center;
	padding-horizontal: ${RFValue(20)}px;
	padding-top: ${RFValue(10)}px;
	padding-bottom: ${RFValue(20)}px;
	border-radius: ${RFValue(15)}px;
	overflow: hidden;
`

interface ContainerInnerProps {
	hasIcon?: boolean
}

export const ContainerInner = styled.View<ContainerInnerProps>`
	flexDirection: column;
	justifyContent: space-between;

	${({ hasIcon }) => hasIcon && (
		`alignItems: center;
		justifyContent: space-between;`
	)}

`

export const BottomLine = styled.View<ContainerInnerProps>`
	width: 100%;
	border-radius: ${RFValue(50)}px;
`

interface TextInputProps {
	fontSize: number
	textAlign?: TextStyle['textAlign']
	width?: string
	hasMultiline?: boolean
	hasIcon?: boolean
	textAlignVertical?: TextStyle['textAlignVertical']
}

export const TextInput = styled.TextInput<TextInputProps>`
    height: 100%;
	font-size: ${({ fontSize }) => RFValue(fontSize)}px;
	text-align: ${({ textAlign }) => textAlign};
	text-align-vertical: ${({ hasMultiline }) => (hasMultiline ? 'top' : 'center')};
	width: ${({ hasIcon }) => (hasIcon ? '85%' : '100%')};


    font-family: Arvo_400Regular;
    text-align: center;
	color: ${({ theme }) => theme.black4};
    padding-vertical: ${relativeScreenHeight(1.5)}px;
    max-Height: ${relativeScreenHeight(25)}px;
`
