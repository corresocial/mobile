import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const ProfileHeader = styled.View`
    margin-top: ${-statusBarHeight / 2}px;
    width: 100%;
`

export const ProfileInfoContainer = styled.View`
    flex-direction: row;
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
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`

export const ExpandedUserDescriptionArea = styled.View`
	margin-top: ${RFValue(12)}px;
	width: 100%;
	height: ${screenHeight * 0.1}px;
`

export const ExpandedUserDescription = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`
export const OptionsArea = styled.View`
	padding-bottom: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const Body = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.orange2};
	padding: ${RFValue(12)}px;
	overflow: visible;
`

export const NewPostButtonArea = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
`

export const FlatList = styled.FlatList`
	margin-top: ${RFValue(15)}px;
`

export const Sigh = styled.View`
	width: 100%;
	height: ${RFValue(5)}px;
`

export const FooterSigh = styled.View`
	width: 100%;
	height: ${RFValue(64)}px;
`
