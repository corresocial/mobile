import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions';

export const Container = styled.View`
    flex: 1;
`

export const PicturePreviewContainer = styled.View`
    flex: 1;
    height: ${screenHeight * 0.81}px;
    padding-horizontal: ${RFValue(15)}px;
    padding-vertical: 0px;
    justify-content: space-around;
    align-items: center;
    margin-top: ${-statusBarHeight}px;
`
