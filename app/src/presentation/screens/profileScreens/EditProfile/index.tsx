/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { useUtils } from '@newutils/useUtils'
import * as Sentry from 'sentry-expo'

import { Id } from '@domain/post/entity/types'
import { CompleteUser, UserEntity } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { EditProfileScreenProps } from '@routes/Stack/ProfileStack/screenProps'
import { ProfileStackParamList } from '@routes/Stack/ProfileStack/types'

import { openURL } from '@utils/socialMedias'

import { Body, Container, Header, SaveButtonContainer } from './styles'
import CheckIcon from '@assets/icons/check-white.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { EditCard } from '@components/_cards/EditCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { HorizontalSocialMediaList } from '@components/HorizontalSocialmediaList'
import { Loader } from '@components/Loader'

const { remoteStorage } = useUserRepository()

const { updateUserRepository } = useUserDomain()

const { getObjectDifferences, mergeObjects } = useUtils()

function EditProfile({ navigation }: EditProfileScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { editDataContext, clearEditContext } = useContext(EditContext)

	const [hasUpdateError, setHasUpdateError] = useState(false)
	// const [privateUserLocation, setPrivateUserLocation] = useState<PrivateUserEntity['location'] | null>()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		loadPrivateUserLocation()
		return () => {
			clearEditContext()
		}
	}, [])

	const loadPrivateUserLocation = async () => {
		// const userLocation = await remoteStorage.getPrivateLocation(userDataContext.userId)
		// setPrivateUserLocation(userLocation)
	}

	/* const getUserAddress = () => { SMAS
		if (editDataContext.unsaved && editDataContext.unsaved.location) {
			const userLocation = editDataContext.unsaved.location
			return `${userLocation.city} - ${userLocation.district}`
		}

		if (privateUserLocation) {
			return `${privateUserLocation.city} - ${privateUserLocation.district}`
		}

		return null
	} */

	type UserDataFields = keyof UserEntity
	const getUserField = (fieldName?: UserDataFields) => {
		if (editDataContext.unsaved[fieldName as any]) {
			return editDataContext.unsaved[fieldName as any]
		}
		const mergedPost = mergeObjects<CompleteUser>(userDataContext as CompleteUser, userDataContext.unapprovedData as UserEntity || {})
		return mergedPost ? (mergedPost as any)[fieldName as any] : ''
	}

	const goToEditScreen = (screenName: keyof ProfileStackParamList) => {
		switch (screenName) {
			case 'EditUserName': {
				navigation.navigate('EditUserName', {
					userName: getUserField('name') || '',
					userId: userDataContext.userId || ''
				})
				break
			}
			case 'EditUserDescription': {
				navigation.navigate('EditUserDescription', {
					userDescription: getUserField('description') || '',
					userId: userDataContext.userId || ''
				})
				break
			}
			case 'EditUserLocation': {
				navigation.navigate('EditUserLocation')
				break
			}
			case 'SocialMediaManagement': {
				navigation.navigate('SocialMediaManagement' as any, {
					userId: userDataContext.userId || '',
					socialMedias: userDataContext.socialMedias || [],
					isAuthor: true
				})
				break
			}
			case 'EditUserPicture': {
				navigation.navigate(screenName, {
					profilePictureUrl: getUserField('profilePictureUrl') && getUserField('profilePictureUrl').length ? getUserField('profilePictureUrl')[0] : '',
					userId: userDataContext.userId || ''
				})
				break
			}
			default: return false
		}
	}

	const updateUserData = async () => {
		try {
			setIsLoading(true)
			await updateUser()
			setIsLoading(false)
		} catch (err) {
			Sentry.Native.captureException(err)
			console.log(err)
			setIsLoading(false)
			setHasUpdateError(true)
			setTimeout(() => {
				setHasUpdateError(false)
			}, 3000)
		}
	}

	const updateUser = async () => {
		const dataChanges = getObjectDifferences<CompleteUser>(userDataContext as CompleteUser, { ...editDataContext.unsaved })
		console.log(dataChanges)

		let profilePictureUrl = []
		if (dataChanges && dataChanges.profilePictureUrl && dataChanges.profilePictureUrl.length && dataChanges.profilePictureUrl[0]) {
			profilePictureUrl = await remoteStorage.uploadUserMedia([dataChanges.profilePictureUrl as any], 'pictures')
		} else {
			profilePictureUrl = userDataContext.profilePictureUrl || []
		}

		const picture = dataChanges && dataChanges.profilePictureUrl && dataChanges.profilePictureUrl.length && dataChanges.profilePictureUrl[0]
			? { profilePictureUrl: profilePictureUrl }
			: {}
		const ownerData = dataChanges && (dataChanges.name || dataChanges.profilePictureUrl || dataChanges.socialMedias)
			? {
				owner: {
					userId: userDataContext.userId,
					name: getUserField('name'),
					...picture
				}
			}
			: {}

		const { location, ...approveData } = dataChanges as CompleteUser
		const unapprovedData = { ...approveData, ...ownerData, ...picture } as CompleteUser

		await updateUserRepository(useUserRepository, userDataContext, { unapprovedData })
		if (dataChanges && dataChanges.location) {
			await remoteStorage.updatePrivateLocation(userDataContext.userId as Id, dataChanges.location)
		}

		// CURRENT Passar a edição de links para aqui e não na tela de management

		setUserDataOnContext({ unapprovedData })

		setIsLoading(false)
		navigation.goBack()
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'editar seu perfil'}
					highlightedWords={['editar']}
				/>
				{
					getObjectDifferences(userDataContext, editDataContext.unsaved) && (
						isLoading
							? <Loader />
							: (
								<SaveButtonContainer>
									<PrimaryButton
										color={theme.green3}
										labelColor={theme.white3}
										label={'salvar alterações'}
										highlightedWords={['salvar']}
										fontSize={16}
										SecondSvgIcon={CheckIcon}
										svgIconScale={['35%', '18%']}
										minHeight={relativeScreenHeight(5)}
										relativeHeight={relativeScreenHeight(6)}
										onPress={updateUserData}
									/>
								</SaveButtonContainer>
							)
					)
				}
			</Header>
			<Body style={{ backgroundColor: hasUpdateError ? theme.red2 : theme.orange2 }}	>
				<ScrollView showsVerticalScrollIndicator={false}>
					<VerticalSpacing />
					<EditCard
						title={'seu nome'}
						highlightedWords={['nome']}
						value={getUserField('name')}
						pressionable
						onEdit={() => goToEditScreen('EditUserName')}
					/>
					<VerticalSpacing />
					<EditCard
						title={'sua descrição'}
						highlightedWords={['descrição']}
						value={getShortText(getUserField('description') || '', 140)}
						pressionable
						onEdit={() => goToEditScreen('EditUserDescription')}
					/>
					<VerticalSpacing />
					<EditCard
						title={'links e contatos'}
						highlightedWords={['links', 'contatos']}
						pressionable
						onEdit={() => goToEditScreen('SocialMediaManagement')}
					>
						<HorizontalSocialMediaList socialMedias={userDataContext.socialMedias} onPress={openURL} />
					</EditCard>
					<VerticalSpacing />
					{/* <EditCard // SMAS
						title={'região de moradia'}
						highlightedWords={['moradia']}
						pressionable
						value={getUserAddress() || 'localização utilizada para envio de notificações da prefeitura'}
						onEdit={() => goToEditScreen('EditUserLocation')}
					/>
					<VerticalSpacing /> */}
					<EditCard
						title={'sua foto'}
						highlightedWords={['foto']}
						profilePicturesUrl={getUserField('profilePictureUrl') || []}
						pressionable={false}
						onEdit={() => goToEditScreen('EditUserPicture')}
					/>
					<VerticalSpacing bottomNavigatorSpace />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { EditProfile }
