import { TextStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight } from '@common/screenDimensions'

interface ContainerProps {
	multiline?: boolean
	hasMultipleInputs?: boolean
	multilineInputHeight?: number
	width?: string
	height?: number
	onIconPress?: boolean
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	width: ${({ width }) => width || '100%'};
	height: ${({ multiline, multilineInputHeight, height }) => (multiline ? height || multilineInputHeight : relativeScreenHeight(9))}px;
	min-height: ${RFValue(42)}px;
	min-width: ${RFValue(42)}px;

    justify-content: flex-start;
	padding: 0px ${({ hasMultipleInputs }) => (hasMultipleInputs ? RFValue(7) : RFValue(20))}px;
	padding-top: ${RFValue(12)}px;
	padding-bottom: ${RFValue(20)}px;
	border-radius: ${RFValue(15)}px;
	overflow: hidden;

	${({ onIconPress }) => {
		if (onIconPress) {
			return (`
				justify-content: center;
				padding-top: ${RFValue(5)}px;
				padding-bottom: ${RFValue(5)}px;
			`)
		}
	}};
`

interface ContainerInnerProps {
	hasIcon?: boolean
}

export const ContainerInner = styled.View<ContainerInnerProps>`
	justify-content: center;

${({ hasIcon }) => hasIcon && (
		`flex-direction: row;
		align-items: center;
		justify-content: space-between;`
	)};
`

export const BottomLine = styled.View<ContainerInnerProps>`
	width: 100%;
	border-radius: ${RFValue(50)}px;
`

interface TextInputProps {
	fontSize: number
	textAlign?: TextStyle['textAlign']
	width?: string
	height?: number
	hasMultiline?: boolean
	hasIcon?: boolean
	hasDoubleIcon?: boolean
	textAlignVertical?: TextStyle['textAlignVertical']
}

export const TextInput = styled.TextInput<TextInputProps>`
    height: ${({ height }) => (height ? `${height}px` : '100%')};
	font-size: ${({ fontSize }) => RFValue(fontSize)}px;
	text-align: ${({ textAlign }) => textAlign};
	text-align-vertical: ${({ hasMultiline }) => (hasMultiline ? 'top' : 'center')};
	width: ${({ hasIcon, hasDoubleIcon }) => (hasDoubleIcon ? '70%' : hasIcon ? '85%' : '100%')};

    font-family: Arvo_400Regular;

	color: ${({ theme }) => theme.black4};
    max-height: ${relativeScreenHeight(25)}px;
`

export const SideButtonContainer = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
`
