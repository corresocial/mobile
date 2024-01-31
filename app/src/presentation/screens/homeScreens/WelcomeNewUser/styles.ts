import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

export const ContainerButtons = styled.View`
    flex: 1;
    justify-content: space-around;
    padding: ${RFValue(40)}px 0px;
`
