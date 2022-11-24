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

import { HomeTabScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { MoreOptionsButton } from '../../../components/_buttons/MoreOptionsButton'
import { ShareButton } from '../../../components/_buttons/ShareButton'
import { PhotoPortrait } from '../../../components/PhotoPortrait'

function Profile({ navigation }: HomeTabScreenProps) {
	const { getDataFromSecureStore, deleteLocaluser } = useContext(AuthContext)

	const [profilePicture, setProfilePicture] = useState<string[]>([])
	const [userName, setUserName] = useState<string>('')

	useEffect(() => {
		getProfileData()
	}, [])

	const getProfileData = async () => {
		const localUser = await getObjectLocalUser()
		const { profilePictureUrl, name } = localUser
		setProfilePicture(profilePictureUrl || [])
		setUserName(name)
	}

	const getObjectLocalUser = async () => {
		const userJSON = await getDataFromSecureStore('corre.user')
		if (!userJSON) return false
		const userObject = await JSON.parse(userJSON)
		return userObject
	}

	const cleanLocalStorage = async () => { // TODO DevOnly
		await deleteLocaluser()
		Alert.alert('Certo!', 'Dados do local storage apagados, recarregue a aplicação!')
	}

	return (
		<Container style={{
			flex: 1
		}}
		>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
