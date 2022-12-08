import React, { useEffect, useState, useContext } from 'react'

import { Body, Container, Header, LastSigh, Sigh } from './styles'

import { LocalUserData } from '../../../contexts/types'
import { UserStackParamList } from '../../../routes/Stack/UserStack/types'
import { EditProfileScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'

function EditProfile({ route, navigation }: EditProfileScreenProps) {
	const [user, setUser] = useState<LocalUserData>({})

	const { getDataFromSecureStore } = useContext(AuthContext)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getUserDataFromLocal()
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		getRouteParams()
	}, [])

	const getUserDataFromLocal = async () => {
		const localUser = await getObjectLocalUser()
		const { userId, name, description, profilePictureUrl } = localUser as LocalUserData
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

	const getRouteParams = () => {
		const userFromRoute = { ...route.params.user }
		setUser(userFromRoute)
	}

	const goToEditScreen = (screenName: keyof UserStackParamList) => {
		navigation.navigate(screenName, {
			userName: user.name || '',
			userId: user.userId || ''
		})
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
					profilePictureUrl={'something'}
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
					value={user.description}
					onEdit={() => goToEditScreen('EditUserDescription')}
				/>
				<LastSigh />
			</Body>
		</Container>
	)
}

export { EditProfile }
