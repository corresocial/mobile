import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 10%;
    padding-right: ${RFValue(20)}px;
`