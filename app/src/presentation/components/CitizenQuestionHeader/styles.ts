import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: ${RFValue(20)}px;
    padding-right: ${RFValue(20)}px;
    height: ${RFValue(55)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.orange1};
`

export const ButtonsContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 25%;
    height: 100%;
`

export const ButtonArea = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${RFValue(40)}px;
    width: ${RFValue(40)}px;
`