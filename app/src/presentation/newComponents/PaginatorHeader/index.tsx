import React from 'react'

import { ButtonContainer, Container, InfoContainer, Title, SubTitle } from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { theme } from '@common/theme'

import { StandardButton } from '@newComponents/StandardButton'

interface PaginatorHeaderProps {
	color?: string
	title: string
	value?: number
	previousItem?: string
	nextItem?: string
	subTitle?: string
	highlitedWords?: string[]
	infoContainerWidth?: string | number
	onNext: () => void
	onPrev: () => void
}

function PaginatorHeader({ color = 'rgba(0,0,0,0)', title, value, previousItem, nextItem, subTitle, highlitedWords, infoContainerWidth = '60%', onNext, onPrev }: PaginatorHeaderProps) {
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
					text={`${getPreviousItem() ?? previousItem}`}
					heightPreset={'small'}
					backgroundColor={theme.colors.white[3]}
					icon={'arrowLeft'}
					onPress={onPrev}
				/>
			</ButtonContainer>
			<InfoContainer width={infoContainerWidth}>
				<Title>{title}</Title>
				{
					subTitle && (
						<SubTitle>
							{showMessageWithHighlight(subTitle, highlitedWords)}
						</SubTitle>
					)
				}
			</InfoContainer>
			<ButtonContainer>
				<StandardButton
					text={`${getNextItem() ?? nextItem}`}
					heightPreset={'small'}
					backgroundColor={theme.colors.white[3]}
					reversed
					icon={'arrowRight'}
					onPress={onNext}
				/>
			</ButtonContainer>
		</Container>
	)
}

export { PaginatorHeader }
