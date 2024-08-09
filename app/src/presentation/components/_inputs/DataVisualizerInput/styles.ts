import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight } from '@common/screenDimensions'

interface InputContainerProps {
    defaultColor: string,
    validColor: string,
    valid?: boolean
}

export const InputContainer = styled.TouchableOpacity<InputContainerProps>`
    padding: 4%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: ${relativeScreenHeight(9)}px;
    background-color: ${(props) => (props.valid ? props.validColor : props.defaultColor)};
    border-radius: ${RFValue(14)}px;
`

export const InputInfoSection = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 4px;
`

interface InputTextUnderLineProps {
    valid?: boolean
}

export const InputTextUnderLine = styled.View<InputTextUnderLineProps>`
    height: ${({ valid }) => (valid ? 5 : 3)}px;
    border-radius: 20px;
    background-color: black;
`

interface InputTextProps {
    valid?: boolean
}

export const InputText = styled.Text<InputTextProps>`
    flex: 1;
    font-size: ${({ theme }) => theme.fontSizes[6]}px;
    font-family: ${({ valid }) => (valid ? 'Arvo_700Bold' : 'Arvo_400Regular')};
    vertical-align: middle;
    text-align: center;
	color: ${({ theme, valid }) => (valid ? theme.black4 : theme.black1)};
    font-weight: ${({ valid }) => (valid ? 'bold' : 'normal')};
`
