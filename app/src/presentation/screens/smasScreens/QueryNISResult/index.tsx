import React, { useContext, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { SmasRepositoryAdapter } from '@data/smas/SmasRepositoryAdapter'

import { SmasContext } from '@contexts/SmasContext'

import { QueryNISResultScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { Container, InstructionButtonContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmasAdapter } from '@adapters/smas/SmasAdapter'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

const { setNisOnLocalRepository } = SmasAdapter()

function QueryNISResult({ route, navigation }: QueryNISResultScreenProps) {
	const { setSmasDataOnContext } = useContext(SmasContext)

	const [nisIsSaved, setNisIsSaved] = useState(false)

	const { status, NIS } = route.params

	const navigateBackwards = () => navigation.goBack()

	const backToInicialStackScreen = () => {
		navigation.pop(6)
	}

	const saveNis = () => {
		if (nisIsSaved) {
			return backToInicialStackScreen()
		}

		setSmasDataOnContext({ NIS })
		setNisOnLocalRepository(NIS, SmasRepositoryAdapter)
		setNisIsSaved(true)
	}

	const getCustomResponseText = () => {
		if (nisIsSaved) return 'seu NIS foi salvo!'
		if (status === 200) return `seu NIS é: ${NIS} \n\ngostaria de salvar seu NIS aqui no aplicativo?`
		if (status === 500) return 'opa! \n\nalgo deu errado ao realizar a busca, verifique sua conexão com a internet e tente novamente em alguns instantes'
		if (status === 404) return 'não encontramos seu NIS, confira os dados ou procure a unidade de CRAS mais próxima de sua residência'
		return ''
	}

	const getCustomHighlightedWords = () => {
		if (nisIsSaved) return ['NIS']
		if (status === 200) return ['NIS', 'salvar', 'no', 'aplicativo', `${NIS}`]
		if (status === 404) return ['não', 'encontramos', 'seu', 'NIS', 'CRAS']
		if (status === 500) return ['opa!', 'de', 'verifique', 'sua', 'conexão', 'com', 'a', 'internet']
		return ['não', 'encontramos', 'seu', 'NIS', 'CRAS']
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<StatusBar backgroundColor={status === 200 ? theme.pink2 : theme.red2}/>
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(70)}
				relativeHeight={relativeScreenHeight(70)}
				centralized
				backgroundColor={status === 200 ? theme.pink2 : theme.red2}
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
					status === 200 && !nisIsSaved && (
						<PrimaryButton
							color={theme.red3}
							label={'não, obrigado'}
							labelColor={theme.white3}
							SvgIcon={XWhiteIcon}
							onPress={backToInicialStackScreen}
						/>
					)
				}
				<PrimaryButton
					color={theme.green3}
					label={status === 200 && !nisIsSaved ? 'sim, salvar' : 'concluir'}
					labelColor={theme.white3}
					SecondSvgIcon={CheckWhiteIcon}
					onPress={status === 200 ? saveNis : backToInicialStackScreen}
				/>
			</FormContainer>
		</Container>
	)
}

export { QueryNISResult }
