import { LinearGradient } from 'expo-linear-gradient'
import { TextProps } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SafeAreaViewProps } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
	background-color: ${({ theme }) => theme.white3};
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
    padding: 0px ${RFValue(16)}px;
`

export const UserName = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: Arvo_700Bold;
`

export const UserDescription = styled.Text`
	font-size: ${RFValue(13)}px;
	font-family: Arvo_400Regular;
`

export const ExpandedUserDescriptionArea = styled.View`
	margin-top: ${RFValue(12)}px;
	width: 100%;
`

export const SeeMoreLabel = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.orange4};
`

export const ExpandedUserDescription = styled.Text<TextProps>`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`
export const OptionsArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const SafeAreaViewContainer = styled.SafeAreaView<SafeAreaViewProps>`
	flex: 0;
	background-color: ${({ theme }) => theme.white3};
`

export const VerticalPaddingContainer = styled.View`
	padding-vertical: ${relativeScreenHeight(1)}px;
`

export const OffBounceBackground = styled(LinearGradient as any)`
	flex: 1;
`

export const Body = styled.SafeAreaView`
    flex: 1;
	height: ${relativeScreenHeight(70)}px;
	overflow: visible;
`

export const PostPadding = styled.View`
	padding: 0px ${relativeScreenWidth(2)}px;
`
