import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { Container, Header, ButtonContainer } from './styles'
import { theme } from '../../../common/theme'
import PlusWhiteIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { createPost } from '../../../services/firebase/post/createPost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'

import { SaleReviewScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { PostCollection, SaleCollection } from '../../../services/firebase/types'
import { LocalUserData, SaleData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { SaleContext } from '../../../contexts/SaleContext'
import { StateContext } from '../../../contexts/StateContext'

import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { Loader } from '../../../components/Loader'

function SaleReview({ navigation }: SaleReviewScreenProps) {
	const { saleDataContext } = useContext(SaleContext)
	const { setUserDataOnContext, userDataContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

	const [hasError, setHasError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		console.log('Contexto atual: Sale')
		console.log(saleDataContext)
	}, [])

	const extractSalePictures = (saleData: SaleData) => saleData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveSalePost = async () => {
		setIsLoading(true)

		const saleData = { ...saleDataContext } as SaleCollection
		const salePictures = extractSalePictures(saleData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!salePictures.length) {
				const postId = await createPost(saleData, localUser, 'posts', 'sale')
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					saleData
				)
				return
			}

			const picturePostsUrls: string[] = []
			salePictures.forEach(async (salePicture, index) => {
				uploadImage(salePicture, 'posts', index).then(
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
											if (picturePostsUrls.length === salePictures.length) {
												const saleDataWithPicturesUrl = { ...saleData, picturesUrl: picturePostsUrls }

												const postId = await createPost(saleDataWithPicturesUrl, localUser, 'posts', 'sale')
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													saleDataWithPicturesUrl
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
		saleDataPost: SaleData,
	) => {
		const postData = {
			...saleDataPost,
			postId,
			postType: 'sale',
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
						} as SaleCollection
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
				showShareModal(true, saleDataPost.title)
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
									onPress={saveSalePost}
								/>
							)
					}
				</ButtonContainer>
			</Header>
		</Container>
	)
}

export { SaleReview }
