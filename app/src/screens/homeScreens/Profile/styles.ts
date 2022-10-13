import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

export const Body = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.orange2}
`

export const ProfileHeader = styled.View`
    width: 100%;
    height: 100%;
    flex-direction: row;
`

console.log(RFValue(18))

export const InfoArea = styled.View`
    flex: 1;
    justify-content: space-between;
    padding-horizontal: ${RFValue(16)}px;
    padding-vertical: ${RFValue(2)}px;
`

export const UserName = styled.Text`
    height: 50%;
    font-size: ${RFValue(18)}px;
    font-family: Arvo_700Bold;
`

export const OptionsArea = styled.View`
    height: 40%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`