import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.KeyboardAvoidingView`
	flex: 1;
	width: 100%;
`

export const QuestionOptionsList = styled.FlatList`
	width: 100%;
	padding: ${relativeScreenDensity(10)}px;
`

// Refactor O ideal é utilizar o padding na flatlist, mas os botões com sombra cortavam à esquerda no android
export const OptionContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
`

export const ButtonOptionsContainer = styled.View`
	width: 100%;
	padding: ${relativeScreenDensity(15)}px ${relativeScreenDensity(25)}px;
	align-items: center;
`

export const InputContainer = styled.View`
	width: 100%;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(10)}px;
`
