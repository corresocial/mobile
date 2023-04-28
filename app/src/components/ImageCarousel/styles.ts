import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const CarouselIndicatorContainer = styled.View`
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    bottom: ${RFValue(15)}px;
    width: 100%;
`

interface CarouselActiveIndicatorItemProps {
	indicatorColor?: string
}

export const CarouselActiveIndicatorItem = styled.View<CarouselActiveIndicatorItemProps>`
    height: 15px;
    width: 16px;
    border-right-width: ${RFValue(3)}px;
    border-radius: ${RFValue(10)}px;
    border-width: ${RFValue(1.5)}px;

    border-color: ${({ theme }) => theme.black4};
    background-color: ${({ theme, indicatorColor }) => indicatorColor || theme.orange3};
    margin-horizontal: 2px;
`

export const CarouselInactiveIndicatorItem = styled.View`
    height: 6px;
    width: 6px;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.black4};
    background-color: ${({ theme }) => theme.black4};
    margin-horizontal: 2px;
`
