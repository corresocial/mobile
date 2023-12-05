import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { theme } from '@common/theme'
import { Container, DateTimeArea, MessageContainer, MessageContainerInner, RelativeDateTime, TextMessage } from './styles'
import ArrowRightCircleWhiteIcon from '@assets/icons/arrowRightCircle-white.svg'
import { UiUtils } from '@utils-ui/common/UiUtils'

const { formatRelativeDate } = UiUtils()

interface MessageCardProps {
	message: any
	dateTime: Date | number
	owner: boolean
	errorSending?: boolean
	sendAgain: () => void
}

function MessageCard({ message, dateTime, owner, errorSending, sendAgain }: MessageCardProps) {
	const borderStyles = {
		out: {
			borderBottomLeftRadius: owner ? RFValue(18) : 0,
			borderBottomRightRadius: owner ? 0 : RFValue(18)
		},
		inner: {
			borderBottomLeftRadius: owner ? RFValue(15) : 0,
			borderBottomRightRadius: owner ? 0 : RFValue(15)
		}
	}

	return (
		<Container
			style={{ alignItems: owner ? 'flex-end' : 'flex-start' }}
		>
			<MessageContainer
				style={borderStyles.out}
				activeOpacity={!errorSending ? 1 : 0.7}
				onPress={() => (errorSending ? sendAgain() : () => { })}
			>
				<MessageContainerInner style={[
					borderStyles.inner,
					{
						backgroundColor: !errorSending ? theme.white3 : theme.red3
					}
				]}
				>
					<TextMessage
						selectable
						style={{
							color: !errorSending ? theme.black4 : theme.white3
						}}
					>
						{message}
					</TextMessage>
					<DateTimeArea style={{ justifyContent: !errorSending ? 'flex-end' : 'space-between' }}>
						{errorSending && <ArrowRightCircleWhiteIcon width={'15%'} height={'100%'} />}
						<RelativeDateTime
							style={{
								color: !errorSending ? theme.black4 : theme.white3
							}}
						>
							{formatRelativeDate(dateTime)}
						</RelativeDateTime>
					</DateTimeArea>
				</MessageContainerInner>
			</MessageContainer>
		</Container>
	)
}

export { MessageCard }
