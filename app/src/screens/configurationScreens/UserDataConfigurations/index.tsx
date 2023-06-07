import React, { useState, useContext } from 'react'

import { Container } from './styles'

import { theme } from '../../../common/theme'

import { removeAllUserData } from '../../../services/firebase/user/removeAllUserData'

import { UserDataConfigurationsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { Id, PostCollection } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { TitleDescriptionButton } from '../../../components/_cards/TitleDescriptionButton'
import { BeForgottenConfirmationModal } from '../../../components/_modals/BeForgottenConfirmationModal'
import { Loader } from '../../../components/Loader'
import { CustomModal } from '../../../components/_modals/CustomModal'
import { ChatContext } from '../../../contexts/ChatContext'

function UserDataConfigurations({ navigation }: UserDataConfigurationsScreenProps) {
	const { userDataContext, deleteLocaluser } = useContext(AuthContext)
	const { removeChatListeners } = useContext(ChatContext)

	const [beForgottenConfirmationModalIsVisible, setBeForgottenConfirmationModalIsVisible] = useState(false)
	const [successModalIsVisible, setSuccessModalIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const beForgotten = () => {
		toggleBeForgottenConfirmationModalVisibility()
	}

	const toggleBeForgottenConfirmationModalVisibility = () => {
		setBeForgottenConfirmationModalIsVisible(!beForgottenConfirmationModalIsVisible)
	}

	const toggleSuccessModalVisibility = () => {
		setSuccessModalIsVisible(!successModalIsVisible)
	}

	const deleteAllUserData = async () => {
		try {
			setIsLoading(true)
			await removeAllUserData(
				userDataContext.userId as Id,
				userDataContext.profilePictureUrl || [],
				userDataContext.posts as PostCollection[]
			).then(() => toggleSuccessModalVisibility())
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	const performLogout = () => {
		removeChatListeners()
		deleteLocaluser()

		navigateToInitialScreen()
	}

	const navigateToInitialScreen = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'AcceptAndContinue' as any }]
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
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'o que você quer fazer com seus dados?'}
					highlightedWords={['seus', 'dados']}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.orange2}>
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
