import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const MediaBrowserModalContainer = styled.Modal`
    flex: 1;
`

export const MediaBrowserHeader = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 ${relativeScreenWidth(8)}px;
    height: 12%;
`

export const MediaBrowserHeaderText = styled.Text`
    padding-left: ${relativeScreenWidth(3)}px;
    font-size: ${RFValue(20)}px;
    text-align: center;
	font-family: Arvo_700Bold;
`

export const MediaBrowserScrollView = styled.ScrollView`
    flex: 1;
    background-color: black;
`

export const AlbumContainer = styled.View`
    flex: 1;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    background-color: black;
    padding: ${relativeScreenWidth(0.5)}px;
`

export const MediaFlatListContainer = styled.View`
    flex: 1;
    justify-content: center;
    background-color: black;
    padding: ${relativeScreenWidth(0.5)}px;
`

export const MediaFlatList = styled.FlatList`
    flex: 1;
    background-color: black;
`

export const ConfirmSelectionButton = styled.View`
    position: absolute;
    bottom: ${relativeScreenWidth(5)}px;
    right: ${relativeScreenWidth(5)}px;
`

export const NotPermissionText = styled.Text`
   color:  ${({ theme }) => theme.black1};
   font-size: 17px;
   text-align: center;
   margin-top: 20px;
   margin-bottom: 20px;
`
