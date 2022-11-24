import React, { useContext, useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import {
	Body,
	Container,
	InfoArea,
	OptionsArea,
	ProfileHeader,
	UserName
} from './styles'
import { theme } from '../../../common/theme'

import { updateUser } from '../../../services/firebase/user/updateUser'

import { HomeTabScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { UserCollection } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FinishedTourModal } from '../../../components/_modals/FinishedTourModal'
import { TourModal } from '../../../components/_modals/TourModal'
import { MoreOptionsButton } from '../../../components/_buttons/MoreOptionsButton'
import { ShareButton } from '../../../components/_buttons/ShareButton'
import { PhotoPortrait } from '../../../components/PhotoPortrait'

function Profile({ navigation, route }: HomeTabScreenProps) {
	const { getDataFromSecureStore, setDataOnSecureStore, deleteLocaluser } = useContext(AuthContext)

	const [profilePicture, setProfilePicture] = useState<string[]>([])
	const [userName, setUserName] = useState<string>('')
	const [tourModalVisibility, setTourModalVisibility] = useState(false)// TODO DevOnly, default(false)
	const [finishedTourModalVisibility, setFinishedTourModalVisibility] = useState(false)// TODO DevOnly, default(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			checkEndingTour()
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		initializeUserTour()
		getProfileData()
	}, [])

	const initializeUserTour = async () => {
		const userTourPerformed = await checkUserTourPerformed()
		if (!userTourPerformed) {
			setTourModalVisibility(true)
		}
	}

	const checkEndingTour = () => {
		if (route.params && route.params.showShareModal) {
			setFinishedTourModalVisibility(true)
		}
	}

	const checkUserTourPerformed = async () => {
		const localUser = await getObjectLocalUser()
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
		const newLocalUser = {
			...localUser, tourPerformed: true
		}
		await updateUserData(localUser.userId, {
		})
		setDataOnSecureStore('corre.user', newLocalUser)
	}

	const updateUserData = async (userId: string, userData: UserCollection) => {
		await updateUser(userId, {
			tourPerformed: true
		})
	}

	const navigateToTour = async () => {
		await setUserTourPerformed()
		setTourModalVisibility(false)
		navigation.navigate('SelectPostType')
	}

	const getProfileData = async () => {
		const localUser = await getObjectLocalUser()
		const { profilePictureUrl, name } = localUser
		setProfilePicture(profilePictureUrl || [])
		setUserName(name)
	}

	const sharePost = () => {
		Alert.alert('Opa!', 'Compatilhar')
	}

	const cleanLocalStorage = async () => { // TODO DevOnly
		await deleteLocaluser()
		Alert.alert('Certo!', 'Dados do local storage apagados, recarregue a aplicação!')
	}

	/* const lauchError = () => { // TODO DevOnly
		throw new Error('Testing error boundary')
	} */

	return (
		<Container style={{
			flex: 1
		}}
		>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<TourModal
				visibility={tourModalVisibility}
				closeModal={closeTourModal}
				onPressButton={navigateToTour}
			/>
			<FinishedTourModal
				visibility={finishedTourModalVisibility}
				closeModal={() => setFinishedTourModalVisibility(false)}
				onPressButton={sharePost}
			/>
			<DefaultHeaderContainer
				backgroundColor={theme.white3}
				centralized={false}
				relativeHeight={'19%'}
			>
				<ProfileHeader>
					<PhotoPortrait
						height={RFValue(95)}
						width={RFValue(100)}
						borderWidth={3}
						borderRightWidth={8}
						pictureUri={profilePicture[0] || ''}
					/>
					<InfoArea>
						<UserName>{userName}</UserName>
						<OptionsArea>
							<ShareButton
								color={theme.orange3}
								fontSize={13}
								relativeWidth={'70%'}
								height={30}
								onPress={() => { }}
							/>
							<MoreOptionsButton
								color={theme.white3}
								height={30}
								width={30}
								onPress={cleanLocalStorage}
							/>
						</OptionsArea>
					</InfoArea>
				</ProfileHeader>
			</DefaultHeaderContainer>
			<Body>
				{/* Implements */}
			</Body>
		</Container>
	)
}

export { Profile }
