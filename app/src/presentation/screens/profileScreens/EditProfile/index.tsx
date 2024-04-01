import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { getDownloadURL } from 'firebase/storage'
import * as Sentry from 'sentry-expo'

import { useChatDomain } from '@domain/chat/useChatDomain'
import { Id, PostEntityOptional } from '@domain/post/entity/types'
import { PrivateUserEntity } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { uploadImage } from '@data/imageStorage/uploadPicture'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { EditProfileScreenProps } from '@routes/Stack/ProfileStack/screenProps'
import { ProfileStackParamList } from '@routes/Stack/ProfileStack/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
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
const { remoteStorage: remotePostStorage } = usePostRepository()

const { updateUserRepository } = useUserDomain()
const { updateProfilePictureOnConversations } = useChatDomain()

const { arrayIsEmpty } = UiUtils()

function EditProfile({ navigation }: EditProfileScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { editDataContext, clearEditContext } = useContext(EditContext)

	const [hasUpdateError, setHasUpdateError] = useState(false)
	const [privateUserLocation, setPrivateUserLocation] = useState<PrivateUserEntity['location'] | null>()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		loadPrivateUserLocation()
		return () => {
			clearEditContext()
		}
	}, [])

	const loadPrivateUserLocation = async () => {
		const userLocation = await remoteStorage.getPrivateLocation(userDataContext.userId)
		setPrivateUserLocation(userLocation)
	}

	const getUserAddress = () => {
		if (editDataContext.unsaved && editDataContext.unsaved.location) {
			const userLocation = editDataContext.unsaved.location
			return `${userLocation.city} - ${userLocation.district}`
		}

		if (privateUserLocation) {
			return `${privateUserLocation.city} - ${privateUserLocation.district}`
		}

		return null
	}

	const goToEditScreen = (screenName: keyof ProfileStackParamList) => {
		switch (screenName) {
			case 'EditUserName': {
				navigation.navigate('EditUserName', {
					userName: editDataContext.unsaved.name || userDataContext.name || '',
					userId: userDataContext.userId || ''
				})
				break
			}
			case 'EditUserDescription': {
				navigation.navigate('EditUserDescription', {
					userDescription: editDataContext.unsaved.description || userDataContext.description || '',
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
					profilePictureUrl: getProfilePictureUrl(),
					userId: userDataContext.userId || ''
				})
				break
			}
			default: return false
		}
	}

	const getProfilePictureUrl = () => {
		if (userDataContext && !userDataContext.profilePictureUrl && !editDataContext.unsaved.profilePictureUrl) return ''
		if (arrayIsEmpty([editDataContext.unsaved.profilePictureUrl]) && arrayIsEmpty(userDataContext.profilePictureUrl)) return ''
		if (editDataContext.unsaved.profilePictureUrl === '') return ''
		if (editDataContext.unsaved.profilePictureUrl) return editDataContext.unsaved.profilePictureUrl
		if (userDataContext && userDataContext.profilePictureUrl && userDataContext.profilePictureUrl[0]) return userDataContext.profilePictureUrl[0]
	}

	const updateUserData = async () => {
		try {
			setIsLoading(true)

			if (!editDataContext.unsaved.profilePictureUrl) {
				await updateUserWithoutUploadPicture()
			} else {
				await updateUserWithUploadPicture()
			}
		} catch (err) {
			Sentry.Native.captureException(err)
			console.log(err)
			setIsLoading(false)
			setHasUpdateError(true)
		}
	}

	const updateUserWithoutUploadPicture = async () => {
		await updateUserRepository(
			useUserRepository,
			userDataContext,
			{ ...editDataContext.unsaved }
		)
		setUserDataOnContext({ ...userDataContext, ...editDataContext.unsaved })

		await remotePostStorage.updateOwnerDataOnPosts(
			{ ...editDataContext.unsaved },
			userDataContext.posts?.map((post: PostEntityOptional) => post.postId) as string[]
		)

		if (editDataContext.unsaved && editDataContext.unsaved.location) {
			await remoteStorage.updatePrivateLocation(
				userDataContext.userId as Id,
				editDataContext.unsaved.location
			)
		}

		setIsLoading(false)
		navigation.goBack()
	}

	const updateUserWithUploadPicture = async () => {
		await uploadImage(editDataContext.unsaved.profilePictureUrl, 'users')
			.then(
				({ uploadTask, blob }: any) => {
					uploadTask.on(
						'state_change',
						() => { },
						(err: any) => { setHasUpdateError(true) },
						async () => {
							blob.close()
							getDownloadURL(uploadTask.snapshot.ref)
								.then(async (profilePictureUrl) => {
									await updateUserRepository(
										useUserRepository,
										userDataContext,
										{ ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] }
									)

									await remotePostStorage.updateOwnerDataOnPosts(
										{ ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] },
										userDataContext.posts?.map((post: PostEntityOptional) => post.postId) as Id[]
									)

									if (!arrayIsEmpty(userDataContext.profilePictureUrl)) {
										await remoteStorage.deleteUserProfilePicture(userDataContext.profilePictureUrl || [])
									}

									await updateProfilePictureOnConversations(userDataContext.userId as Id, profilePictureUrl)

									setUserDataOnContext({ ...userDataContext, ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] })

									setIsLoading(false)
									navigation.goBack()
								})
						},
					)
				},
			)
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
					Object.keys(editDataContext.unsaved).length > 0 && (
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
										minHeight={relativeScreenHeight(6)}
										relativeHeight={relativeScreenHeight(8)}
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
						value={editDataContext.unsaved.name || userDataContext.name}
						pressionable
						onEdit={() => goToEditScreen('EditUserName')}
					/>
					<VerticalSpacing />
					<EditCard
						title={'sua descrição'}
						highlightedWords={['descrição']}
						value={editDataContext.unsaved.description === '' || editDataContext.unsaved.description ? getShortText(editDataContext.unsaved.description, 140) : getShortText(userDataContext.description, 140)}
						pressionable
						onEdit={() => goToEditScreen('EditUserDescription')}
					/>
					<VerticalSpacing />
					<EditCard
						title={'links e contato'}
						highlightedWords={['links', 'contato']}
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
						profilePicturesUrl={[getProfilePictureUrl()] || []}
						pressionable={false}
						onEdit={() => goToEditScreen('EditUserPicture')}
					/>
					<VerticalSpacing height={relativeScreenHeight(5)} />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { EditProfile }
