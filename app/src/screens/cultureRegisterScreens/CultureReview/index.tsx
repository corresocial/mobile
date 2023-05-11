import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { Container, Header, ButtonContainer } from './styles'
import { theme } from '../../../common/theme'
import PlusWhiteIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { createPost } from '../../../services/firebase/post/createPost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'

import { CultureReviewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { PostCollection, CultureCollection } from '../../../services/firebase/types'
import { LocalUserData, CultureData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { CultureContext } from '../../../contexts/CultureContext'
import { StateContext } from '../../../contexts/StateContext'

import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { Loader } from '../../../components/Loader'

function CultureReview({ navigation }: CultureReviewScreenProps) {
	const { cultureDataContext } = useContext(CultureContext)
	const { setUserDataOnContext, userDataContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

	const [hasError, setHasError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		console.log('Contexto atual: Culture')
		console.log(cultureDataContext)
	}, [])

	const extractCulturePictures = (cultureData: CultureData) => cultureData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveCulturePost = async () => {
		setIsLoading(true)

		const cultureData = { ...cultureDataContext } as CultureCollection
		const culturePictures = extractCulturePictures(cultureData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!culturePictures.length) {
				const postId = await createPost(cultureData, localUser, 'posts', 'culture')
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					cultureData
				)
				return
			}

			const picturePostsUrls: string[] = []
			culturePictures.forEach(async (culturePicture, index) => {
				uploadImage(culturePicture, 'posts', index).then(
					({ uploadTask, blob }: any) => {
						uploadTask.on(
							'state_change',
							() => { },
							(err: any) => {
								throw new Error(err)
							},
							() => {
								getDownloadURL(uploadTask.snapshot.ref)
									.then(
										async (downloadURL) => {
											blob.close()
											picturePostsUrls.push(downloadURL)
											if (picturePostsUrls.length === culturePictures.length) {
												const cultureDataWithPicturesUrl = { ...cultureData, picturesUrl: picturePostsUrls }

												const postId = await createPost(cultureDataWithPicturesUrl, localUser, 'posts', 'culture')
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													cultureDataWithPicturesUrl
												)
												setIsLoading(false)
											}
										},
									)
							},
						)
					},
				)
			})
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			setHasError(true)
		}
	}

	const updateUserPost = async (
		localUser: LocalUserData,
		postId: string,
		cultureDataPost: CultureData,
	) => {
		const postData = {
			...cultureDataPost,
			postId,
			postType: 'culture',
			createdAt: new Date()
		}

		await updateDocField(
			'users',
			localUser.userId as string,
			'posts',
			postData,
			true,
		)
			.then(() => {
				const localUserPosts = localUser.posts ? [...localUser.posts] as PostCollection[] : []
				setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{
							...postData,
							owner: {
								userId: localUser.userId,
								name: localUser.name,
								profilePictureUrl: localUser.profilePictureUrl
							}
						} as CultureCollection
					],
				})
				setDataOnSecureStore('corre.user', {
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{
							...postData,
							owner: {
								userId: localUser.userId,
								name: localUser.name,
								profilePictureUrl: localUser.profilePictureUrl
							}
						},
					],
				})
				setIsLoading(false)
				showShareModal(true, cultureDataPost.title)
				navigation.navigate('HomeTab')
			})
			.catch((err: any) => {
				console.log(err)
				setIsLoading(false)
				setHasError(true)
			})
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'revisar seu post'}
					highlightedWords={['revisar']}
				/>
				<ButtonContainer>
					{
						isLoading
							? <Loader />
							: (
								<PrimaryButton
									color={theme.green3}
									label={'publicar post'}
									labelColor={theme.white3}
									SecondSvgIcon={PlusWhiteIcon}
									onPress={saveCulturePost}
								/>
							)
					}
				</ButtonContainer>
			</Header>
		</Container>
	)
}

export { CultureReview }
