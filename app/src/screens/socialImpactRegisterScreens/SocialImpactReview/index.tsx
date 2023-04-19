import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { Container, Header, ButtonContainer } from './styles'
import { theme } from '../../../common/theme'
import PlusWhiteIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { createPost } from '../../../services/firebase/post/createPost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'

import { SocialImpactReviewScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { PostCollection, SocialImpactCollection } from '../../../services/firebase/types'
import { LocalUserData, SocialImpactData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { StateContext } from '../../../contexts/StateContext'

import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { Loader } from '../../../components/Loader'

function SocialImpactReview({ navigation }: SocialImpactReviewScreenProps) {
	const { socialImpactDataContext } = useContext(SocialImpactContext)
	const { setUserDataOnContext, userDataContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

	const [hasError, setHasError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

	console.log('Contexto atual: SocialImpact')
	console.log(socialImpactDataContext)

	const extractSocialImpactPictures = (socialImpactData: SocialImpactData) => socialImpactData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveSocialImpactPost = async (skipSaveTime?: boolean) => {
		setIsLoading(true)

		const socialImpactData = { ...socialImpactDataContext } as SocialImpactCollection
		const socialImpactPictures = extractSocialImpactPictures(socialImpactData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!socialImpactPictures.length) {
				const postId = await createPost(socialImpactData, localUser, 'posts', 'socialImpact')
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					socialImpactData
				)
				return
			}

			const picturePostsUrls: string[] = []
			socialImpactPictures.forEach(async (socialImpactPicture, index) => {
				uploadImage(socialImpactPicture, 'posts', index).then(
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
											if (picturePostsUrls.length === socialImpactPictures.length) {
												const socialImpactDataWithPicturesUrl = { ...socialImpactData, picturesUrl: picturePostsUrls }

												const postId = await createPost(socialImpactDataWithPicturesUrl, localUser, 'posts', 'socialImpact')
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													socialImpactDataWithPicturesUrl
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
		socialImpactDataPost: SocialImpactData,
	) => {
		const postData = {
			...socialImpactDataPost,
			postId,
			postType: 'socialImpact',
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
						} as SocialImpactCollection
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
				showShareModal(true, socialImpactDataPost.title)
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
									svgIconScale={['40%', '25%']}
									onPress={saveSocialImpactPost}
								/>
							)
					}
				</ButtonContainer>
			</Header>
		</Container>
	)
}

export { SocialImpactReview }
