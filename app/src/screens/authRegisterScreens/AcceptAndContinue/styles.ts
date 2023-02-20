import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const CarouselItemContainer = styled.View`
    align-items: center;
    justify-content: center;
    height: ${relativeScreenHeight(55)}px;
    padding:  ${RFValue(30)}px;
`

export const Slogan = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: Arvo_400Regular;
`

export const TermsButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding:  ${relativeScreenWidth(8)}px;
`

export const TermsLabel = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: ${RFValue(18)}px;
    text-align: center;
    font-family: Arvo_400Regular;
    margin-bottom:  ${RFValue(30)}px;
`

export const TermsLabelHighlight = styled.Text`
    color: ${({ theme }) => theme.orange4};
    font-size:${RFValue(18)}px;
    text-align: center;
    font-family: Arvo_700Bold;
    font-weight: bold;
`
