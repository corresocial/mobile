import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const MediaBrowserModalContainer = styled.Modal`
    flex: 1;
`

interface MediaBrowserHeaderProps {
	isIos: boolean
}

export const MediaBrowserHeader = styled.View<MediaBrowserHeaderProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
	justify-content: space-between;
    padding-left: ${relativeScreenWidth(8)}px;
    padding-top: ${({ isIos }) => (isIos ? relativeScreenHeight(2) : 0)}px;
    height: ${({ isIos }) => (isIos ? relativeScreenHeight(18) : relativeScreenHeight(12))}px;
`

export const HeaderTextContent = styled.View`
	flex-direction: row;
    align-items: center;
	justify-content: space-between;
`
interface HeaderTextContentProps {
	flex?: number
}

export const MediaBrowserHeaderText = styled.Text<HeaderTextContentProps>`
	flex: ${({ flex }) => flex};
    padding-left: ${relativeScreenWidth(3)}px;
    font-size: ${RFValue(20)}px;
    text-align: start;
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

interface IndicatorContainerProps {
	isLoadingMore: boolean
}

export const ActivityIndicatorContainer = styled.View<IndicatorContainerProps>`
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: ${({ isLoadingMore }) => (isLoadingMore ? relativeScreenHeight(45) : relativeScreenHeight(5))}px;
    align-items: center;
    justify-content: center;
`

export const ActivityIndicatorBg = styled.View`
    background-color: ${({ theme }) => theme.white3};
    padding: 2px;
    border-radius: 100px;
`
