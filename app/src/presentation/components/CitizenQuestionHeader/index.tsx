import React from 'react'

import { ButtonArea, ButtonsContainer, HeaderContainer } from './styles'
import ChatIcon from '@assets/icons/chat-outlined.svg'
import PaperIcon from '@assets/icons/paperList-outlined.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { BackButton } from '@components/_buttons/BackButton'

interface CitizenQuestionHeaderProps {
	onBackPressed: () => void
	onChatOpened: () => void
	onNotePadOpened: () => void
}

function CitizenQuestionHeader({ onBackPressed, onChatOpened, onNotePadOpened }: CitizenQuestionHeaderProps) {
	return (
		<HeaderContainer>
			<BackButton onPress={onBackPressed} />
			<ButtonsContainer>
				<ButtonArea onPress={onChatOpened}>
					<ChatIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
				</ButtonArea>
				<ButtonArea onPress={onNotePadOpened}>
					<PaperIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
				</ButtonArea>
			</ButtonsContainer>
		</HeaderContainer>
	)
}

export { CitizenQuestionHeader }
