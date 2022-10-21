import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { screenHeight } from '../../../common/screenDimensions'
import { RFValue } from 'react-native-responsive-fontsize'

import { AuthContext } from '../../../contexts/AuthContext'
import { HomeTabScreenProps } from '../../../routes/Stack/_stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { CompleteProfileModal } from '../../../components/_modals/CompleteProfileModal'
import { MoreOptionsButton } from '../../../components/_buttons/MoreOptionsButton'
import { ShareButton } from '../../../components/_buttons/ShareButton'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import {
	Body,
	Container,
	InfoArea,
	OptionsArea,
	ProfileHeader,
	UserName
} from './styles'

function Profile({ navigation, }: HomeTabScreenProps) {
	const { getDataFromSecureStore, setDataOnSecureStore } = useContext(AuthContext)
	
	const [profilePicture, setProfilePicture] = useState<string[]>([])
	const [userName, setUserName] = useState<string>('')
	const [tourModalVisibility, setTourModalVisibility] = useState(true)// TODO Development  only

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
		const newLocalUser = { ...localUser, tourPerformed: true }
		setDataOnSecureStore('corre.user', newLocalUser)
	}

	const navigateToTour = async () => {
		await setUserTourPerformed()
		setTourModalVisibility(false)
		navigation.navigate('ServiceStack')
	}

	const getProfileData = async () => {
		const localUser = await getObjectLocalUser()
		const {img_url, name} = localUser
		setProfilePicture(img_url || [])
		setUserName(name)
	}

	return (
		<Container style={{ flex: 1 }}>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<CompleteProfileModal
				visibility={tourModalVisibility}
				closeModal={closeTourModal}
				navigateToTour={navigateToTour}
			/>
			<DefaultHeaderContainer
				backgroundColor={theme.white3}
				centralized={false}
				relativeHeight={'22%'}
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
								onPress={() => { }}
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