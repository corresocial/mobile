import React, { useEffect, useState } from 'react'
import { Alert, BackHandler, Text, View } from 'react-native'
import { CompleteProfileModal } from '../../components/CompleteProfileModal'

interface ProfileProps {
	firstAccess?: boolean
	firstAccessPerformed: () => void
}

function Profile({ firstAccess, firstAccessPerformed }: ProfileProps) {

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<CompleteProfileModal
				visibility={!!firstAccess}
				closeModal={firstAccessPerformed}
			/>
			<Text>This is profile</Text>
			<Text>Show modal: {firstAccess ? 'sim' : 'não'}</Text>
		</View>
	)
}

export { Profile }