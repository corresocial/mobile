import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	background-color: ${({ theme }) => theme.white2};
	border-radius: ${RFValue(17.5)}px;
	overflow: hidden;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(13)}px;
	flex-direction: row;
	gap: ${relativeScreenDensity(10)}px;
	justify-content: space-between;
`

export const ContentContainer = styled.View`
    flex-direction: column;
	width: 85%;
	gap: ${relativeScreenDensity(6)}px;
`

export const ActionsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

export const ButtonArea = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    height: ${relativeScreenDensity(24)}px;
    width: ${relativeScreenDensity(24)}px;
`

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[5]}px;
    font-family: Arvo_700Bold;
`

export const QuestionIndicator = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[5]}px;
    font-family: Arvo_400Regular;
`

export const ObservationText = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
    font-family: Arvo_400Regular;
`
