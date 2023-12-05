import React,
{ useState } from 'react'

import { Container, ContainerInner, LastMessageArea, UserInfo } from './styles'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

import { LeftLineCard } from '@components/_cards/LeftLineCard'
import { SmallUserIdentification } from '@components/SmallUserIdentification'
import { UnseenMessagesCount } from '@components/UnseenMessagesCount'

interface ConversationCardProps {
	userName: string
	profilePictureUrl: string
	lastMessage: string
	lastMessageTime: string
	numberOfUnseenMessages: number
	navigateToProfile: () => void
	onPress: () => void
}

function ConversationCard({
	userName,
	lastMessage,
	profilePictureUrl,
	lastMessageTime,
	numberOfUnseenMessages,
	navigateToProfile,
	onPress
}: ConversationCardProps) {
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
						profilePictureUrl={profilePictureUrl}
						postDate={lastMessageTime}
						width={'70%'}
						height={'100%'}
						navigateToProfile={navigateToProfile}
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
