import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    padding: ${RFValue(20)}px;
    padding-bottom: 0px;
    flex-direction: row;    
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: scroll;
`