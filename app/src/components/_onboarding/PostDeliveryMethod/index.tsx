import React from 'react'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'

import { DeliveryMethod } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { BackButton } from '../../_buttons/BackButton'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { ProgressBar } from '../../ProgressBar'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface PostDeliveryMethodProps {
	backgroundColor: string
	progress: [value: number, range: number]
	navigateBackwards: () => void
	saveDeliveryMethod: (deliveryMethod: DeliveryMethod) => void
}

function PostDeliveryMethod({ backgroundColor, progress, navigateBackwards, saveDeliveryMethod }: PostDeliveryMethodProps) {
	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'você faz entregas ou atende à distância?'}
					highlightedWords={['entregas', 'atende', 'à', 'distância']}
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
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'comprador busca'}
						highlightedWords={['comprador']}
						onPress={() => saveDeliveryMethod('unavailable')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'entrego na região'}
						highlightedWords={['na', 'região']}
						onPress={() => saveDeliveryMethod('near')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'entrego na cidade'}
						highlightedWords={['na', 'cidade']}
						onPress={() => saveDeliveryMethod('city')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'atendo no brasil inteiro'}
						highlightedWords={['brasil', 'inteiro']}
						onPress={() => saveDeliveryMethod('country')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostDeliveryMethod }
