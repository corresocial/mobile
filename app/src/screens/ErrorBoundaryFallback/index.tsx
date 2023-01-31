/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { View, Text } from 'react-native'

function ErrorBoundaryFallback(props: { error: Error, resetError: Function }) {
	console.log('FallBack')

	if (props.error === Error('aasd')) {
		props.resetError()
	}

	return (
		<View>
			<Text>{' sd asd asd asd asd '}</Text>
			<Text>{' sd asd asd asd asd '}</Text>
			<Text>{' sd asd asd asd asd '}</Text>
			<Text>{' sd asd asd asd asd '}</Text>
			<Text>{' sd asd asd asd asd '}</Text>
			<Text>{props.error.toString()}</Text>
		</View>
	)
}

export { ErrorBoundaryFallback }
