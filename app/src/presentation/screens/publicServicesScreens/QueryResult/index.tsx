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

function QueryResult({ route, navigation }: QueryResultScreenProps) {
	/*
	const resultState = {
		beneficioEmergencial: {
			granted: data de concessão e data prevista de liberação
			notGranted: null
			inAnalysis: null,

			algoErradoCOmNIS: mensagem de erro, mostrar botões de retry
			nãoLocalizada: mensagem de erro
		},
		bolsaFamilia: {
			granted: valor liberado, nome e NIS

			notFound: NIS, mensagem de erro
			erroDesconhecido: mensagem de erro, NIS e nome
		},
		cadUnico: {
			sucesso: Data de atualização, status do cadÚnico
		}
	}
	 */

	const { smasService, NIS, status, grantDate, expectedDate, familyBagName, familyBagValue } = route.params

	const navigateBackwards = () => navigation.goBack()

	const getCustomTitle = () => {
		switch (smasService) {
			case 'beneficioEmergencial': return 'benefício eventual emergencial'
			case 'bolsaFamilia': return 'consultar bolsa família'
			case 'cadUnico': return 'veja se seu cadastro único está atualizado'
		}
	}

	const getTitleHighlightedWords = () => {
		switch (smasService) {
			case 'beneficioEmergencial': return ['benefício', 'emergencial']
			case 'bolsaFamilia': return ['bolsa', 'família']
			case 'cadUnico': return ['cadastro', 'único', 'atualizado']
		}
	}

	// Estes texts são domain/rules
	const getCustomResponseText = () => {
		switch (smasService) {
			case 'beneficioEmergencial': return `benefício cartão alimentação foi concedido na data: \n\n${grantDate} \n\nprevisão de liberação até: \n\n${expectedDate} ou ${expectedDate} \n\n por favor, consulte sua conta bancária`
			case 'bolsaFamilia': return `benefício liberado no valor de: ${familyBagValue} para ${familyBagName}, ao NIS ${NIS}`
			case 'cadUnico': return `Desde a data deste sistema ${grantDate}, o cadastro consta como ${status ? 'ATUALIZADO' : 'DESATUALIZADO'}. \n\nCaso já tenha comparecido a uma unidade após esta data, ligue para central: \n\n (43) 33780476`
		}
	}

	const getResponseHighlightedWords = () => {
		switch (smasService) {
			case 'beneficioEmergencial': return ['cartão', 'alimentação', 'emergencial', 'foi', 'concedido', `\n\n${grantDate}`, '\n\nprevisão', 'de', 'liberação', expectedDate]
			case 'bolsaFamilia': return ['benefício', 'liberado', grantDate, 'NIS', NIS, ...familyBagName.split(' '), familyBagValue]
			case 'cadUnico': return [grantDate, status ? 'ATUALIZADO' : 'DESATUALIZADO', 'ligue', 'para', 'central:', '(43)', '33780476']
		}
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(80)}
				relativeHeight={relativeScreenHeight(80)}
				centralized
				backgroundColor={status !== 'granted' ? theme.red2 : theme.pink2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						borderLeftWidth={5}
						fontSize={16}
						message={getCustomTitle()}
						highlightedWords={getTitleHighlightedWords()}
					/>
				</InstructionButtonContainer>
				<VerticalSpacing />
				<InstructionButtonContainer withPaddingLeft >
					<InstructionCard
						fontSize={16}
						message={getCustomResponseText()}
						highlightedWords={getResponseHighlightedWords()}
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
