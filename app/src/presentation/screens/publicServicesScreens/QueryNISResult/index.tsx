import React from 'react'
import { Platform } from 'react-native'

import { QueryNISResultScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { Container, InstructionButtonContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

function QueryNISResult({ route, navigation }: QueryNISResultScreenProps) {
	const { success, NIS } = route.params

	const navigateBackwards = () => navigation.goBack()

	const backToInicialStackScreen = () => {
		navigation.navigate('SelectPublicService')
	}

	const getCustomResponseText = () => {
		if (success) return `seu NIS é: ${NIS} \n\ngostaria de salvar seu NIS aqui no aplicativo?`
		return 'não encontramos seu NIS, confira os dados ou procure a unidade de CRAS mais próxima de sua residência'
	}

	const getCustomHighlightedWords = () => {
		if (success) return ['NIS', 'salvar', 'no', 'aplicativo', NIS]
		return ['não', 'encontramos', 'seu', 'NIS', 'CRAS']
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(70)}
				relativeHeight={relativeScreenHeight(70)}
				centralized
				backgroundColor={success ? theme.pink2 : theme.red2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						borderLeftWidth={5}
						fontSize={16}
						message={'consultar seu NIS'}
						highlightedWords={['NIS']}
					/>
				</InstructionButtonContainer>
				<VerticalSpacing />
				<InstructionButtonContainer withPaddingLeft >
					<InstructionCard
						fontSize={16}
						message={getCustomResponseText()}
						highlightedWords={getCustomHighlightedWords()}
					/>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			< FormContainer backgroundColor={theme.white3}>
				{
					success && (
						<PrimaryButton
							color={theme.red3}
							label={'não, obrigado'}
							labelColor={theme.white3}
							SvgIcon={XWhiteIcon}
							onPress={() => { }}
						/>
					)
				}
				<PrimaryButton
					color={theme.green3}
					label={success ? 'sim, salvar' : 'concluir'}
					labelColor={theme.white3}
					SecondSvgIcon={CheckWhiteIcon}
					onPress={backToInicialStackScreen}
				/>
			</FormContainer>
		</Container>
	)
}

export { QueryNISResult }
