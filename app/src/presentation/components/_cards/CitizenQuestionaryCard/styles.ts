import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.TouchableOpacity`
	height: ${relativeScreenDensity(95)}px;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(23)}px;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

export const ContainerInner = styled.View`
	width: 100%;
    height: 100%;
	background-color: ${({ theme }) => theme.white3};
    border: ${relativeScreenDensity(3)}px solid ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(23)}px;
	overflow: hidden;
	left: ${-relativeScreenWidth(2)}px;
`

export const QuestionaryContainer = styled.View`
    flex: 1;
    padding:  ${relativeScreenDensity(10)}px;
    padding-left: ${relativeScreenDensity(20)}px;
    flex-direction: column;
	justify-content: space-around;
`

export const CitizenNameContainer = styled.View`
    border-left-width: ${relativeScreenDensity(2.5)}px;
	padding: 0px ${relativeScreenDensity(7)}px;
	overflow: hidden;
	border-color: ${({ theme }) => theme.black4};
`

export const CitizenNameText = styled.Text`
    font-size: ${relativeScreenDensity(18)}px;
	font-family: Arvo_700Bold;
	color: ${({ theme }) => theme.black4};
`

export const CreatorDataContainer = styled.View`
    padding-left: ${relativeScreenDensity(7)}px;
`

export const CreatorContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

export const InfoText = styled.Text`
	font-size: ${relativeScreenDensity(12)}px;
	color: ${({ theme }) => theme.black4};
`

export const CreatorNameText = styled(InfoText)`
	font-family: Arvo_700Bold;
`

export const CreatedAtText = styled(InfoText)`
	font-family: Arvo_400Regular;
`
