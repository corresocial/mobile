import styled from 'styled-components/native'
import { screenHeight, screenWidth } from '../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const CarouselItemContainer = styled.View`
    align-items: center;
    justify-content: center;
    height: ${screenHeight * 0.55}px;
    padding: 40px;
`

export const Slogan = styled.Text`
    font-size: 20px;
    font-family: Arvo_400Regular;
`

export const TermsButtonContainer = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background.tertiary};  
    align-items: center;
    justify-content: center;
    padding:  ${screenWidth * 0.08}px;
`

export const TermsLabel = styled.Text`
    color: ${({theme}) => theme.font.primary};    
    font-size: 18px;
    text-align: center;
    font-family: Arvo_400Regular;
    margin-bottom: 30px;
`

export const TermsLabelHighlight = styled.Text`
    color: ${({theme}) => theme.font.secondary};    
    font-size: 18px;
    text-align: center;
    font-family: Arvo_700Bold;
    font-weight: bold;
`