import React, { useContext, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { ChatContext } from '@contexts/ChatContext'

import { QueryBeeByNISResultScreenProps } from '@routes/Stack/PublicServicesStack/screenProps'

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

function QueryBeeByNISResult({ route, navigation }: QueryBeeByNISResultScreenProps) {
	const { chatUserHasTokenNotification } = useContext(ChatContext)
	const [notificationModalIsVisible, setNotificationModalIsVisible] = useState(false)

	const { nisNotFound, serverError, benefitRequested, benefitGranted, inAnalysis, grantDate, expectedDate } = route.params

	const navigateBackwards = () => navigation.goBack()

	const backToInitialStackScreen = () => {
		navigation.goBack()
		navigation.goBack()
	}

	const navigateToConfigScreen = () => {
		setNotificationModalIsVisible(false)
		navigation.navigate('NotificationSettings') // SMAS
	}

	const handleContinueButton = async () => {
		if (await chatUserHasTokenNotification()) {
			return backToInitialStackScreen()
		}

		setNotificationModalIsVisible(true)
	}

	const navigateToQueryNIS = () => {
		navigation.navigate('InsertNameNIS')
	}

	const getCustomResponseText = () => {
		return `benefício ${benefitGranted} foi concedido na data: \n\n${grantDate} \n\nprevisão de liberação até: \n\n${expectedDate}  \n\npor favor, consulte ${benefitGranted === 'cartão alimentação' ? 'o aplicativo BKBanking' : 'sua conta bancária'}`
	}

	const getResponseHighlightedWords = () => {
		return ['cartão', 'alimentação', 'depósito', 'em', 'conta', 'emergencial', 'foi', 'concedido', `\n\n${grantDate}`, '\n\nprevisão', 'de', 'liberação', `\n\n${expectedDate}`, 'consulte', 'cartão alimentação', 'o', 'aplicativo', 'BKBanking', 'sua', 'conta', 'bancária']
	}

	const getBenefitStatusMessage = () => {
		if (serverError) return 'opa! \n\nalgo deu errado ao realizar a busca, verifique sua conexão com a internet e tente novamente em alguns instantes'
		if (nisNotFound) return 'opa! \n\ntem algo errado com esse NIS'
		if (!benefitRequested) return 'solicitação não foi localizada'
		if (inAnalysis) return 'sua solicitação ainda está sendo analisada'
		if (!benefitGranted) return 'não foi concedido'

		return 'opa! \n\ntem algo errado com esse NIS'
	}

	const getBenefitStatusMessageHighlighted = () => {
		if (serverError) return ['opa!', 'de', 'verifique', 'sua', 'conexão', 'com', 'a', 'internet']
		if (nisNotFound) return ['algo', 'de', 'errado', 'NIS']
		if (!benefitRequested) return ['solicitação', 'não', 'foi', 'localizada']
		if (inAnalysis) return ['ainda', 'está', 'sendo', 'analisada']
		if (!benefitGranted) return ['não foi concedido']

		return ['algo', 'de', 'errado', 'NIS']
	}

	const checkResponseStatus = () => {
		return inAnalysis || benefitGranted
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={checkResponseStatus() ? theme.pink2 : theme.red2} />
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
				backgroundColor={checkResponseStatus() ? theme.pink2 : theme.red2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						borderLeftWidth={5}
						fontSize={16}
						message={'benefício eventual emergencial'}
						highlightedWords={['benefício', 'emergencial']}
					/>
				</InstructionButtonContainer>
				<VerticalSpacing />
				{
					benefitGranted
						? (
							<InstructionButtonContainer withPaddingLeft >
								<InstructionCard
									fontSize={16}
									message={getCustomResponseText()}
									highlightedWords={getResponseHighlightedWords()}
								/>
							</InstructionButtonContainer>
						)
						: (
							<InstructionButtonContainer withPaddingLeft >
								<InstructionCard
									fontSize={16}
									message={getBenefitStatusMessage()}
									highlightedWords={getBenefitStatusMessageHighlighted()}
								/>
							</InstructionButtonContainer>
						)
				}
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

export { QueryBeeByNISResult }
