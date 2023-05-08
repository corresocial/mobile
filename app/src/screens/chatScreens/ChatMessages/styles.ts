import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../../common/screenDimensions'

export const Container = styled.KeyboardAvoidingView`
	flex: 1;
	background-color: ${({ theme }) => theme.orange1};
	padding-bottom: ${relativeScreenHeight(9)}px;
	flex-direction: column;
	justify-content: space-between;
	`

export const Header = styled.View`
	width: 100%;
	padding: ${RFValue(12)}px;
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
	flex-direction: row;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.white3};
	align-items: center;
`

export const Sigh = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(1)}px;
`
