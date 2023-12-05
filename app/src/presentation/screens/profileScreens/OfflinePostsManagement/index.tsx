/* eslint-disable no-restricted-syntax */
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { getDownloadURL } from 'firebase/storage'

import { AuthContext } from '@contexts/AuthContext'
import { LocalUserData } from '@contexts/types'

import { OfflinePostsManagementScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { PostCollection, PostCollectionRemote } from '@services/firebase/types'

import { updateDocField } from '@services/firebase/common/updateDocField'
import { uploadImage } from '@services/firebase/common/uploadPicture'
import { createPost } from '@services/firebase/post/createPost'

import { Body, Container, Header, SaveButtonContainer } from './styles'
import AngleRightWhiteIcon from '@assets/icons/angleRight-white.svg'
import HandOnMoneyWhiteIcon from '@assets/icons/handOnMoney-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { PostCard } from '@components/_cards/PostCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FlatListPosts } from '@components/FlatListPosts'
import { Loader } from '@components/Loader'

import { getNetworkStatus } from '@utils/deviceNetwork'
import { deletePostByDescription, getOfflinePosts } from '@utils/offlinePost'

function OfflinePostsManagement({ route, navigation }: OfflinePostsManagementScreenProps) {
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore } = useContext(AuthContext)

	const [isLoading, setIsLoading] = useState(false)
	const [offlinePosts, setOfflinePosts] = useState([])

	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => loadOfflinePosts())
		return unsubscribe
	}, [navigation])

	const loadOfflinePosts = async () => {
		const storedOfflinePosts = await getOfflinePosts()

		if (!storedOfflinePosts || !storedOfflinePosts.length) {
			navigation.goBack()
		}

		setOfflinePosts(storedOfflinePosts)
	}

	const extractPostPictures = (postData: PostCollectionRemote) => postData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const checkNetworkStatus = async () => {
		const networkStatus = await getNetworkStatus()
		return !!networkStatus.isConnected && !!networkStatus.isInternetReachable
	}

	const navigateToSubscriptionContext = () => {
		navigation.navigate('SelectSubscriptionPlan', { postRange: getMajorOfflinePostRange() })
	}

	const saveOfflinePost = async () => {
		const hasValidConnection = await checkNetworkStatus()
		if (!hasValidConnection) return

		const savedPosts = []

		try {
			for await (const post of offlinePosts as PostCollectionRemote[]) {
				const currentPost = await saveAndReturnPost(post, savedPosts)
				await deletePostByDescription(post.description)
				savedPosts.push(currentPost)
			}

			navigation.goBack()
		} catch (err) {
			setHasError(true)
		}
	}

	async function saveAndReturnPost(post: any, savedPosts: any) {
		const currentPost = await savePost(post, savedPosts)
		return currentPost
	}

	const savePost = async (postData: PostCollectionRemote, currentBatchPosts: PostCollectionRemote[] = []) => {
		const postPictures = extractPostPictures(postData)

		setHasError(false)
		setIsLoading(true)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			const localUserPosts = localUser.posts ? localUser.posts : []
			const storedUserPosts = [...localUserPosts, ...currentBatchPosts]

			if (!postPictures.length) {
				const postId = await createPost(postData, localUser, 'posts', postData.postType)
				if (!postId) throw new Error('Não foi possível identificar o post')

				const savedPostData = await updateUserPost(
					{ ...localUser, posts: storedUserPosts },
					postId,
					postData
				)

				setIsLoading(false)
				return savedPostData
			}

			const picturePostsUrls: string[] = []
			postPictures.forEach(async (postPicture: string, index: number) => {
				uploadImage(postPicture, 'posts', index).then(
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
											if (picturePostsUrls.length === postPictures.length) {
												const postDataWithPicturesUrl = { ...postData, picturesUrl: picturePostsUrls }

												const postId = await createPost(postDataWithPicturesUrl, localUser, 'posts', postData.postType)
												if (!postId) throw new Error('Não foi possível identificar o post')

												return updateUserPost(
													{ ...localUser, posts: storedUserPosts },
													postId,
													postDataWithPicturesUrl
												)
													.then((savedPostData) => {
														setIsLoading(false)
														return savedPostData
													})
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
		postData: PostCollectionRemote,
	) => {
		const postDataToSave = {
			...postData,
			postId,
			postType: postData.postType,
			createdAt: new Date(),
			owner: {
				userId: userDataContext.userId,
				name: userDataContext.name,
				profilePictureUrl: userDataContext.profilePictureUrl
			}
		}

		return updateDocField(
			'users',
			localUser.userId as string,
			'posts',
			userDataContext.posts ? postDataToSave : [postDataToSave],
			!!userDataContext.posts,
		)
			.then(() => {
				const localUserPosts = localUser.posts ? [...localUser.posts as any] as PostCollectionRemote[] : [] // TODO Type
				setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave } as PostCollectionRemote
					],
				})
				setDataOnSecureStore('corre.user', {
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave }
					],
				})

				setIsLoading(false)
				return postDataToSave
			})
			.catch((err: any) => {
				console.log(err)
				setIsLoading(false)
				setHasError(true)
			})
	}

	const allOfflinePostsOnRange = () => {
		const posts = offlinePosts.map((post: PostCollection) => {
			if (post.range === 'city' && userDataContext.subscription?.subscriptionRange === 'near') return false
			if (post.range === 'country' && userDataContext.subscription?.subscriptionRange === 'near') return false
			if (post.range === 'country' && userDataContext.subscription?.subscriptionRange === 'city') return false
			return true
		})

		return posts.every((item) => item === true)
	}

	const getMajorOfflinePostRange = () => {
		const postsRange = offlinePosts.map((post: PostCollection) => post.range)

		if (postsRange.includes('country')) return 'country'
		if (postsRange.includes('city')) return 'city'
		return 'near'
	}

	const renderPostItem = (item: PostCollection) => (
		<PostCard
			post={{ ...item, createdAt: new Date() }}
			owner={item.owner}
			onPress={() => naigateToReviewPost(item)}
		/>
	)

	const getActionButtonLabel = () => {
		if (hasError) return 'tentar novamente'
		return allOfflinePostsOnRange() ? 'publicar todos os posts' : 'ir para pagamento'
	}

	const getActionButtonLabelHighlighted = () => {
		if (hasError) return ['novamente']
		return allOfflinePostsOnRange() ? ['publicar'] : ['pagamento']
	}

	const naigateToReviewPost = (post: PostCollection) => {
		switch (post.postType) {
			case 'service': return navigation.navigate('EditServicePost', { postData: { ...post } as any, unsavedPost: true, offlinePost: true })
			case 'sale': return navigation.navigate('EditSalePost', { postData: { ...post } as any, unsavedPost: true, offlinePost: true })
			case 'vacancy': return navigation.navigate('EditVacancyPost', { postData: { ...post } as any, unsavedPost: true, offlinePost: true })
			case 'culture': return navigation.navigate('EditCulturePost', { postData: { ...post } as any, unsavedPost: true, offlinePost: true })
			case 'socialImpact': return navigation.navigate('EditSocialImpactPost', { postData: { ...post } as any, unsavedPost: true, offlinePost: true })
			default: return null
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={hasError ? 'opa! algo deu errado' : 'posts não enviados'}
					highlightedWords={hasError ? ['opa!'] : ['não', 'enviados']}
				/>
				{
					isLoading
						? <Loader />
						: (
							<SaveButtonContainer>
								<PrimaryButton
									color={theme.green3}
									label={getActionButtonLabel()}
									highlightedWords={getActionButtonLabelHighlighted()}
									labelColor={theme.white3}
									fontSize={16}
									SecondSvgIcon={allOfflinePostsOnRange() ? AngleRightWhiteIcon : HandOnMoneyWhiteIcon}
									svgIconScale={['40%', '20%']}
									minHeight={relativeScreenHeight(6)}
									relativeHeight={relativeScreenHeight(8)}
									onPress={allOfflinePostsOnRange() ? saveOfflinePost : navigateToSubscriptionContext} // TODO Type
								/>
							</SaveButtonContainer>
						)
				}

			</Header>
			<Body backgroundColor={hasError && theme.red2}>
				{
					<FlatListPosts
						data={offlinePosts}
						renderItem={renderPostItem}
						headerComponent={() => (
							<VerticalSpacing />
						)}
					/>
				}
			</Body>
		</Container >
	)
}

export { OfflinePostsManagement }
