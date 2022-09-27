import styled from 'styled-components/native'
import { screenHeight, screenWidth } from '../../common/screenDimensions'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.black4};
    width: 100%;
    height: ${screenWidth * 0.828}px;
    margin-bottom: ${screenHeight * 0.05}px;
    
    border: 5px solid ${({ theme }) => theme.black4};
    border-right-width: 10px;
    border-radius: 10px;
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