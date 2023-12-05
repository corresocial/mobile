import React, { useState } from 'react'

import { Container, InputMessage, SendButtonArea, SendButtonAreaInner } from './styles'
import AngleRightDisabledIcon from '@assets/icons/angleRight-disabled.svg'
import AngleRightWhitetIcon from '@assets/icons/angleRight-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

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
				style={{
					backgroundColor: message ? theme.black4 : theme.white3,
				}}
			>
				<SendButtonAreaInner
					style={{
						backgroundColor: message ? theme.green3 : theme.white3,
						borderColor: message ? theme.black4 : theme.white3,
						left: !message || buttonPressed ? -1 : -relativeScreenWidth(2),
					}}
				>
					{
						message
							? <AngleRightWhitetIcon width={'45%'} height={'60%'} />
							: <AngleRightDisabledIcon width={'45%'} height={'60%'} />
					}
				</SendButtonAreaInner>
			</SendButtonArea>
		</Container>
	)
}

export { ChatInput }
