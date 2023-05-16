import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import { StatusBar, StatusBarProps } from 'react-native'

function FocusAwareStatusBar(props: StatusBarProps) {
	const isFocused = useIsFocused()
	return isFocused ? <StatusBar {...props} /> : null
}

export { FocusAwareStatusBar }
