import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const CarouselIndicatorContainer = styled.View`
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    bottom: 10%;
    width: 100%;
`

interface CarouseIndicatorItemProps {
	indicatorColor?: string
}

export const CarouselActiveIndicatorItem = styled.View<CarouseIndicatorItemProps>`
    height: 15px;
    width: 16px;
    border-right-width: ${RFValue(3)}px;
    border-radius: ${RFValue(10)}px;
    border-width: ${RFValue(1.5)}px;

    border-color: ${({ theme }) => theme.black4};
    background-color: ${({ theme, indicatorColor }) => indicatorColor || theme.orange3};
    margin: 0px 2px;
`

export const CarouselInactiveIndicatorItem = styled.View<CarouseIndicatorItemProps>`
    height: 9px;
    width: 9px;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.black4};
	background-color: ${({ theme, indicatorColor }) => indicatorColor || theme.orange3};
    margin: 0px 2px;
`

export const FullScreenIconContainer = styled.View`
    position: absolute;
    top: 4%;
    right: 5%;
    z-index: 1;
`
