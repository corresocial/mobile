import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { Container, Header, ButtonContainer } from './styles'
import { theme } from '../../../common/theme'
import PlusWhiteIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { createPost } from '../../../services/firebase/post/createPost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'

import { ServiceReviewScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { PostCollection, ServiceCollection } from '../../../services/firebase/types'
import { LocalUserData, ServiceData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { ServiceContext } from '../../../contexts/ServiceContext'
import { StateContext } from '../../../contexts/StateContext'

import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { Loader } from '../../../components/Loader'

function ServiceReview({ navigation }: ServiceReviewScreenProps) {
	const { serviceDataContext } = useContext(ServiceContext)
	const { setUserDataOnContext, userDataContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

	const [hasError, setHasError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

	console.log(serviceDataContext)

	const extractServicePictures = (serviceData: ServiceData) => serviceData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveServicePost = async (skipSaveTime?: boolean) => {
		setIsLoading(true)

		const serviceData = { ...serviceDataContext } as ServiceCollection
		const servicePictures = extractServicePictures(serviceData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!servicePictures.length) {
				const postId = await createPost(serviceData, localUser, 'posts', 'service')
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					serviceData
				)
				return
			}

			const picturePostsUrls: string[] = []
			servicePictures.forEach(async (servicePicture, index) => {
				uploadImage(servicePicture, 'posts', index).then(
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
											if (picturePostsUrls.length === servicePictures.length) {
												const serviceDataWithPicturesUrl = { ...serviceData, picturesUrl: picturePostsUrls }

												const postId = await createPost(serviceDataWithPicturesUrl, localUser, 'posts', 'service')
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													serviceDataWithPicturesUrl
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
			setHasError(true)
			setIsLoading(false)
		}
	}

	const updateUserPost = async (
		localUser: LocalUserData,
		postId: string,
		serviceDataPost: ServiceData,
	) => {
		const postData = {
			...serviceDataPost,
			postId,
			postType: 'service',
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
						} as ServiceCollection
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
				showShareModal(true, serviceDataPost.title)
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
									label={'Publicar post'}
									labelColor={theme.white3}
									SecondSvgIcon={PlusWhiteIcon}
									svgIconScale={['40%', '25%']}
									onPress={saveServicePost}
								/>
							)
					}
				</ButtonContainer>
			</Header>
		</Container>
	)
}

export { ServiceReview }
