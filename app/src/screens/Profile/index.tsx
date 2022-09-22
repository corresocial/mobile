import React, { useContext, useEffect, useState } from 'react'
import { Alert, BackHandler, Text, View } from 'react-native'
import { CompleteProfileModal } from '../../components/CompleteProfileModal'
import { AuthContext } from '../../contexts/AuthContext'
import { HomeTabScreenProps } from '../../routes/Stack/stackScreenProps'


function Profile({ navigation }: HomeTabScreenProps) {

	const { getDataFromSecureStore, setDataOnSecureStore } = useContext(AuthContext)

	const [tourModalVisibility, setTourModalVisibility] = useState(false)

	useEffect(() => {
		initializeUserTour()
		setTourModalVisibility(true)
	}, [])


	const initializeUserTour = async () => {
		const userTourPerformed = await checkUserTourPerformed()

		console.log(userTourPerformed)

		if (!userTourPerformed) {
			setTourModalVisibility(true)
		}
	}

	const checkUserTourPerformed = async () => {
		const localUser = await getObjectLocalUser()
		console.log(localUser.name)
		return !!localUser.tourPerformed
	}

	const getObjectLocalUser = async () => {
		const userJSON = await getDataFromSecureStore('corre.user')
		if (!userJSON) return false
		const userObject = await JSON.parse(userJSON)
		return userObject
	}

	const closeTourModal = async () => {
		await setUserTourPerformed()
		setTourModalVisibility(false)
	}

	const setUserTourPerformed = async () => {
		const localUser = await getObjectLocalUser()
		const newLocalUser = { ...localUser, tourPerformed: true }
		setDataOnSecureStore('corre.user', newLocalUser)
	}

	const navigateToTour = async () => {
		await setUserTourPerformed()
		navigation.navigate('TourStack')
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<CompleteProfileModal
				visibility={tourModalVisibility}
				closeModal={closeTourModal}
				navigateToTour={navigateToTour}
			/>
			<Text>This is profile</Text>
		</View>
	)
}

export { Profile }