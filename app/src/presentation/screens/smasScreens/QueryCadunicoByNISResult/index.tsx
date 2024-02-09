import React, { useContext, useState } from 'react'
import { Platform } from 'react-native'

import { ChatContext } from '@contexts/ChatContext'

import { QueryCadunicoByNISResultScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { Container, InstructionButtonContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import RecycleWhiteIcon from '@assets/icons/recycle-white.svg'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { AlertNotificationModal } from '@components/_modals/AlertNotificationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

function QueryCadunicoByNISResult({ route, navigation }: QueryCadunicoByNISResultScreenProps) {
	const { chatUserHasTokenNotification } = useContext(ChatContext)
	const [notificationModalIsVisible, setNotificationModalIsVisible] = useState(false)

	const { status, serverError, nisNotFound, lastUpdate } = route.params

	const navigateBackwards = () => navigation.goBack()

	const backToInitialStackScreen = () => {
		navigation.goBack()
		navigation.goBack()
	}

	const navigateToConfigScreen = () => {
		setNotificationModalIsVisible(false)
		navigation.navigate('NotificationSettings')
	}

	const navigateToQueryNIS = () => {
		navigation.navigate('InsertNameNIS')
	}

	const handleContinueButton = async () => {
		if (await chatUserHasTokenNotification()) {
			return backToInitialStackScreen()
		}

		setNotificationModalIsVisible(true)
	}

	const getCustomResponseText = () => {
		if (serverError) return 'opa! \n\nalgo deu errado ao realizar a busca, verifique sua conexão com a internet e tente novamente em alguns instantes'
		if (nisNotFound) return 'opa! \n\ntem algo de errado com esse NIS'
		return `Desde a data deste sistema ${lastUpdate}, o cadastro consta como ${status.toUpperCase()}. \n\nCaso já tenha comparecido a uma unidade após esta data, ligue para central: \n\n (43) 33780476`
	}

	const getResponseHighlightedWords = () => {
		if (serverError) return ['opa!', 'de', 'verifique', 'sua', 'conexão', 'com', 'a', 'internet']
		if (nisNotFound) return ['algo', 'de', 'errado', 'NIS']
		return [status.toUpperCase(), 'ligue', lastUpdate, 'para', 'central:', '(43)', '33780476']
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
				relativeHeight={nisNotFound ? '70%' : '80%'}
				centralized
				backgroundColor={status === 'Atualizado' ? theme.pink2 : theme.red2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						borderLeftWidth={5}
						fontSize={16}
						message={'veja se seu cadastro único está atualizado'}
						highlightedWords={['cadastro', 'único', 'atualizado']}
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
				{
					nisNotFound ? (
						<>
							<PrimaryButton
								label={'tentar outro NIS'}
								highlightedWords={['NIS']}
								color={theme.green3}
								SecondSvgIcon={RecycleWhiteIcon}
								labelColor={theme.white3}
								onPress={navigateBackwards}
							/>
							<VerticalSpacing />
							<PrimaryButton
								label={'não sei meu NIS'}
								highlightedWords={['NIS']}
								color={theme.yellow3}
								SecondSvgIcon={QuestionMarkWhiteIcon}
								onPress={navigateToQueryNIS}
							/>
						</>
					) : (
						<PrimaryButton
							color={theme.green3}
							label={'continuar'}
							labelColor={theme.white3}
							SecondSvgIcon={CheckWhiteIcon}
							onPress={handleContinueButton}
						/>
					)
				}
			</FormContainer>
		</Container >
	)
}

export { QueryCadunicoByNISResult }
