import React from 'react'
import { StatusBar } from 'react-native'

import { getLocationViewDescription, getLocationViewHighlightedWords, getLocationViewTitle } from '../../../utils/locationMessages'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'

import { LocationViewType } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { TitleDescriptionButton } from '../../../components/_cards/TitleDescriptionButton'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface PostLocationViewProps {
	backgroundColor: string
	progress: [value: number, range: number]
	saveLocationViewType: (locationView: LocationViewType) => void
	navigateBackwards: () => void
}

function PostLocationView({ backgroundColor, progress, saveLocationViewType, navigateBackwards }: PostLocationViewProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(28)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'como você prefere que outros usuários vejam sua localização?'}
					highlightedWords={['como', 'você', 'prefere', 'vejam', 'sua', 'localização']}
				>
					<ProgressBar
						value={progress[0]}
						range={progress[1]}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={backgroundColor}
			>
				<ButtonsContainer>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={getLocationViewTitle('private')}
						description={getLocationViewDescription('private')}
						highlightedWords={getLocationViewHighlightedWords('private')}
						onPress={() => saveLocationViewType('private')}
					/>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={getLocationViewTitle('approximate')}
						description={getLocationViewDescription('approximate')}
						highlightedWords={getLocationViewHighlightedWords('approximate')}
						onPress={() => saveLocationViewType('approximate')}
					/>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={getLocationViewTitle('public')}
						description={getLocationViewDescription('public')}
						highlightedWords={getLocationViewHighlightedWords('public')}
						onPress={() => saveLocationViewType('public')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostLocationView }
