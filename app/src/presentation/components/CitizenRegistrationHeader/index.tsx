import { useNavigation } from '@react-navigation/native'
import React from 'react'
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
	customHeaderHeight?: string
	highlightedWords?: string[]
	progress?: number[]
	navigateBackwards: () => void
}

export function CitizenRegistrationHeader({ message, customHeaderHeight, highlightedWords, progress, navigateBackwards }: CitizenRegistrationHeaderProps) {
	const { showQuestionObservations } = useCitizenRegistrationContext()

	const navigation = useNavigation()

	// const openChat = async () => {
	// 	navigation.navigate('ChatMessages' as any, {
	// 		chat: {
	// 			chatId: '',
	// 			user1: {
	// 				userId: userDataContext.userId || '',
	// 				name: userDataContext.name || '',
	// 				profilePictureUrl: getUserProfilePictureFromContext(),
	// 			},
	// 			user2: {
	// 				userId: getUserField('userId') as Id,
	// 				name: getUserField('name') as string,
	// 				profilePictureUrl: getProfilePicture() || '',
	// 			},
	// 			messages: {},
	// 		} as Chat
	// 	})
	// }

	const theme = useTheme()

	return (
		<>
			<CitizenQuestionHeader
				openChat={() => console.log('openChat')}
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
