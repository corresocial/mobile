import React, { useContext, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { ChatContext } from '@contexts/ChatContext'

import { QueryPbfByNISResultScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

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

function QueryPbfByNISResult({ route, navigation }: QueryPbfByNISResultScreenProps) {
	const { chatUserHasTokenNotification } = useContext(ChatContext)
	const [notificationModalIsVisible, setNotificationModalIsVisible] = useState(false)

	const { status, NIS, nisNotFound, serverError, familyBagName, familyBagValue } = route.params

	const navigateBackwards = () => navigation.goBack()

	const backToInitialStackScreen = () => {
		navigation.goBack()
		navigation.goBack()
	}

	const navigateToConfigScreen = () => {
		setNotificationModalIsVisible(false)
		navigation.navigate('NotificationSettings')
	}

	const handleContinueButton = async () => {
		if (await chatUserHasTokenNotification()) {
			return backToInitialStackScreen()
		}

		setNotificationModalIsVisible(true)
	}

	const getCustomResponseText = () => {
		if (serverError) return 'opa! \n\nalgo deu errado ao realizar a busca, verifique sua conexão com a internet e tente novamente em alguns instantes'
		if (nisNotFound) return `este NIS(${NIS}) não consta na folha de pagamento de Londrina \n\nconsulte o aplicativo do bolsa família \n\nlink`
		if (status === 'Liberado') return `benefício ${status.toUpperCase()} no valor de: ${familyBagValue} para ${familyBagName}, ao NIS ${NIS}`
		if (status === 'Bloqueado' || status === 'Suspenso') return `benefício ${status.toUpperCase()} \n\n ${familyBagName} \n ${NIS} \n\nconsulte o aplicativo do bolsa família \n\nlink`

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
			<StatusBar backgroundColor={status === 'Liberado' ? theme.pink2 : theme.red2}/>
			<AlertNotificationModal
				visibility={notificationModalIsVisible}
				affirmativeConfigButton
				customAlertText={'ative suas notificações e \nnão perca seus benefícios'}
				customAlertTextHighlighted={['\nnão', 'perca', 'seus', 'benefícios']}
				closeModal={backToInitialStackScreen}
				onCloseModal={() => setNotificationModalIsVisible(false)}
				onPressButton={navigateToConfigScreen}
			/>
			<DefaultHeaderContainer
				relativeHeight={'80%'}
				centralized
				backgroundColor={status === 'Liberado' ? theme.pink2 : theme.red2}
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
					onPress={handleContinueButton}
				/>
			</FormContainer>
		</Container >
	)
}

export { QueryPbfByNISResult }
