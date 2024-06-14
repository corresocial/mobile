import React from 'react'

import { ButtonArea, ButtonsContainer, HeaderContainer } from './styles'
import ChatIcon from '@assets/icons/chat-outlined.svg'
import PaperIcon from '@assets/icons/paperList-outlined.svg'

import { BackButton } from '@components/_buttons/BackButton'

interface CitizenQuestionHeaderProps{
	onBackPressed: () => void
    onChatOpened: () => void
	onNotePadOpened: () => void
}

function CitizenQuestionHeader({ onBackPressed, onChatOpened, onNotePadOpened }: CitizenQuestionHeaderProps) {
	return (
		<HeaderContainer>
			<BackButton onPress={onBackPressed}/>
			<ButtonsContainer>
				<ButtonArea activeOpacity={1} onPress={onChatOpened}>
					<ChatIcon/>
				</ButtonArea>
				<ButtonArea activeOpacity={1} onPress={onNotePadOpened}>
					<PaperIcon/>
				</ButtonArea>
			</ButtonsContainer>
		</HeaderContainer>
	)
}

export { CitizenQuestionHeader }