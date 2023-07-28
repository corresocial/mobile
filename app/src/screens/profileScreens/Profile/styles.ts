import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.ScrollView`
    flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const ProfileHeader = styled.View`
	padding-top: 10px;
    width: 100%;
`

export const ProfileInfoContainer = styled.View`
    flex-direction: row;
	align-items: center;
`

export const VerticalSigh = styled.View`
	height: 100%;
	width: ${relativeScreenWidth(3)}px;
`

export const InfoArea = styled.View`
	justify-content: center;
    flex: 1;
    padding-horizontal: ${RFValue(16)}px;
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

export const ExpandedUserDescription = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`
export const OptionsArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const VerticalPaddingContainer = styled.View`
	padding-vertical: ${relativeScreenHeight(1)}px;
`

export const Body = styled.View`
    flex: 1;
	height: ${relativeScreenHeight(70)}px;
	padding-top: ${RFValue(12)}px;
    background-color: ${({ theme }) => theme.orange2};
	overflow: visible;
`

export const BodyPadding = styled(Body)`
	padding: ${RFValue(12)}px;
`

export const FlatList = styled.FlatList`

`

export const Sigh = styled.View`
	width: 100%;
	height: ${RFValue(5)}px;
`

export const FooterSigh = styled.View`
	width: 100%;
	height: ${RFValue(64)}px;
`
