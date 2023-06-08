import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ContainerProps {
	calledFromConfig?: () => void
}

export const Container = styled.View<ContainerProps>`
    background-color: ${({ calledFromConfig, theme }) => (calledFromConfig ? theme.orange2 : theme.transparence.orange2)};
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${RFValue(25)}px;
    overflow: hidden;
`

export const LinkButtonsContainer = styled.View`
    width: 100%;
    height: ${RFValue(150)}px;
    justify-content: space-around;
    margin-bottom: ${RFValue(30)}px;
`
