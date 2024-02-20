import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView`
    width: 100%;
    flex-direction: row;
`

export const Container = styled.View`
    width: 100%;
    height: ${RFValue(40)}px;
    flex-direction: row;
    align-items: center;
`
