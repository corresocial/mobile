import React from 'react'
import { Alert } from 'react-native'
import { useTheme } from 'styled-components'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InstructionButtonContainer } from './styles'

import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { CitizenQuestionHeader } from '@components/CitizenQuestionHeader'
import { ProgressBar } from '@components/ProgressBar'

interface CitizenRegistrationHeaderProps {
	message: string
	congratulationMessage?: boolean
	customHeaderHeight?: string
	highlightedWords?: string[]
	progress?: number[]
	navigateBackwards: () => void
}

export function CitizenRegistrationHeader({ message, congratulationMessage, customHeaderHeight, highlightedWords, progress, navigateBackwards }: CitizenRegistrationHeaderProps) {
	const { showQuestionObservations } = useCitizenRegistrationContext()
	// const { userDataContext } = useAuthContext()

	// const navigation = useNavigation<NavigationProp<CitizenRegistrationStackParamList>>()

	// const getUserProfilePictureFromContext = () => {
	// 	if (userDataContext && userDataContext.profilePictureUrl) {
	// 		return userDataContext.profilePictureUrl[0] || ''
	// 	}
	// 	return ''
	// }

	const openChat = async () => { // REFACTOR isso não deveria estar aqui
		Alert.alert('Ops!', 'O redirecionamento para a conversar com o coordenador ainda não foi implementada')
		// navigation.navigate('ChatMessagesCitizenRegister', {
		// 	chat: {
		// 		chatId: '',
		// 		user1: {
		// 			userId: userDataContext.userId || '',
		// 			name: userDataContext.name || '',
		// 			profilePictureUrl: getUserProfilePictureFromContext(),
		// 		},
		// 		user2: {
		// 			userId: '4HCyTz2Pd3gk83qUjrUW2mSMsIr1',
		// 			name: 'corre.social',
		// 			profilePictureUrl: 'https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/pictures%2Fusers%2F1677264400036-.jpg?alt=media&token=c1ce5fc7-47bb-46f8-880b-c7c7b13e35a6',
		// 		},
		// 		messages: {},
		// 	} as Chat
		// })
	}

	const theme = useTheme()

	return (
		<>
			<CitizenQuestionHeader
				openChat={openChat}
				openNotePad={showQuestionObservations}
				onBackPressed={navigateBackwards}
			/>
			<DefaultHeaderContainer
				relativeHeight={customHeaderHeight || '35%'}
				grow={!customHeaderHeight}
				centralized
				withoutIOSPadding
				backgroundColor={theme.orange2}
				flexDirection={'column'}
			>
				<VerticalSpacing />
				<InstructionButtonContainer >
					<InstructionCard
						fontSize={16}
						message={message || 'mensagem'}
						highlightedWords={highlightedWords || message ? message.split(' ') : []}
					>
						{progress && <ProgressBar value={progress[0]} range={progress[1]} />}
					</InstructionCard>
				</InstructionButtonContainer>
				{
					congratulationMessage ? (
						<InstructionButtonContainer >
							<InstructionCard
								fontSize={16}
								message={'Muito obrigado pela sua participação! Suas respostas vão nos ajudar a promover nossas ações no futuro. Baixe o nosso aplicativo CORRE.SOCIAL, para acessar mais informações e oportunidades. Ele é gratuito e está disponível na loja de aplicativos'}
								highlightedWords={['Muito', 'obrigado', 'Baixe', 'nosso', 'aplicativo', 'CORRE.SOCIAL,', 'informações', 'oportunidades']}
							/>
						</InstructionButtonContainer>
					) : <></>
				}
			</DefaultHeaderContainer>
		</>
	)
}
