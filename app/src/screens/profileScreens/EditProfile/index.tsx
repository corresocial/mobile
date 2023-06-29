import React, { useContext, useEffect, useRef, useState } from 'react'
import * as Sentry from 'sentry-expo'

import { Animated, ScrollView, StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'
import { Body, Container, Header, SaveButtonContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import CheckIcon from '../../../assets/icons/check-white.svg'

import { updateAllOwnerOnPosts } from '../../../services/firebase/post/updateAllOwnerOnPosts'
import { arrayIsEmpty } from '../../../common/auxiliaryFunctions'
import { updateUser } from '../../../services/firebase/user/updateUser'

import { UserStackParamList } from '../../../routes/Stack/UserStack/types'
import { EditProfileScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { Id, PostCollection } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { Loader } from '../../../components/Loader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { deleteUserPicture } from '../../../services/firebase/user/deleteUserPicture'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'

function EditProfile({ navigation }: EditProfileScreenProps) {
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore } = useContext(AuthContext)
	const { editDataContext, clearEditContext } = useContext(EditContext)

	const [hasUpdateError, setHasUpdateError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		return () => {
			clearEditContext()
		}
	}, [])

	const goToEditScreen = (screenName: keyof UserStackParamList) => {
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
		if (userDataContext && !userDataContext.profilePictureUrl && !editDataContext.unsaved.profilePictureUrl) return ''
		if (arrayIsEmpty([editDataContext.unsaved.profilePictureUrl]) && arrayIsEmpty(userDataContext.profilePictureUrl)) return ''
		return editDataContext.unsaved.profilePictureUrl || (userDataContext && userDataContext.profilePictureUrl && userDataContext.profilePictureUrl[0])
	}

	const updateUserData = async () => {
		try {
			setIsLoading(true)
			await updateRemoteUser()
		} catch (err) {
			Sentry.Native.captureException(err)
			console.log(err)
			setIsLoading(false)
			setHasUpdateError(true)
		}
	}

	const updateRemoteUser = async () => {
		if (!editDataContext.unsaved.profilePictureUrl) {
			await updateUser(userDataContext.userId as Id, { ...editDataContext.unsaved })

			await updateAllOwnerOnPosts(
				{ ...editDataContext.unsaved },
				userDataContext.posts?.map((post: PostCollection) => post.postId) as Id[]
			)

			setUserDataOnContext({ ...userDataContext, ...editDataContext.unsaved })
			await setDataOnSecureStore('corre.user', { ...userDataContext, ...editDataContext.unsaved })

			setIsLoading(false)
			navigation.goBack()
			return
		}

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
									await updateUser(userDataContext.userId as Id, { ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] })

									await updateAllOwnerOnPosts(
										{ ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] },
										userDataContext.posts?.map((post: PostCollection) => post.postId) as Id[]
									)

									if (!arrayIsEmpty(userDataContext)) {
										await deleteUserPicture(userDataContext.profilePictureUrl || [])
									}

									setUserDataOnContext({ ...userDataContext, ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] })
									await setDataOnSecureStore('corre.user', { ...userDataContext, ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] })
									await deleteUserPicture(userDataContext.profilePictureUrl || [])

									setIsLoading(false)
									navigation.goBack()
								})
						},
					)
				},
			)
	}

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = hasUpdateError

		Animated.timing(headerBackgroundAnimatedValue.current, {
			toValue: existsError ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start()

		return headerBackgroundAnimatedValue.current.interpolate({
			inputRange: [0, 1],
			outputRange: [theme.orange2, theme.red2],
		})
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
			<Body style={{ backgroundColor: animateDefaultHeaderBackgound() }}	>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Sigh />
					<EditCard
						title={'sua foto'}
						highlightedWords={['foto']}
						profilePicturesUrl={[getProfilePictureUrl()] || []}
						onEdit={() => goToEditScreen('EditUserPicture')}
					/>
					<Sigh />
					<EditCard
						title={'seu nome'}
						highlightedWords={['nome']}
						value={editDataContext.unsaved.name || userDataContext.name}
						onEdit={() => goToEditScreen('EditUserName')}
					/>
					<Sigh />
					<EditCard
						title={'sua descrição'}
						highlightedWords={['descrição']}
						value={editDataContext.unsaved.description || userDataContext.description}
						onEdit={() => goToEditScreen('EditUserDescription')}
					/>
					<Sigh />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { EditProfile }
