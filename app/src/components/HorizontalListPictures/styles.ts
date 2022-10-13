import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenWidth } from '../../common/screenDimensions'

export const ScrollView = styled.ScrollView`
    width: 100%;
    flex-direction: row;
`

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
`

export const AddNewPicturesButton = styled.TouchableOpacity`
    width: ${screenWidth * 0.2}px;
    height: ${screenWidth * 0.2}px;
    border: 3px solid ${({ theme }) => theme.black4};
    background-color: ${({ theme }) => theme.white3};
    border-right-width: ${RFValue(4)}px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    margin-right: ${RFValue(10)}px;
`

export const PictureItemButtom = styled.TouchableOpacity`
    
`

export const PicturePortrait = styled.View`
    width: ${screenWidth * 0.16}px;
    height: ${screenWidth * 0.16}px;
    border: 2px ${({ theme }) => theme.black4};
    background-color: ${({ theme }) => theme.white3};
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    margin-right: ${RFValue(10)}px;
    overflow: hidden;
`

export const Picture = styled.Image`
    resize-mode: contain;
    width: ${screenWidth * 0.18}px;
    height: ${screenWidth * 0.18}px;
`