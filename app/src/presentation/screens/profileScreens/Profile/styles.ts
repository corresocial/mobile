import { TextProps } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const UserPostsFlatList = styled.FlatList`
	flex: 1;
	width: ${relativeScreenWidth(100)}px;
	background-color: rgba(0,0,0,0);
`

export const ProfileHeader = styled.View`
    width: 100%;
`

export const ProfileInfoContainer = styled.View`
    flex-direction: row;
	align-items: center;
`

export const InfoArea = styled.View`
	justify-content: center;
    flex: 1;
    padding: 0px ${relativeScreenDensity(16)}px;
`

export const UserName = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
	font-family: 'Arvo_700Bold';
`

export const UserDescription = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[3]}px;
	font-family: 'Arvo_400Regular';
`

export const ExpandedUserDescriptionArea = styled.View`
	margin-top: ${relativeScreenDensity(12)}px;
	width: 100%;
`

export const SeeMoreLabel = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: 'Arvo_400Regular';
	color: ${({ theme }) => theme.colors.orange[4]};
`

export const ExpandedUserDescription = styled.Text<TextProps>`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: 'Arvo_400Regular';
`

export const OptionsArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const VerticalPaddingContainer = styled.View`
	padding: ${relativeScreenHeight(1)}px 0px;
`

export const Body = styled.View`
    flex: 1;
	height: ${relativeScreenHeight(70)}px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.orange[2]};
	overflow: visible;
`

export const PostPadding = styled.View`
	padding: 0px ${relativeScreenWidth(2)}px;
`

export const PostFilterContainer = styled.View`
	padding: ${relativeScreenHeight(1.25)}px 0px;
	background-color: ${({ theme }) => theme.colors.orange[2]};

`
