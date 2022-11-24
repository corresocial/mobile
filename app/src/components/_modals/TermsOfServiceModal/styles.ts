import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.transparence.orange1};
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