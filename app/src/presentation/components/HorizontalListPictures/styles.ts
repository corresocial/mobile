import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

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
	margin-right: ${RFValue(10)}px;
	overflow: hidden;
	align-items: center;
	justify-content: center;
	border-radius: ${RFValue(15)}px;

	border-width: ${({ pictureSelected }) => (pictureSelected ? RFValue(2) : RFValue(3))}px;
	border-right-width: ${({ pictureSelected }) => (pictureSelected ? RFValue(3) : RFValue(6))}px;
`

interface PicturePortraitProps {
	pictureSelected: boolean
}

export const PicturePortrait = styled.View<PicturePortraitProps>`
	width: ${relativeScreenWidth(16)}px;
	height: ${relativeScreenWidth(16)}px;
	border-color:  ${({ theme }) => theme.black4};
	background-color: ${({ theme }) => theme.black4};
	border-radius: ${RFValue(12)}px;
	align-items: center;
	justify-content: center;
	opacity: ${({ pictureSelected }) => (pictureSelected ? 1 : 0.5)};

	overflow: hidden;
`

export const Picture = styled.Image`
    width: 100%;
    height: 100%;
`
