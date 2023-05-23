import React, { useEffect, useState } from 'react'

import { ProgressBar } from '../ProgressBar'

import { Container, CounterText } from './styles'
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'

interface TimerProps {
	initialTimeInMinutes?: number
	label?: string
	counterTextOnly?: boolean
	onTimeIsOver?: () => void
}

function Timer({ label, initialTimeInMinutes, counterTextOnly, onTimeIsOver }: TimerProps) {
	const totalSeconds = initialTimeInMinutes ? initialTimeInMinutes * 60 : 5 * 60

	const [secondsLeft, setSecondsLeft] = useState(totalSeconds)

	useEffect(() => {
		const timer = setInterval(() => {
			setSecondsLeft((previousTime) => {
				if (previousTime <= 0) {
					onTimeIsOver && onTimeIsOver()
					clearInterval(timer)
					return 0
				}
				return previousTime - 1
			})
		}, 1000)

		return () => {
			clearInterval(timer)
		}
	}, [])

	const formatTime = (time: number) => {
		return time < 10 ? `0${time}` : `${time}`
	}

	const minutesRemaining = Math.floor(secondsLeft / 60)
	const secondsRemaining = Math.floor(secondsLeft % 60)

	if (counterTextOnly) {
		return (
			<CounterText>
				{`${formatTime(minutesRemaining)}:${formatTime(secondsRemaining)}`}
			</CounterText>
		)
	}

	return (
		<Container>
			<CounterText>
				{
					showMessageWithHighlight(
						`${label} ${formatTime(minutesRemaining)}:${formatTime(secondsRemaining)}`,
						['tempo', 'para', 'pagar']
					)
				}
			</CounterText>
			<ProgressBar range={totalSeconds} value={secondsLeft} withoutIndicator />
		</Container>
	)
}

export { Timer }
