import React, { useContext, useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { useSmasDomain } from '@domain/smas/useSmasDomain'

import { useSmasRepository } from '@data/smas/useSmasRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { ChatContext } from '@contexts/ChatContext'

import { NotificationPublicServicesSettingsScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { Container, HeaderLinkCardContainer } from './styles'
import BellWhiteIcon from '@assets/icons/bell-white.svg'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { OptionButton } from '@components/_buttons/OptionButton'
import { HeaderLinkCard } from '@components/_cards/HeaderLinkCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { InsertNisModal } from '@components/_modals/InsertNisModal'
import { Loader } from '@components/Loader'

const { remoteStorage } = useUserRepository()

const { validateNIS, smasNisHasLinkedWithUser, getNisFromLocalRepository, setNisOnLocalRepository, setSmasPushNotificationState } = useSmasDomain()

function NotificationPublicServicesSettings({ navigation }: NotificationPublicServicesSettingsScreenProps) {
	const { pushNotificationEnabled, setPushNotificationState } = useContext(ChatContext)
	const { userDataContext } = useContext(AuthContext)

	const [userNis, setUserNis] = useState('')
	const [governmentNotificationIsEnabled, setGovernmentNotificationIsEnabled] = useState(pushNotificationEnabled)
	const [smasMessagesIsEnabled, setSmasMessagesIsEnabled] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [insertNisModalIsVisible, setInsertNisModalIsVisible] = useState(false)

	useEffect(() => {
		checkNotificationStates()
	}, [])

	const navigateBackwards = () => navigation.goBack()

	const checkNotificationStates = async () => {
		setIsLoading(true)
		await checkSmasMessagesState()
		await checkGovernmentNotificationState()
		setIsLoading(false)
	}

	const checkSmasMessagesState = async (nis?: string) => {
		const currentNis = nis || await getNisFromLocalRepository(useSmasRepository)
		const smasMessagesState = await smasNisHasLinkedWithUser(currentNis, useSmasRepository)

		setSmasMessagesIsEnabled(smasMessagesState)
		setUserNis(currentNis)
	}

	const checkGovernmentNotificationState = async () => {
		const privateUserLocation = await remoteStorage.getPrivateLocation(userDataContext.userId)
		setGovernmentNotificationIsEnabled(!!(privateUserLocation && privateUserLocation.visibleToGovernment))
	}

	const toggleMessagesSmasState = async (inputedNis?: string) => {
		const newState = !smasMessagesIsEnabled

		try {
			setIsLoading(true)

			if (newState) {
				if (!inputedNis || (inputedNis && inputedNis.trim().length !== 11)) throw new Error('NIS inválido!')
				setSmasPushNotificationState(newState, inputedNis || userNis, userDataContext.userId, useSmasRepository)
				setUserNis(inputedNis)
				await setPushNotificationState(true)
				await setNisOnLocalRepository(inputedNis, useSmasRepository)
			} else {
				setSmasPushNotificationState(newState, inputedNis || userNis, userDataContext.userId, useSmasRepository)
				setUserNis('')
				await setNisOnLocalRepository('', useSmasRepository)
			}

			setSmasMessagesIsEnabled(newState)
			setIsLoading(false)
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		}
	}

	const toggleGovernmentNotifications = async () => {
		try {
			setIsLoading(true)
			const newNotificationState = !governmentNotificationIsEnabled

			await remoteStorage.updatePrivateLocation(
				userDataContext.userId,
				{ visibleToGovernment: newNotificationState }
			)
			await setPushNotificationState(true)

			setGovernmentNotificationIsEnabled(newNotificationState)
			setIsLoading(false)
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		}
	}

	const toggleInsertNisModalVisibility = () => setInsertNisModalIsVisible(!insertNisModalIsVisible)

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<InsertNisModal
				initialInputValue={userNis}
				visibility={insertNisModalIsVisible}
				validateNis={validateNIS}
				onPressButton={toggleMessagesSmasState}
				closeModal={toggleInsertNisModalVisibility}
			/>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<HeaderLinkCardContainer>
					<HeaderLinkCard
						title={'serviços públicos'}
						value={'aqui você gerencia suas notificações relacionados ao seu governo'}
						highlightedWords={[governmentNotificationIsEnabled ? 'ativadas' : 'desativadas', 'serviços', 'públicos']}
						SvgIcon={BellWhiteIcon}
					/>
				</HeaderLinkCardContainer>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.orange2}>
				{
					isLoading
						? (
							<Loader />
						)
						: (
							<>
								<OptionButton
									label={'receber mensagens de benefícios sociais'}
									highlightedWords={['receber', 'mensagens', 'de', 'benefícios', 'sociais']}
									labelSize={17}
									shortDescription={userNis ? `NIS: ${userNis}` : ''}
									shortDescriptionHighlightedWords={[userNis]}
									relativeHeight={relativeScreenHeight(15)}
									SvgIcon={smasMessagesIsEnabled ? XWhiteIcon : CheckWhiteIcon}
									svgIconScale={['50%', '50%']}
									leftSideColor={smasMessagesIsEnabled ? theme.red3 : theme.green3}
									leftSideWidth={'22%'}
									onPress={smasMessagesIsEnabled ? toggleMessagesSmasState : toggleInsertNisModalVisibility}
								/>
								<OptionButton
									label={'receber notificações da prefeitura'}
									highlightedWords={['receber', 'notificações', 'da', 'prefeitura']}
									labelSize={17}
									relativeHeight={relativeScreenHeight(15)}
									leftSideWidth={'22%'}
									SvgIcon={governmentNotificationIsEnabled ? XWhiteIcon : CheckWhiteIcon}
									svgIconScale={['50%', '50%']}
									leftSideColor={governmentNotificationIsEnabled ? theme.red3 : theme.green3}
									onPress={toggleGovernmentNotifications}
								/>
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { NotificationPublicServicesSettings }
