import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const MediaThumbnailView = styled.TouchableOpacity`
    margin: ${relativeScreenWidth(0.5)}px;
    width: ${relativeScreenWidth(32)}px;
    height: ${relativeScreenWidth(32)}px;
`

export const MediaThumbnailImage = styled.Image`
    flex: 1;
`

export const ThumbnailOverlay = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex: 1;
    position: absolute;
    z-index: 1;
    background-color: 'rgba(255, 255, 255, 0.7)';
`

export const SelectionIndicatorView = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: ${relativeScreenWidth(7)}px;
    width: ${relativeScreenWidth(7)}px;
    bottom: ${relativeScreenWidth(1)}px;
    right: ${relativeScreenWidth(1)}px;
    background-color: ${({ theme }) => theme.orange3};
    border-radius: ${RFValue(15)}px;
    border-width: 2px;
`

export const VideoIndicator = styled.View`
    position: absolute;
    flex: 1;
    z-index: 2;
    bottom: ${relativeScreenWidth(2)}px;
    
`