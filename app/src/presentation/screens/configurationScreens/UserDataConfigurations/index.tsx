import React, { useState, useContext } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { differenceInMinutes } from 'date-fns'

import { useChatDomain } from '@domain/chat/useChatDomain'
import { PostEntityOptional } from '@domain/post/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { removeAllUserData } from '@data/user/remoteRepository/sujeira/remoteAllUserData'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { ChatContext } from '@contexts/ChatContext'

import { UserDataConfigurationsScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { firebaseAuth } from '@infrastructure/firebase'

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

const { logoutUser } = useUserDomain()
const { clearCache } = useCacheRepository()

function UserDataConfigurations({ navigation }: UserDataConfigurationsScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { removeChatListeners } = useContext(ChatContext)

	const queryClient = useQueryClient()

	const [beForgottenConfirmationModalIsVisible, setBeForgottenConfirmationModalIsVisible] = useState(false)
	const [successModalIsVisible, setSuccessModalIsVisible] = useState(false)
	const [sessionExpiredAlertModal, setSessionExpiredAlertModal] = useState(false)

	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	const beForgotten = () => {
		if (!userPerformRecentLogin()) {
			showSessionExpiredAlertModal()
			return
		}

		toggleBeForgottenConfirmationModalVisibility()
	}

	const userPerformRecentLogin = () => {
		const { currentUser } = firebaseAuth
		const lastSignin: Date = new Date(currentUser?.metadata.lastSignInTime || Date.now() + 50000)
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

			await removeAllUserData( // REFACTOR Não importar direto de @data
				userDataContext.userId,
				userDataContext.profilePictureUrl || [],
				userDataContext.posts as PostEntityOptional[]
			)
			toggleSuccessModalVisibility()

			clearCache(queryClient)
			setIsLoading(false)
		} catch (error: any) {
			setIsLoading(false)

			if (error.code === 'auth/requires-recent-login') {
				showSessionExpiredAlertModal()
			}
			setHasError(true)
			console.log(error)
		}
	}

	const showSessionExpiredAlertModal = () => {
		setSessionExpiredAlertModal(true)
	}

	const performLogout = async () => {
		try {
			clearCache(queryClient)
			await logoutUser(
				useUserRepository,
				usePostRepository,
				useChatDomain,
				removeChatListeners,
				userDataContext.userId
			)
		} catch (error: any) {
			console.log(error)
		}
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
				backgroundColor={theme.colors.white[3]}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					backgroundColor={!hasError ? theme.colors.white[3] : theme.colors.red[1]}
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
			<FormContainer backgroundColor={!hasError ? theme.colors.orange[2] : theme.colors.red[2]}>
				{
					isLoading
						? (
							<Loader />
						)
						: (
							<TitleDescriptionButton
								height={'35%'}
								color={theme.colors.white[3]}
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
