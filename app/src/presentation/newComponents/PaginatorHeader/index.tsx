import React from 'react'

import { ButtonContainer, Container, InfoContainer, SubTitleContainer, Title } from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { theme } from '@common/theme'

import { StandardButton } from '@newComponents/StandardButton'

interface PaginatorHeaderProps{
	color?: string
	title: string
	value?: number
	previousItem?: string
	nextItem?: string
	subTitle?: string
	highlitedWords?: string[]
	onNext: () => void
	onPrev: () => void
}

function PaginatorHeader({ color = 'transparent', title, value, previousItem, nextItem, subTitle, highlitedWords, onNext, onPrev }: PaginatorHeaderProps) {
	const getPreviousItem = (): number | null => {
		return value ? value - 1 : null
	}

	const getNextItem = (): number | null => {
		return value ? value + 1 : null
	}

	return (
		<Container color={color}>
			<ButtonContainer>
				<StandardButton
					text={`${getNextItem() ?? nextItem}`}
					heightPreset={'small'}
					backgroundColor={theme.colors.white[3]}
					icon={'arrowLeft'}
					onPress={onNext}
				/>
			</ButtonContainer>
			<InfoContainer>
				<Title>{title}</Title>
				{
					subTitle && (
						<SubTitleContainer>
							{showMessageWithHighlight(subTitle, highlitedWords)}
						</SubTitleContainer>
					)
				}
			</InfoContainer>
			<ButtonContainer>
				<StandardButton
					text={`${getPreviousItem() ?? nextItem}`}
					heightPreset={'small'}
					backgroundColor={theme.colors.white[3]}
					reversed
					icon={'arrowRight'}
					onPress={onPrev}
				/>
			</ButtonContainer>
		</Container>
	)
}

export { PaginatorHeader }
