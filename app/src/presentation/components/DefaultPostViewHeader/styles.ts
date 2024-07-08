import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ContainerProps {
	ignorePlatform?: boolean
}

export const Container = styled.View<ContainerProps>`
	padding-top: ${({ ignorePlatform }) => (ignorePlatform ? 0 : Platform.OS === 'ios' ? Constants.statusBarHeight : 0)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const PathBar = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(22)}px;
	margin-right: ${RFValue(10)}px;
`

export const Title = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(16)}px;
	width: 85%;
`

interface PathTitleProps {
	bold?: boolean
}

export const PathTitle = styled.Text<PathTitleProps>`
	font-family: ${({ bold }) => (bold ? 'Arvo_700Bold' : 'Arvo_400Regular')};
	font-size: ${RFValue(16)}px;
	padding: 0px ${RFValue(10)}px;
	max-width: 50%;
`

export const SmallButtonRightSpace = styled.View`
	margin-right: ${RFValue(10)}px;
`
