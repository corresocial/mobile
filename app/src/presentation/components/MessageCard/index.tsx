import React from 'react'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container, DateTimeArea, MessageContainer, MessageContainerInner, RelativeDateTime, TextMessage } from './styles'
import ArrowRightCircleWhiteIcon from '@assets/icons/arrowRightCircle-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'
import { theme } from '@common/theme'

const { formatRelativeDate } = UiUtils()

interface MessageCardProps {
	message: any
	dateTime: Date | number
	owner: boolean
	errorSending?: boolean
	sendAgain?: () => void
}

function MessageCard({ message, dateTime, owner, errorSending, sendAgain }: MessageCardProps) {
	const borderStyles = {
		out: {
			borderBottomLeftRadius: owner ? relativeScreenDensity(18) : 0,
			borderBottomRightRadius: owner ? 0 : relativeScreenDensity(18)
		},
		inner: {
			borderBottomLeftRadius: owner ? relativeScreenDensity(15) : 0,
			borderBottomRightRadius: owner ? 0 : relativeScreenDensity(15)
		}
	}

	return (
		<Container
			style={{ alignItems: owner ? 'flex-end' : 'flex-start' }}
		>
			<MessageContainer
				style={borderStyles.out}
				activeOpacity={!errorSending ? 1 : 0.7}
				onPress={() => (errorSending ? sendAgain && sendAgain() : () => { })}
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
