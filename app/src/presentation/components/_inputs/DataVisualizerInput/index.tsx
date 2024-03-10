import React from 'react'

import {
	InputContainer,
	InputInfoSection,
	InputText
} from './styles'
import { theme } from '@common/theme'

interface DataVisualizerInputProps{
    fields: string[],
}

function DataVisualizerInput() {
	return (
		<InputContainer color={theme.white1}>
			<InputInfoSection>
				<InputText>{'01'}</InputText>
			</InputInfoSection>
			<InputInfoSection>
				<InputText>{'36'}</InputText>
			</InputInfoSection>
		</InputContainer>
	)
}

export { DataVisualizerInput }