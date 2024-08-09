import { Image } from 'expo-image'
import styled from 'styled-components/native'

import { relativeScreenWidth, relativeScreenDensity } from '@common/screenDimensions'

export const ScrollView = styled.ScrollView`
    width: 100%;
    flex-direction: row;
`

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
`

export const PictureItemButtom = styled.TouchableOpacity<PicturePortraitProps>`
	background-color: ${({ theme }) => theme.black4};
	margin-right: ${relativeScreenDensity(10)}px;
	overflow: hidden;
	align-items: center;
	justify-content: center;
	border-radius: ${relativeScreenDensity(15)}px;

	border-width: ${({ pictureSelected }) => (pictureSelected ? relativeScreenDensity(2) : relativeScreenDensity(3))}px;
	border-right-width: ${({ pictureSelected }) => (pictureSelected ? relativeScreenDensity(3) : relativeScreenDensity(6))}px;
`

interface PicturePortraitProps {
	pictureSelected: boolean
}

export const PicturePortrait = styled.View<PicturePortraitProps>`
	width: ${relativeScreenWidth(16)}px;
	height: ${relativeScreenWidth(16)}px;
	border-color:  ${({ theme }) => theme.black4};
	background-color: ${({ theme }) => theme.black4};
	border-radius: ${relativeScreenDensity(12)}px;
	align-items: center;
	justify-content: center;
	opacity: ${({ pictureSelected }) => (pictureSelected ? 1 : 0.5)};

	overflow: hidden;
`

export const Picture = styled(Image)`
    width: 100%;
    height: 100%;
`
