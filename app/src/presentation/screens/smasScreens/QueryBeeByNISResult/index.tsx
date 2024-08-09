import React, { useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { useSmasDomain } from '@domain/smas/useSmasDomain'

import { useSmasRepository } from '@data/smas/useSmasRepository'

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

const { smasNisHasLinkedWithUser } = useSmasDomain()

function QueryBeeByNISResult({ route, navigation }: QueryBeeByNISResultScreenProps) {
	const [notificationModalIsVisible, setNotificationModalIsVisible] = useState(false)

	const { nisNotFound, serverError, benefitRequested, benefitGranted, inAnalysis, grantDate, expectedDate } = route.params

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
		if (nisNotFound) return 'opa! \n\ntem algo errado com esse NIS \n\nentre em contato com o CRAS mais próximo da sua residência \n\nou tente uma das alternativas abaixo'
		if (!benefitRequested) return 'solicitação não foi localizada'
		if (inAnalysis) return 'sua solicitação ainda está sendo analisada'
		if (!benefitGranted) return 'não foi concedido'

		return 'opa! \n\ntem algo errado com esse NIS'
	}

	const getBenefitStatusMessageHighlighted = () => {
		if (serverError) return ['opa!', 'de', 'verifique', 'sua', 'conexão', 'com', 'a', 'internet']
		if (nisNotFound) return ['algo', 'de', 'errado', 'NIS', 'CRAS', 'alternativas']
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
			<StatusBar backgroundColor={checkResponseStatus() ? theme.colors.pink[2] : theme.colors.red[2]} />
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
				relativeHeight={nisNotFound ? '70%' : '80%'}
				centralized
				backgroundColor={checkResponseStatus() ? theme.colors.pink[2] : theme.colors.red[2]}
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
				backgroundColor={theme.colors.white[3]}
				justifyContent={'center'}
			>
				{
					nisNotFound ? (
						<>
							<PrimaryButton
								label={'tentar outro NIS'}
								highlightedWords={['NIS']}
								color={theme.colors.green[3]}
								SecondSvgIcon={RecycleWhiteIcon}
								labelColor={theme.colors.white[3]}
								onPress={navigateBackwards}
							/>
							<VerticalSpacing />
							<PrimaryButton
								label={'não sei meu NIS'}
								highlightedWords={['NIS']}
								color={theme.colors.yellow[3]}
								SecondSvgIcon={QuestionMarkWhiteIcon}
								onPress={navigateToQueryNIS}
							/>
						</>
					) : (
						<PrimaryButton
							color={theme.colors.green[3]}
							label={'continuar'}
							labelColor={theme.colors.white[3]}
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
