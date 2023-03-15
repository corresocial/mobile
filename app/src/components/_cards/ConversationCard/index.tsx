import React, { useState } from 'react'

import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { Container, ContainerInner, LastMessageArea, UserInfo } from './styles'

import { SmallUserIdentification } from '../../SmallUserIdentification'
import { UnseenMessagesCount } from '../../UnseenMessagesCount'
import { LeftLineCard } from '../LeftLineCard'

interface ConversationCardProps {
	userName: string
	lastMessage: string
	lastMessageTime: string
	numberOfUnseenMessages: number
	onPress: () => void
}

function ConversationCard({ userName, lastMessage, lastMessageTime, numberOfUnseenMessages, onPress }: ConversationCardProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		onPress()
	}

	return (
		<Container
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerInner style={{ marginLeft: buttonPressed ? relativeScreenWidth(1.7) : 0 }}>
				<UserInfo>
					<SmallUserIdentification
						pictureDimensions={45}
						userName={userName}
						profilePictureUrl={'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/41479_2FF050B33087A556.png?w=876&h=484&crop=1'}
						postDate={lastMessageTime.toString().substring(0, 10)}
						width={'60%'}
						height={'100%'}
					/>
					<UnseenMessagesCount
						height={relativeScreenHeight(5)}
						width={relativeScreenHeight(5)}
						value={numberOfUnseenMessages}
					/>
				</UserInfo>
				<LastMessageArea>
					<LeftLineCard
						text={lastMessage}
						fontSize={12}
						numberOfLines={1}
					/>
				</LastMessageArea>
			</ContainerInner>
		</Container>
	)
}

export { ConversationCard }
