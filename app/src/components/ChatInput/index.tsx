import React, { useState } from 'react'

import { relativeScreenWidth } from '../../common/screenDimensions'

import { theme } from '../../common/theme'
import { Container, InputMessage, SendButtonArea, SendButtonAreaInner } from './styles'
import AngleRightIcon from '../../assets/icons/angleRight.svg'
import AngleRightInactiveIcon from '../../assets/icons/angleRightInactive.svg'

interface ChatInputProps {
	submitMessage: (text: string) => void
}

function ChatInput({ submitMessage }: ChatInputProps) {
	const [message, setMessage] = useState('')
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	const sendMessage = () => {
		if (message.trim()) {
			setMessage('')
			submitMessage(message.trim())
		}
	}

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		sendMessage()
	}

	return (
		<Container>
			<InputMessage
				placeholder={'escreva sua mensagem...'}
				multiline
				value={message}
				onChangeText={(text: string) => setMessage(text)}
			/>
			<SendButtonArea
				activeOpacity={1}
				onPressIn={pressingButton}
				onPressOut={notPressingButton}
				onPress={releaseButton}
			>
				<SendButtonAreaInner
					style={{
						backgroundColor: message ? theme.green3 : theme.white3,
						borderColor: message ? theme.black4 : theme.black2,
						left: !message || buttonPressed ? -1 : -relativeScreenWidth(2),
					}}
				>
					{
						message
							? <AngleRightIcon width={'45%'} height={'60%'} />
							: <AngleRightInactiveIcon width={'45%'} height={'60%'} />
					}
				</SendButtonAreaInner>
			</SendButtonArea>
		</Container>
	)
}

export { ChatInput }
