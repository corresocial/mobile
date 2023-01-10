import React, { useEffect, useState, useContext } from 'react'

import { StatusBar } from 'react-native'
import { Body, Container, Header, Sigh } from './styles'

import { LocalUserData } from '../../../contexts/types'
import { UserStackParamList } from '../../../routes/Stack/UserStack/types'
import { EditProfileScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { arrayIsEmpty } from '../../../common/auxiliaryFunctions'
import { theme } from '../../../common/theme'

function EditProfile({ route, navigation }: EditProfileScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const goToEditScreen = (screenName: keyof UserStackParamList) => {
		switch (screenName) {
			case 'EditUserName': {
				navigation.navigate('EditUserName', {
					userName: userDataContext.name || '',
					userId: userDataContext.userId || ''
				})
				break
			}
			case 'EditUserDescription': {
				navigation.navigate('EditUserDescription', {
					userDescription: userDataContext.description || '',
					userId: userDataContext.userId || ''
				})
				break
			}
			case 'EditUserPicture': {
				navigation.navigate(screenName, {
					profilePictureUrl: getProfilePictureUrl(),
					userId: userDataContext.userId || ''
				})
				break
			}
			default: return false
		}
	}

	const getProfilePictureUrl = () => {
		if (!userDataContext || !userDataContext.profilePictureUrl) return ''
		if (arrayIsEmpty(userDataContext.profilePictureUrl)) return ''
		return userDataContext.profilePictureUrl[0]
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
					value={userDataContext.name}
					onEdit={() => goToEditScreen('EditUserName')}
				/>
				<Sigh />
				<EditCard
					title={'sua descrição'}
					highlightedWords={['descrição']}
					value={userDataContext.description}
					onEdit={() => goToEditScreen('EditUserDescription')}
				/>
				<Sigh />
			</Body>
		</Container>
	)
}

export { EditProfile }
