import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const WithoutPostsContainer = styled.View`
	background-color: ${({ theme }) => theme.white3};
	padding: ${RFValue(15)}px ${RFValue(30)}px;
	border-left-width: ${relativeScreenWidth(1.4)}px;
	border-left-color: ${({ theme }) => theme.black4};
`

export const WithoutPostsTitle = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(17)}px;
	margin-bottom: ${RFValue(10)}px;
`

export const WithoutPostsText = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(13)}px;
`
