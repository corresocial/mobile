import React from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'

import { EventRepeatType } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface PostRepeatProps {
	backgroundColor: string
	progress: [value: number, range: number]
	savePostRepeat: (repeat: EventRepeatType) => void
	navigateBackwards: () => void
}

function PostRepeat({ backgroundColor, progress, savePostRepeat, navigateBackwards }: PostRepeatProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(22)}
				relativeHeight={relativeScreenHeight(22)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'se repete?'}
					highlightedWords={['repete']}
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
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'1 vez por semana'}
						highlightedWords={['1', 'vez', 'por', 'semana']}
						onPress={() => savePostRepeat('weekly')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'todos os dias'}
						highlightedWords={['todos', 'os', 'dias']}
						onPress={() => savePostRepeat('everyDay')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'a cada 15 dias'}
						highlightedWords={['a', 'cada', '15', 'dias']}
						onPress={() => savePostRepeat('biweekly')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'1 vez no mês'}
						highlightedWords={['1', 'vez', 'no', 'mês']}
						onPress={() => savePostRepeat('monthly')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'não se repete'}
						highlightedWords={['não', 'se', 'repete']}
						onPress={() => savePostRepeat('unrepeatable')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostRepeat }
