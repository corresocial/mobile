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
	const [tourModalVisibility, setTourModalVisibility] = useState(true)// TODO Development  only

	useEffect(() => {
		initializeUserTour()
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
				centralized={true}
				relativeHeight={'22%'}
			>
				<ProfileHeader>
					<PhotoPortrait
						height={RFValue(100)}
						width={RFValue(100)}
						borderWidth={3}
						borderRightWidth={8}
						pictureUri='https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/imagens%2Fusers%2F7ertzEsACZM7zeScfy6YEKW1zWg2.jpg?alt=media&token=85fc30b5-eeec-4165-8527-f4f5b905062b'
					/>
					<InfoArea>
						<UserName>João Pedro Megid Carrilho</UserName>
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