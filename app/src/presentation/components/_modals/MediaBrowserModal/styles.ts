import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

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
    font-size: ${({ theme }) => theme.fontSizes[10]}px;
    text-align: left;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
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
`

export const MediaFlatListContainer = styled.View`
    flex: 1;
    justify-content: center;
    background-color: black;
`

export const MediaFlatList = styled.FlatList`
    flex: 1;
    background-color: black;
`

export const ConfirmSelectionButton = styled.View`
    position: absolute;
    bottom: ${relativeScreenDensity(40)}px;
    right: ${relativeScreenDensity(20)}px;
`

export const NotPermissionText = styled.Text`
 	color:  ${({ theme }) => theme.colors.white[1]};
	font-size: 17px; // REFACTOR relative
	text-align: center;
   	align-self: center;
 	position: absolute;
	top: ${relativeScreenHeight(50)}px;
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
    background-color: ${({ theme }) => theme.colors.white[3]};
    padding: 2px;
    border-radius: 100px;
`

export const InvalidAssetContainer = styled.View`
    z-index: 1;
    position: absolute;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    bottom: ${relativeScreenWidth(25)}px;
`

export const InvalidAssetAlert = styled.View`
    background-color: ${({ theme }) => theme.colors.white[3]};
    padding: ${relativeScreenDensity(15)}px;
    border-radius: ${relativeScreenDensity(10)}px;
`

export const InvalidDurationText = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    text-align: center;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
`
