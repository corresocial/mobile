import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const OwnerDataContainer = styled.View`
	align-items: center;
	flex-direction: row;
	gap: ${relativeScreenWidth(2)}px;
`

export const OwnerProfileTouchable = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`

export const OwnerProfilePicture = styled.Image`
	width: ${relativeScreenWidth(12)}px;
	height: ${relativeScreenWidth(12)}px;
	border-radius: ${relativeScreenDensity(12)}px;
`

export const OwnerTextGroup = styled.View`
	flex: 1;
	align-items: column;
	justify-content: center;
`

export const OwnerName = styled.Text`
	width: 80%;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes.arvo[2]}px;
`

export const PostDate = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme }) => theme.fontSizes.arvo[1]}px;
`
