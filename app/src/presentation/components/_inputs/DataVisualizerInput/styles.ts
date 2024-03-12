import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight } from '@common/screenDimensions'

interface InputContainerProps{
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
    border-bottom-width: 5px;
    border-color: black;
    margin: 4px;
`

export const InputText = styled.Text`
    flex: 1;
    font-size: ${RFValue(16)}px;
    font-family: Arvo_400Regular;
    vertical-align: middle;
    text-align: center;
	color: ${({ theme }) => theme.black4};
`