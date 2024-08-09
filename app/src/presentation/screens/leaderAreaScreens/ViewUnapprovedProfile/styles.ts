import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const UserPostsFlatList = styled.FlatList`
	flex: 1;
	width: ${relativeScreenWidth(100)}px;
	background-color: 'transparent';
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
    font-family: Arvo_700Bold;
`

export const SeeMoreLabel = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.orange4};
`

export const OptionsArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const VerticalPaddingContainer = styled.View`
	padding: ${relativeScreenHeight(1)}px 0px;
`

export const Body = styled.ScrollView`
	z-index: 0;
    flex: 1;
	width: 100%;
	padding: 0px ${relativeScreenWidth(5)}px;
	background-color: ${({ theme }) => theme.orange2};
	overflow: hidden;
`

export const PostPadding = styled.View`
	padding: 0px ${relativeScreenWidth(2)}px;
`

export const PostFilterContainer = styled.View`
	padding: ${relativeScreenHeight(1.25)}px 0px;
	background-color: ${({ theme }) => theme.orange2};

`
