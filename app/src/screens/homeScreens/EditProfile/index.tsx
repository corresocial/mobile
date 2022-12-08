import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { Body, Container, Header, LastSigh, Sigh } from './styles'

import { LocalUserData } from '../../../contexts/types'
import { EditProfileScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'

function EditProfile({ route, navigation }: EditProfileScreenProps) {
	const [user, setUser] = useState<LocalUserData>({})

	useEffect(() => {
		getRouteParams()
	}, [])

	const getRouteParams = () => {
		const userFromRoute = { ...route.params.user }
		setUser(userFromRoute)
	}

	const goToEditScreen = (screenName: string) => {
		Alert.alert('screenName', screenName)
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
