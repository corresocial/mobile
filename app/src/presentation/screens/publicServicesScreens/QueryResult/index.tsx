import React from 'react'
import { Platform } from 'react-native'

import { QueryResultScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { Container, InstructionButtonContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

function QueryResult({ navigation }: QueryResultScreenProps) {
	/*
	const resultState = {
		beneficioEmergencial: {
			concedido: data de concessão e data prevista de liberação
			nãoConcedido: null
			emAnálise: null,

			algoErradoCOmNIS: mensagem de erro, mostrar botões de retry
			nãoLocalizada: mensagem de erro
		},
		bolsaFamilia: {
			liberado: valor liberado, nome e NIS

			nâoLocalizado: NIS, mensagem de erro
			erroDesconhecido: mensagem de erro, NIS e nome
		},
		cadUnico: {
			sucesso: Data de atualização, status do cadÚnico
		}
	}
	 */

	const grantDate = 'xx/xx/xxxx'
	const expectedDate = 'xx/xx/xxxx'

	const routeObject = {
		title: 'benefício eventual emergencial',
		titleHighlightedWords: ['benefício', 'emergencial'],
		responseText: `benefício cartão alimentação foi concedido na data: \n\n${grantDate} \n\nprevisão de liberação até: \n\n${expectedDate} ou ${expectedDate} \n\n por favor, consulte sua conta bancária`,
		responseHighlightedWords: ['cartão', 'alimentação', 'foi', 'concedido', '\n\nprevisão', 'de', 'liberação', 'consulte', 'sua', 'conta', 'bancária']
	}

	const { title, titleHighlightedWords, responseText, responseHighlightedWords } = routeObject

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(80)}
				relativeHeight={relativeScreenHeight(80)}
				centralized
				backgroundColor={theme.pink2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						borderLeftWidth={5}
						fontSize={16}
						message={title}
						highlightedWords={titleHighlightedWords}
					/>
				</InstructionButtonContainer>
				<VerticalSpacing />
				<InstructionButtonContainer withPaddingLeft >
					<InstructionCard
						fontSize={16}
						message={responseText}
						highlightedWords={responseHighlightedWords}
					/>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			< FormContainer
				backgroundColor={theme.white3}
				justifyContent={'center'}
			>
				<PrimaryButton
					color={theme.green3}
					label={'continuar'}
					labelColor={theme.white3}
					SecondSvgIcon={CheckWhiteIcon}
					onPress={() => { }}
				/>
			</FormContainer>
		</Container>
	)
}

export { QueryResult }
