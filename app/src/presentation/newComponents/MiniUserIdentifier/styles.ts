import { Image } from 'expo-image'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const OwnerDataContainer = styled.View`
	align-items: center;
	flex-direction: row;
	flex: 1;
	gap: ${relativeScreenWidth(2)}px;
`

export const OwnerProfileTouchable = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`

export const OwnerProfilePicture = styled(Image)`
	width: ${relativeScreenWidth(12)}px;
	height: ${relativeScreenWidth(12)}px;
	border-radius: ${relativeScreenDensity(12)}px;
`

export const UserPictureArea = styled.View`
	border-radius: ${relativeScreenDensity(15)}px;
	margin-left: ${relativeScreenDensity(5)}px;
	width: ${relativeScreenWidth(12)}px;
	height: ${relativeScreenWidth(12)}px;
	position: relative;
	background-color: ${({ theme }) => theme.colors.black[4]};
`

export const UserPictureAreaInner = styled.TouchableOpacity`
	border: ${relativeScreenDensity(2)}px solid ${({ theme }) => theme.colors.black[4]};
	width: 100%;
	height: 100%;
	border-radius: ${relativeScreenDensity(14)}px;
	background-color: ${({ theme }) => theme.colors.white[3]};
	overflow: hidden;
	justify-content: center;
	align-items: center;
`

export const OwnerTextGroup = styled.View`
	flex: 1;
	width: 100%;
	align-items: column;
	justify-content: center;
`

export const OwnerName = styled.Text`
	width: 80%;
	font-family: 'Arvo_700Bold';
	font-size: ${({ theme }) => theme.fontSizes[1]}px;
`

export const PostDate = styled.Text`
	font-family: 'Arvo_400Regular';
	font-size: ${({ theme }) => theme.fontSizes[1]}px;
`
