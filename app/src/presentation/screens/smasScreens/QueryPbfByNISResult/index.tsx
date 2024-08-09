import React, { useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { useSmasDomain } from '@domain/smas/useSmasDomain'

import { useSmasRepository } from '@data/smas/useSmasRepository'

import { QueryPbfByNISResultScreenProps } from '@routes/Stack/PublicServicesStack/screenProps'

import { Container, InstructionButtonContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { AlertNotificationModal } from '@components/_modals/AlertNotificationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

const { smasNisHasLinkedWithUser } = useSmasDomain()

function QueryPbfByNISResult({ route, navigation }: QueryPbfByNISResultScreenProps) {
	const [notificationModalIsVisible, setNotificationModalIsVisible] = useState(false)

	const { status, NIS, nisNotFound, serverError, familyBagName, familyBagValue } = route.params

	const navigateBackwards = () => navigation.goBack()

	const backToInitialStackScreen = () => {
		navigation.goBack()
		navigation.goBack()
	}

	const navigateToConfigScreen = () => {
		setNotificationModalIsVisible(false)
		navigation.navigate('NotificationPublicServicesSettingsPublicServices')
	}

	const smasNotificationIsEnable = async (nis?: string) => {
		return smasNisHasLinkedWithUser(nis || '', useSmasRepository)
	}

	const handleContinueButton = async () => {
		if (await smasNotificationIsEnable()) {
			return backToInitialStackScreen()
		}

		setNotificationModalIsVisible(true)
	}

	const getCustomResponseText = () => {
		if (serverError) return 'opa! \n\nalgo deu errado ao realizar a busca, verifique sua conexão com a internet e tente novamente em alguns instantes'
		if (nisNotFound) return `este NIS(${NIS}) não consta na folha de pagamento de Londrina \n\nconsulte o aplicativo do bolsa família \n`
		if (status === 'Liberado') return `benefício ${status.toUpperCase()} no valor de: ${familyBagValue} para ${familyBagName}, ao NIS ${NIS}`
		if (status === 'Bloqueado' || status === 'Suspenso') return `benefício ${status.toUpperCase()} \n\n ${familyBagName} \n ${NIS} \n\nconsulte o aplicativo do bolsa família \n`

		return 'não foi possível identificar o estado do seu benefício'
	}

	const getResponseHighlightedWords = () => {
		if (serverError) return ['opa!', 'de', 'verifique', 'sua', 'conexão', 'com', 'a', 'internet']
		if (nisNotFound) return [`NIS(${NIS})`, 'não', 'consta', 'na', 'folha', 'de', 'pagamento', 'de', 'Londrina', 'aplicativo', 'do', 'bolsa', 'família']
		if (status === 'Liberado') return ['benefício', status.toUpperCase(), 'NIS', NIS, ...familyBagName.split(' '), familyBagValue]
		if (status === 'Bloqueado' || status === 'Suspenso') return [status.toUpperCase(), ...familyBagName.split(' '), `${NIS}`, 'aplicativo', 'do', 'bolsa', 'família']

		return []
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={status === 'Liberado' ? theme.colors.pink[2] : theme.colors.red[2]} />
			<AlertNotificationModal
				visibility={notificationModalIsVisible}
				affirmativeConfigButton
				customAlertText={'ative suas notificações e \nnão perca seus benefícios'}
				customAlertTextHighlighted={['\nnão', 'perca', 'seus', 'benefícios']}
				closeModal={() => setNotificationModalIsVisible(false)}
				onCloseModal={() => setNotificationModalIsVisible(false)}
				onPressButton={navigateToConfigScreen}
			/>
			<DefaultHeaderContainer
				relativeHeight={'80%'}
				centralized
				backgroundColor={status === 'Liberado' ? theme.colors.pink[2] : theme.colors.red[2]}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						borderLeftWidth={5}
						fontSize={16}
						message={'consultar bolsa família'}
						highlightedWords={['bolsa', 'família']}
					/>
				</InstructionButtonContainer>
				<VerticalSpacing />
				<InstructionButtonContainer withPaddingLeft >
					<InstructionCard
						fontSize={16}
						message={getCustomResponseText()}
						highlightedWords={getResponseHighlightedWords()}
						redirectLink={nisNotFound || status === 'Bloqueado' || status === 'Suspenso' ? 'https://play.google.com/store/apps/details?id=br.gov.caixa.bolsafamilia&hl=pt_BR' : ''}
						redirectLinkLabel={'Aplicativo Bolsa Família'}
					/>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			< FormContainer
				backgroundColor={theme.colors.white[3]}
				justifyContent={'center'}
			>
				<PrimaryButton
					color={theme.colors.green[3]}
					label={'continuar'}
					labelColor={theme.colors.white[3]}
					SecondSvgIcon={CheckWhiteIcon}
					onPress={handleContinueButton}
				/>
			</FormContainer>
		</Container >
	)
}

export { QueryPbfByNISResult }
