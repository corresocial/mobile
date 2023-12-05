import React, { useState, useContext } from 'react'

import { differenceInMinutes } from 'date-fns'

import { AuthContext } from '@contexts/AuthContext'
import { ChatContext } from '@contexts/ChatContext'

import { UserDataConfigurationsScreenProps } from '@routes/Stack/UserStack/stackScreenProps'

import { auth } from '@services/firebase'
import { Id, PostCollection } from '@services/firebase/types'
import { removeAllUserData } from '@services/firebase/user/removeAllUserData'
import { clearOfflinePosts } from '@utils/offlinePost'

import { Container } from './styles'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { TitleDescriptionButton } from '@components/_cards/TitleDescriptionButton'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { BeForgottenConfirmationModal } from '@components/_modals/BeForgottenConfirmationModal'
import { CustomModal } from '@components/_modals/CustomModal'
import { Loader } from '@components/Loader'

function UserDataConfigurations({ navigation }: UserDataConfigurationsScreenProps) {
	const { userDataContext, deleteLocaluser } = useContext(AuthContext)
	const { removeChatListeners } = useContext(ChatContext)

	const [beForgottenConfirmationModalIsVisible, setBeForgottenConfirmationModalIsVisible] = useState(false)
	const [successModalIsVisible, setSuccessModalIsVisible] = useState(false)
	const [sessionExpiredAlertModal, setSessionExpiredAlertModal] = useState(false)

	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	const beForgotten = () => {
		console.log(`userPerformRecentLogin: ${userPerformRecentLogin()}`)
		if (!userPerformRecentLogin()) {
			console.log('show logout modal')
			showSessionExpiredAlertModal()
		}

		toggleBeForgottenConfirmationModalVisibility()
	}

	const userPerformRecentLogin = () => {
		const { currentUser } = auth

		const lastSignin: Date = new Date(currentUser?.metadata.lastSignInTime || Date.now() + 50000)

		console.log(differenceInMinutes(new Date(), lastSignin))

		return differenceInMinutes(new Date(), lastSignin) < 5
	}

	const toggleBeForgottenConfirmationModalVisibility = () => {
		setBeForgottenConfirmationModalIsVisible(!beForgottenConfirmationModalIsVisible)
	}

	const toggleSuccessModalVisibility = () => {
		setSuccessModalIsVisible(!successModalIsVisible)
	}

	const deleteAllUserData = async () => {
		try {
			setHasError(false)
			setIsLoading(true)

			await removeAllUserData(
				userDataContext.userId as Id,
				userDataContext.profilePictureUrl || [],
				userDataContext.posts as PostCollection[]
			).then(() => toggleSuccessModalVisibility())
			setIsLoading(false)
		} catch (error: any) {
			if (error.code === 'auth/requires-recent-login') {
				showSessionExpiredAlertModal()
			}
			setHasError(true)
			console.log(error)
			setIsLoading(false)
		}
	}

	const showSessionExpiredAlertModal = () => {
		setSessionExpiredAlertModal(true)
	}

	const performLogout = async () => {
		try {
			removeChatListeners()
			await deleteLocaluser()
			await clearOfflinePosts()
			await auth.signOut()
			navigateToInitialScreen()
		} catch (error) {
			console.log('erro ao fazer logout')
			console.log(error)
		}
	}

	const navigateToInitialScreen = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'SelectAuthRegister' as any }]
		})
	}

	return (
		<Container>
			<BeForgottenConfirmationModal
				visibility={beForgottenConfirmationModalIsVisible}
				onPressButton={deleteAllUserData}
				closeModal={toggleBeForgottenConfirmationModalVisibility}
			/>
			<CustomModal
				visibility={successModalIsVisible}
				title={'obrigado!'}
				firstParagraph={{
					text: 'agradecemos por fazer parte de nossa rede, e esperamos te encontrar em um futuro próximo.'
				}}
				affirmativeButton={{
					label: 'sair da conta',
					onPress: performLogout
				}}
				closeModal={() => { }}
			/>
			<CustomModal
				visibility={sessionExpiredAlertModal}
				title={'ops!'}
				firstParagraph={{
					text: 'faça login novamente para renovar sua sessão antes de deletar seus dados',
					highlightedWords: ['faça', 'login', 'novamente', 'deletar', 'seus', 'dados']
				}}
				affirmativeButton={{
					label: 'ir para login',
					onPress: performLogout
				}}
				closeModal={() => setSessionExpiredAlertModal(false)}
			/>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					backgroundColor={!hasError ? theme.white3 : theme.red1}
					title={hasError ? 'opa, algo deu errado ao deletar' : ''}
					message={!hasError ? 'o que você quer fazer com seus dados?' : 'tente novamente em alguns instantes'}
					fontSize={16}
					highlightedWords={
						!hasError
							? ['seus', 'dados']
							: ['algo', 'deu', 'errado', 'ao', 'deletar']
					}
					borderLeftWidth={3}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={!hasError ? theme.orange2 : theme.red2}>
				{
					isLoading
						? (
							<Loader />
						)
						: (
							<TitleDescriptionButton
								height={'35%'}
								color={theme.white3}
								title={'ser esquecido'}
								description={'todos os cidadãos do corre. podem ter sua conta e dados deletados, ao clicar aqui você entende que seu usuário, perfil e posts serão removidos de nossa plataforma'}
								highlightedWords={['esquecido', 'sua', 'conta', 'e', 'dados', 'deletados', 'seu', 'perfil', 'usuário', 'posts', 'serão', 'rmeovidos', 'de', 'nossa', 'plataforma']}
								onPress={beForgotten}
							/>
						)

				}
			</FormContainer>
		</Container>
	)
}

export { UserDataConfigurations }
