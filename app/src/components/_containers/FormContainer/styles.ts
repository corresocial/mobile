import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    padding:  ${RFValue(25)}px;
    align-items: center;
    overflow: hidden;
    justify-content: space-around;
`