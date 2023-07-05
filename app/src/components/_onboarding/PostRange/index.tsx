import React from 'react'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'

import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { TitleDescriptionButton } from '../../../components/_cards/TitleDescriptionButton'
import { StripeProducts } from '../../../services/stripe/types'

interface PostRangeProps {
	backgroundColor: string
	plansAvailable: StripeProducts
	progress: [value: number, range: number]
	savePostRange: (postRange: PostRangeType) => void
	navigateBackwards: () => void
}

function PostRange({ backgroundColor, plansAvailable, progress, savePostRange, navigateBackwards }: PostRangeProps) {
	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'qual alcance você vai querer para esse post?'}
					highlightedWords={['alcance']}
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
						title={'região'}
						description={'a pessoas encontram seus posts e perfil  no bairro'}
						highlightedWords={['região']}
						footerValue={'free'}
						onPress={() => savePostRange('near')}
					/>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={'cidade'}
						description={'seus posts aparecem na cidade inteira, também pode postar em bairros!'}
						highlightedWords={['cidade', 'também', 'pode', 'postar', 'em', 'bairros!']}
						footerValue={plansAvailable.cityMonthly.price || 'unavailable'}
						onPress={() => plansAvailable.cityMonthly.price && savePostRange('city')}
					/>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={'brasil'}
						description={'postagens aparecem em cidades vizinhas e no brasil inteiro.'}
						highlightedWords={['brasil']}
						footerValue={plansAvailable.countryMonthly.price || 'unavailable'}
						onPress={() => plansAvailable.countryMonthly.price && savePostRange('country')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostRange }
