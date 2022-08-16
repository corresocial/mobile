import styled from 'styled-components/native';

export const CarouselIndicatorContainer = styled.View`
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    bottom: 30px;
    width: 100%;
`
//TODO box-shadow not suported
export const CarouselActiveIndicatorItem = styled.View` 
    height: 15px;
    width: 16px;
    border-right-width: 3px;
    border-radius: 10px;
    border-width: 1px;

    border-color: ${({ theme }) => theme.black4};
    background-color: ${({ theme }) => theme.orange2};
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