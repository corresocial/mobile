import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, InputMessage, SendButtonAreaInner, SideButtonArea } from './styles'
import AngleRightDisabledIcon from '@assets/icons/angleRight-disabled.svg'
import AngleRightWhitetIcon from '@assets/icons/angleRight-white.svg'
import ImpactLabelWhiteIcon from '@assets/icons/impactLabel.svg'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'

interface ChatInputProps {
	showImpactReportButton: boolean
	markChatAsCompleted: () => void
	submitMessage: (text: string) => void
}

function ChatInput({ showImpactReportButton, markChatAsCompleted, submitMessage }: ChatInputProps) {
	const [message, setMessage] = useState('')
	const [sendButtonPressed, setSendButtomPressed] = useState<boolean>(false)

	const [messageInputFocused, setMessageInputFocused] = useState<boolean>(false)

	const sendMessage = () => {
		if (message.trim()) {
			setMessage('')
			submitMessage(message.trim())
		}
	}

	function pressingSendButton() { setSendButtomPressed(true) }

	function notPressingSendButton() { setSendButtomPressed(false) }

	function releaseSendButton() {
		setSendButtomPressed(false)
		sendMessage()
	}

	return (
		<Container>
			{
				showImpactReportButton && (
					<SmallButton
						color={theme.pink3}
						relativeWidth={RFValue(40)}
						height={RFValue(40)}
						SvgIcon={ImpactLabelWhiteIcon}
						svgScale={['75%', '75%']}
						onPress={markChatAsCompleted}
					/>
				)
			}
			<InputMessage
				style={{ textAlignVertical: 'top' }}
				placeholder={'mensagem...'}
				multiline
				value={message}
				inputFocused={messageInputFocused || !!message}
				onFocus={() => setMessageInputFocused(true)}
				onBlur={() => setMessageInputFocused(false)}
				onChangeText={(text: string) => setMessage(text)}
			/>
			<SideButtonArea
				hasInputMessage={!!message}
				activeOpacity={1}
				onPressIn={pressingSendButton}
				onPressOut={notPressingSendButton}
				onPress={releaseSendButton}
			>
				<SendButtonAreaInner
					activeColor={theme.green3}
					hasInputMessage={!!message}
					buttonPressed={sendButtonPressed}
				>
					{
						message
							? <AngleRightWhitetIcon width={'45%'} height={'60%'} />
							: <AngleRightDisabledIcon width={'45%'} height={'60%'} />
					}
				</SendButtonAreaInner>
			</SideButtonArea>
		</Container>
	)
}

export { ChatInput }
