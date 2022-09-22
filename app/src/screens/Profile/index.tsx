import React, { useEffect, useState } from 'react'
import { Alert, BackHandler, Text, View } from 'react-native'
import { CompleteProfileModal } from '../../components/CompleteProfileModal'
import { ProfileStackScreenProps } from '../../routes/Stack/stackScreenProps'

interface ProfileProps extends ProfileStackScreenProps{
	firstAccess?: boolean
	firstAccessPerformed: () => void
}

function Profile(props: ProfileProps) {

	console.log(props)  // TODO teste navigation
	
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{/* <CompleteProfileModal
				visibility={!!firstAccess}
				closeModal={firstAccessPerformed}
				navigateToTour={() => {}}
			/>
			<Text>This is profile</Text>
			<Text>Show modal: {firstAccess ? 'sim' : 'não'}</Text> */}
		</View>
	)
}

export { Profile }