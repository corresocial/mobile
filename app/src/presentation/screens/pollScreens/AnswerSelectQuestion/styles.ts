import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`

interface InstructionButtonContainerProps {
	withPaddingLeft?: boolean
}

export const InstructionButtonContainer = styled.View<InstructionButtonContainerProps>`
	padding-left: ${({ withPaddingLeft }) => (withPaddingLeft ? relativeScreenWidth(15.5) : '0')}px;
	flex-direction: row;
	align-items: center;
`

export const OptionsContainer = styled.ScrollView`
	flex: 1;
	padding: ${relativeScreenDensity(20)}px;
`

export const ButtonOptionsContainer = styled.View`
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(20)}px;
	padding-bottom: ${relativeScreenDensity(30)}px;
	align-items: center;
	justify-content: space-between;
`
