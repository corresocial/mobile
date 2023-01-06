import React, { useEffect, useState, useContext } from 'react'

import { Body, Container, Header, Sigh } from './styles'

import { LocalUserData } from '../../../contexts/types'
import { UserStackParamList } from '../../../routes/Stack/UserStack/types'
import { EditProfileScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { arrayIsEmpty } from '../../../common/auxiliaryFunctions'

function EditProfile({ route, navigation }: EditProfileScreenProps) {
	const [user, setUser] = useState<LocalUserData>(route.params.user)
	const [descriptionInput, setDescriptionInput] = useState('')

	const { getDataFromSecureStore } = useContext(AuthContext)

	useEffect(() => {
		navigation.addListener('focus', () => {
			getUserDataFromLocal()
		})
	}, [navigation])

	const getUserDataFromLocal = async () => {
		const localUser = await getObjectLocalUser()
		const { userId, name, description, profilePictureUrl } = localUser as LocalUserData
		setDescriptionInput(description as string)
		setUser({
			userId,
			name,
			description,
			profilePictureUrl: profilePictureUrl || [],
		})
	}

	const getObjectLocalUser = async () => {
		const userJSON = await getDataFromSecureStore('corre.user')
		if (!userJSON) return false
		const userObject = await JSON.parse(userJSON)
		return userObject
	}

	const goToEditScreen = (screenName: keyof UserStackParamList) => {
		switch (screenName) {
			case 'EditUserName': {
				navigation.navigate('EditUserName', {
					userName: user.name || '',
					userId: user.userId || ''
				})
				break
			}
			case 'EditUserDescription': {
				navigation.navigate('EditUserDescription', {
					userDescription: user.description || '',
					userId: user.userId || ''
				})
				break
			}
			case 'EditUserPicture': {
				navigation.navigate(screenName, {
					profilePictureUrl: getProfilePictureUrl(),
					userId: user.userId || ''
				})
				break
			}
			default: return false
		}
	}

	const getProfilePictureUrl = () => {
		if (!user || !user.profilePictureUrl) return ''
		if (arrayIsEmpty(user.profilePictureUrl)) return ''
		return user.profilePictureUrl[0]
	}

	return (
		<Container>
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'editar seu perfil'}
					highlightedWords={['editar']}
				/>
			</Header>
			<Body>
				<EditCard
					title={'sua foto'}
					highlightedWords={['foto']}
					profilePictureUrl={getProfilePictureUrl()}
					onEdit={() => goToEditScreen('EditUserPicture')}
				/>
				<Sigh />
				<EditCard
					title={'seu nome'}
					highlightedWords={['nome']}
					value={user.name}
					onEdit={() => goToEditScreen('EditUserName')}
				/>
				<Sigh />
				<EditCard
					title={'sua descrição'}
					highlightedWords={['descrição']}
					value={descriptionInput}
					onEdit={() => goToEditScreen('EditUserDescription')}
				/>
				<Sigh />
			</Body>
		</Container>
	)
}

export { EditProfile }
