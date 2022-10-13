import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenHeight, screenWidth } from '../../common/screenDimensions'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.black4};
    width: 100%;
    border: ${RFValue(5)}px solid ${({ theme }) => theme.black4};
    border-right-width:  ${RFValue(8)}px;
    border-radius:  ${RFValue(10)}px;
    position: relative;
`

export const DeleteItemArea = styled.TouchableOpacity`
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    padding: 10px;
    bottom: 5px;
    right: 5px;
`