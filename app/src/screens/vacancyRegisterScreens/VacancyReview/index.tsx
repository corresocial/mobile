import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { Container, Header, ButtonContainer } from './styles'
import { theme } from '../../../common/theme'
import PlusWhiteIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { createPost } from '../../../services/firebase/post/createPost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'

import { VacancyReviewScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { PostCollection, VacancyCollection } from '../../../services/firebase/types'
import { LocalUserData, VacancyData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { VacancyContext } from '../../../contexts/VacancyContext'
import { StateContext } from '../../../contexts/StateContext'

import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { Loader } from '../../../components/Loader'

function VacancyReview({ navigation }: VacancyReviewScreenProps) {
	const { vacancyDataContext } = useContext(VacancyContext)
	const { setUserDataOnContext, userDataContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

	const [hasError, setHasError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		console.log('Contexto atual: Vacancy')
		console.log(vacancyDataContext)
	}, [])

	const extractVacancyPictures = (vacancyData: VacancyData) => vacancyData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveVacancyPost = async () => {
		setIsLoading(true)

		const vacancyData = { ...vacancyDataContext } as VacancyCollection
		const vacancyPictures = extractVacancyPictures(vacancyData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!vacancyPictures.length) {
				const postId = await createPost(vacancyData, localUser, 'posts', 'vacancy')
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					vacancyData
				)
				return
			}

			const picturePostsUrls: string[] = []
			vacancyPictures.forEach(async (vacancyPicture, index) => {
				uploadImage(vacancyPicture, 'posts', index).then(
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
											if (picturePostsUrls.length === vacancyPictures.length) {
												const vacancyDataWithPicturesUrl = { ...vacancyData, picturesUrl: picturePostsUrls }

												const postId = await createPost(vacancyDataWithPicturesUrl, localUser, 'posts', 'vacancy')
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													vacancyDataWithPicturesUrl
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
		vacancyDataPost: VacancyData,
	) => {
		const postData = {
			...vacancyDataPost,
			postId,
			postType: 'vacancy',
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
						} as VacancyCollection
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
				showShareModal(true, vacancyDataPost.title)
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
									onPress={saveVacancyPost}
								/>
							)
					}
				</ButtonContainer>
			</Header>
		</Container>
	)
}

export { VacancyReview }
