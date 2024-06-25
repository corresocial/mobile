import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { useTheme } from 'styled-components'

import { Chat } from '@domain/chat/entity/types'

import { useAuthContext } from '@contexts/AuthContext'
import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { CitizenRegistrationStackParamList } from '@routes/Stack/CitizenRegistrationStack/types'

import { InstructionButtonContainer } from './styles'

import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { CitizenQuestionHeader } from '@components/CitizenQuestionHeader'
import { ProgressBar } from '@components/ProgressBar'

interface CitizenRegistrationHeaderProps {
	message: string
	customHeaderHeight?: string
	highlightedWords?: string[]
	progress?: number[]
	navigateBackwards: () => void
}

export function CitizenRegistrationHeader({ message, customHeaderHeight, highlightedWords, progress, navigateBackwards }: CitizenRegistrationHeaderProps) {
	const { showQuestionObservations } = useCitizenRegistrationContext()
	const { userDataContext } = useAuthContext()

	const navigation = useNavigation<NavigationProp<CitizenRegistrationStackParamList>>()

	const getUserProfilePictureFromContext = () => {
		if (userDataContext && userDataContext.profilePictureUrl) {
			return userDataContext.profilePictureUrl[0] || ''
		}
		return ''
	}

	const openChat = async () => { // REFACTOR tirar isso daqui
		navigation.navigate('ChatMessagesCitizenRegister', {
			chat: {
				chatId: '',
				user1: {
					userId: userDataContext.userId || '',
					name: userDataContext.name || '',
					profilePictureUrl: getUserProfilePictureFromContext(),
				},
				user2: {
					userId: '4HCyTz2Pd3gk83qUjrUW2mSMsIr1',
					name: 'corre.social',
					profilePictureUrl: 'https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/pictures%2Fusers%2F1677264400036-.jpg?alt=media&token=c1ce5fc7-47bb-46f8-880b-c7c7b13e35a6',
				},
				messages: {},
			} as Chat
		})
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
			</DefaultHeaderContainer>
		</>
	)
}
