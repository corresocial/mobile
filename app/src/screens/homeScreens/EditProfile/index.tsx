import React, { useContext, useEffect, useRef, useState } from 'react'

import { Animated, StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'
import { Body, Container, Header, SaveButtonContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import CheckIcon from '../../../assets/icons/check.svg'

import { updateAllOwnerOnPosts } from '../../../services/firebase/post/updateAllOwnerOnPosts'
import { arrayIsEmpty } from '../../../common/auxiliaryFunctions'
import { updateUser } from '../../../services/firebase/user/updateUser'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'

import { UserStackParamList } from '../../../routes/Stack/UserStack/types'
import { EditProfileScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { Id, PostCollection } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { Loader } from '../../../components/Loader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'

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
			console.log(err)
			setIsLoading(false)
			setHasUpdateError(true)
		}
	}

	const updateRemoteUser = async () => {
		if (!editDataContext.unsaved.profilePictureUrl) {
			await updateUser(userDataContext.userId as Id, { ...editDataContext.unsaved })
				.then(() => true)
				.catch((err) => {
					console.log(err)
					throw new Error('erro ao atualizar nome remotamente')
				})

			await updateAllOwnerOnPosts(
				{ ...editDataContext.unsaved },
				userDataContext.posts?.map((post: PostCollection) => ({ postId: post.postId, postType: post.postType })) as any[] || [] // TODO Type
			)

			setUserDataOnContext({ ...userDataContext, ...editDataContext.unsaved })
			await setDataOnSecureStore('corre.user', { ...userDataContext, ...editDataContext.unsaved })

			setIsLoading(false)
			navigation.goBack()
			return
		}

		await uploadImage(editDataContext.unsaved.profilePictureUrl, 'users', userDataContext.userId as Id)
			.then(
				({ uploadTask, blob }: any) => {
					uploadTask.on(
						'state_change',
						() => { },
						(err: any) => { setHasUpdateError(err) },
						async () => {
							blob.close()
							getDownloadURL(uploadTask.snapshot.ref)
								.then(async (profilePictureUrl) => {
									await updateUser(userDataContext.userId as Id, { ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] })
										.then(() => true)
										.catch((err) => {
											console.log(err)
											throw new Error('erro ao atualizar nome remotamente')
										})

									await updateAllOwnerOnPosts(
										{ ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] },
										userDataContext.posts?.map((post: PostCollection) => ({ postId: post.postId, postType: post.postType })) as any[] || [] // TODO Type
									)

									setUserDataOnContext({ ...userDataContext, ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] })
									await setDataOnSecureStore('corre.user', { ...userDataContext, ...editDataContext.unsaved, profilePictureUrl: [profilePictureUrl] })

									setIsLoading(false)
									navigation.goBack()
								})
								.catch((err: any) => setHasUpdateError(err))
						},
					)
				},
			)
			.catch((err: any) => {
				setIsLoading(false)
				setHasUpdateError(err)
			})
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
			</Body>
		</Container>
	)
}

export { EditProfile }
