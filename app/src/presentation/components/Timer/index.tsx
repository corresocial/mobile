import React, { useEffect, useRef, useState } from 'react'

import { Container, CounterText } from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'

import { ProgressBar } from '../ProgressBar'

interface TimerProps {
	initialTimeInMinutes: number
	label?: string
	counterTextOnly?: boolean
	resetTimer?: boolean
	onTimeIsOver?: () => void
}

type Timeout = ReturnType<typeof setTimeout>

function Timer({ label, initialTimeInMinutes, counterTextOnly, resetTimer, onTimeIsOver }: TimerProps) {
	const calculateTotalSeconds = () => {
		return initialTimeInMinutes ? initialTimeInMinutes * 60 : 5 * 60
	}

	const totalSeconds = calculateTotalSeconds()

	const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
	const timerRef = useRef<Timeout | null>(null)

	useEffect(() => {
		startTimer()
		return stopTimer
	}, [])

	useEffect(() => {
		setSecondsLeft(calculateTotalSeconds())
		restartTimer()
	}, [resetTimer])

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setSecondsLeft((previousTime) => {
				if (previousTime <= 0) {
					if (timerRef.current) clearInterval(timerRef.current)
					onTimeIsOver && onTimeIsOver()
					return 0
				}
				return previousTime - 1
			})
		}, 1000)
	}

	const stopTimer = () => {
		if (timerRef.current) clearInterval(timerRef.current)
	}

	const restartTimer = () => {
		stopTimer()
		startTimer()
	}

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
			< ProgressBar range={calculateTotalSeconds()} value={secondsLeft} withoutIndicator />
		</Container>
	)
}

export { Timer }
