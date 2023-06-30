import React, { useContext, useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { StatusBar, Alert } from 'react-native'

import { Id, PostCollection, PostCollectionRemote, UserCollection } from '../../services/firebase/types'
import { LocalUserData } from '../../contexts/types'

import { updatePost } from '../../services/firebase/post/updatePost'
import { updateDocField } from '../../services/firebase/common/updateDocField'
import { uploadImage } from '../../services/firebase/common/uploadPicture'
import { createPost } from '../../services/firebase/post/createPost'
import { deletePostPictures } from '../../services/firebase/post/deletePostPictures'

import { theme } from '../../common/theme'
import { relativeScreenHeight } from '../../common/screenDimensions'
import { Body, BodyPadding, Container, Header, PostCardContainer, SaveButtonContainer } from './styles'
import CheckWhiteIcon from '../../assets/icons/check-white.svg'
import PlusWhiteIcon from '../../assets/icons/plusTabIconInactive.svg'
import HandOnMoneyWhiteIcon from '../../assets/icons/handOnMoney-white.svg'

import { DefaultPostViewHeader } from '../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../components/_buttons/PrimaryButton'
import { Loader } from '../../components/Loader'
import { VerticalSigh } from '../../components/VerticalSigh'
import { PostCard } from '../../components/_cards/PostCard'
import { SubtitleCard } from '../../components/_cards/SubtitleCard'
import { InstructionCard } from '../../components/_cards/InstructionCard'
import { updateAllRangeAndLocation } from '../../services/firebase/post/updateAllRangeAndLocation'
import { StripeContext } from '../../contexts/StripeContext'

type UserContextFragment = {
	userDataContext: UserCollection;
	setUserDataOnContext: (data: UserCollection) => void;
	setDataOnSecureStore: (key: string, data: any) => Promise<boolean>
}

type EditContextFragment = {
	setEditDataOnContext: (data: any) => void;
	editDataContext: {
		unsaved: any;
		saved: any;
	};
	clearUnsavedEditContext: () => void;
}

interface EditPostProps {
	initialPostData: PostCollectionRemote
	owner: PostCollectionRemote['owner']
	backgroundColor: string
	unsavedPost?: boolean
	children: React.ReactNode | React.ReactNode[]
	navigateBackwards: () => void
	navigateToPostView: (postData: PostCollectionRemote) => void
	navigateToSubscriptionContext: () => void
	showShareModal: (visibility: boolean, postTitle?: string) => void
	getPostField: (fieldName: keyof PostCollectionRemote, allowNull?: boolean) => any // TODO Type return
	userContext: UserContextFragment
	editContext: EditContextFragment
}

function EditPost({
	initialPostData,
	owner,
	backgroundColor,
	unsavedPost,
	children,
	editContext,
	userContext,
	navigateBackwards,
	navigateToPostView,
	navigateToSubscriptionContext,
	showShareModal,
	getPostField
}: EditPostProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	const { subscriptionHasActive } = useContext(StripeContext) // TODO Migrar para fora do componente
	const { editDataContext } = editContext
	const { userDataContext } = userContext

	useEffect(() => {
		editContext.clearUnsavedEditContext()
	}, [])

	const getUserPostsWithoutEdited = (updatedLocationPosts?: PostCollectionRemote[]) => {
		const userPosts = updatedLocationPosts || userDataContext.posts || []
		return userPosts.filter((post: PostCollection) => post.postId !== initialPostData.postId)
	}

	const locationHasChanged = () => {
		if (Object.keys(editDataContext.unsaved).includes('location') || userContext.userDataContext.subscription?.subscriptionRange !== 'country') {
			return true
		}
		return false
	}

	const editPost = async () => {
		if (!editDataContext.unsaved) return

		const postDataToSave = { ...initialPostData, ...editDataContext.unsaved }

		if (postDataToSave.range !== 'near' && !subscriptionHasActive) {
			Alert.alert('ops!', 'parece que a sua assinatura não está em dia, acesse as configurações e regule seu plano')
			return
		}

		try {
			setIsLoading(true)

			let userPostsUpdated: any = [] // TODO Type
			if (locationHasChanged()) {
				console.log(`locationHasChanged: ${locationHasChanged()}`)
				userPostsUpdated = await updateAllRangeAndLocation(
					owner,
					getUserPostsWithoutEdited(),
					{
						range: getPostField('range'),
						location: getPostField('location')
					}
				)
			}

			if ((editDataContext.unsaved.picturesUrl && editDataContext.unsaved.picturesUrl.length > 0) && !allPicturesAlreadyUploaded()) {
				console.log('with pictures')
				await performPicturesUpload(userPostsUpdated)
				return
			}
			console.log('without pictures')

			delete postDataToSave.owner

			const registredPicturesUrl = initialPostData.picturesUrl || []
			const picturesAlreadyUploadedToRemove = registredPicturesUrl.filter((pictureUrl) => editDataContext.unsaved.picturesUrl && !editDataContext.unsaved.picturesUrl.includes(pictureUrl))
			if (picturesAlreadyUploadedToRemove.length) {
				await deletePostPictures(picturesAlreadyUploadedToRemove)
			}

			await updatePost('posts', initialPostData.postId, postDataToSave)

			if (postDataToSave.location) {
				delete postDataToSave.location.geohashNearby
				delete postDataToSave.location.geohashCity
			}

			await updateDocField(
				'users',
				userDataContext.userId as Id,
				'posts',
				[postDataToSave, ...getUserPostsWithoutEdited()]
			)

			updateUserContext(postDataToSave, userPostsUpdated)
			changeStateOfEditedFields()
			setIsLoading(false)
			navigateBackwards()
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			throw new Error('Erro ao editar post')
		}
	}

	const extractPostPictures = (postData: PostCollectionRemote) => postData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const savePost = async () => {
		const postData = { ...initialPostData, ...editDataContext.unsaved } as PostCollectionRemote
		const postPictures = extractPostPictures(postData)

		if (postData.range !== 'near' && !subscriptionHasActive) {
			Alert.alert('ops!', 'parece que a sua assinatura não está em dia, acesse as configurações e regule seu plano')
			return
		}
		setHasError(false)
		setIsLoading(true)

		try {
			let userPostsUpdated: any = [] // TODO Type
			if (locationHasChanged()) {
				console.log(`locationHasChanged: ${locationHasChanged()}`)
				userPostsUpdated = await updateAllRangeAndLocation(
					owner,
					getUserPostsWithoutEdited(),
					{
						range: getPostField('range'),
						location: getPostField('location')
					}
				)
			}

			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!postPictures.length) {
				const postId = await createPost(postData, localUser, 'posts', postData.postType)
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					postData,
					userPostsUpdated
				)
				return
			}

			const picturePostsUrls: string[] = []
			postPictures.forEach(async (postPicture, index) => {
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

												await updateUserPost(
													localUser,
													postId,
													postDataWithPicturesUrl,
													userPostsUpdated
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
		postData: PostCollectionRemote,
		postsUpdated?: PostCollection[]
	) => {
		const postDataToSave = {
			...postData,
			postId,
			postType: postData.postType,
			createdAt: new Date()
		}

		console.log(postsUpdated)
		await updateDocField(
			'users',
			localUser.userId as string,
			'posts',
			postDataToSave,
			true,
		)
			.then(() => {
				const localUserPosts = postsUpdated || localUser.posts ? [...localUser.posts as any] as PostCollectionRemote[] : [] // TODO Type
				userContext.setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave, owner } as PostCollectionRemote
					],
				})

				userContext.setDataOnSecureStore('corre.user', {
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave, owner }
					],
				})

				setIsLoading(false)
				showShareModal(true, postData.title)
				navigateToPostView({ ...postDataToSave, owner } as any) // TODO
			})
			.catch((err: any) => {
				console.log(err)
				setIsLoading(false)
				setHasError(true)
			})
	}

	const changeStateOfEditedFields = (uploadedPictures?: string[]) => {
		let newEditState
		if (uploadedPictures) {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved, picturesUrl: [...uploadedPictures] }, unsaved: {} }
		} else {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} }
		}

		editContext.setEditDataOnContext(newEditState)
	}

	const allPicturesAlreadyUploaded = () => {
		return editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')).length === editDataContext.unsaved.picturesUrl.length
	}

	const performPicturesUpload = async (postsUpdated?: PostCollection[]) => {
		const picturesNotUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')) || []

		const picturePostsUrls: string[] = []
		await picturesNotUploaded.map(async (picturePath: string, index: number) => {
			return uploadImage(picturePath, 'posts', index).then(
				({ uploadTask, blob }: any) => {
					uploadTask.on(
						'state_change',
						() => { },
						(err: any) => {
							throw new Error(err)
						},
						async () => {
							return getDownloadURL(uploadTask.snapshot.ref)
								.then(
									async (downloadURL) => {
										blob.close()
										picturePostsUrls.push(downloadURL)
										if (picturePostsUrls.length === picturesNotUploaded.length) {
											const postDataToSave = {
												...initialPostData,
												...editDataContext.unsaved,
												picturesUrl: [...picturePostsUrls, ...picturesAlreadyUploaded]
											}

											const registredPicturesUrl = initialPostData.picturesUrl || []
											const picturesAlreadyUploadedToRemove = registredPicturesUrl.filter((pictureUrl) => ![...picturePostsUrls, ...picturesAlreadyUploaded].includes(pictureUrl))
											if (picturesAlreadyUploadedToRemove.length) {
												await deletePostPictures(picturesAlreadyUploadedToRemove)
											}

											await updatePost('posts', initialPostData.postId, postDataToSave)

											if (postDataToSave.location) {
												delete postDataToSave.location.geohashNearby
												delete postDataToSave.location.geohashCity
											}

											await updateDocField(
												'users',
												userDataContext.userId as Id,
												'posts',
												[postDataToSave, ...getUserPostsWithoutEdited()]
											)

											changeStateOfEditedFields([...picturePostsUrls, ...picturesAlreadyUploaded])
											updateUserContext(postDataToSave, postsUpdated as any[]) // TODO Type
											setIsLoading(false)
											// navigation.goBack()
										}
									},
								)
								.catch((err) => {
									console.log(err)
									setIsLoading(false)
								})
						},
					)
				},
			)
		})

		return picturePostsUrls
	}

	const updateUserContext = (postAfterEdit: PostCollectionRemote | false, updatedLocationPosts?: PostCollectionRemote[] | []) => {
		const allPosts = updatedLocationPosts && updatedLocationPosts.length ? [...updatedLocationPosts] : [...getUserPostsWithoutEdited()]

		userContext.setUserDataOnContext({
			posts: postAfterEdit
				? [
					...allPosts,
					postAfterEdit
				]
				: [...allPosts]
		})
	}

	const cancelAllChangesAndGoBack = () => {
		if (!(Object.keys(editDataContext.unsaved).length > 0 || unsavedPost)) return navigateBackwards()

		Alert.alert(
			'atenção!',
			`você tem certeza que deseja descartar o post "${getPostField('title')}"?`,
			[
				{ text: 'Não', style: 'destructive' },
				{ text: 'Sim', onPress: () => { navigateBackwards() } },
			],
			{ cancelable: false }
		)
	}

	console.log(userDataContext.subscription?.subscriptionRange as any)
	console.log('------------------------------------')
	console.log(`POST range: ${getPostField('range')}`)

	const userSubscribeIsValid = () => {
		if (!userDataContext.subscription) {
			if (getPostField('range') === 'near') return true
			return false
		}

		const rangeOnContext = userDataContext.subscription.subscriptionRange

		if (rangeOnContext === 'near' && getPostField('range') === 'city') return false
		if (rangeOnContext === 'near' && getPostField('range') === 'country') return false
		if (rangeOnContext === 'city' && getPostField('range') === 'country') return false

		return true
	}

	const getHeaderButtonLabel = () => {
		if (!userSubscribeIsValid()) {
			return 'ir para pagamento'
		}
		return unsavedPost ? 'publicar post' : 'salvar alterações'
	}

	const getHeaderButtonLabelHighlightedWords = () => {
		if (!userSubscribeIsValid()) {
			return ['pagamento']
		}
		return unsavedPost ? ['publicar'] : ['salvar']
	}

	const getHeaderButtonIcon = () => {
		if (!userSubscribeIsValid()) {
			return HandOnMoneyWhiteIcon
		}
		return unsavedPost ? PlusWhiteIcon : CheckWhiteIcon
	}

	const getHeaderButtonHandler = () => {
		if (!userSubscribeIsValid()) {
			return navigateToSubscriptionContext
		}
		return unsavedPost ? savePost : editPost
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={unsavedPost ? 'revisar seu post' : 'editar seu post'}
					highlightedWords={unsavedPost ? ['revisar'] : ['editar']}
					destructiveButton={(Object.keys(editDataContext.unsaved).length > 0 || unsavedPost)}
					onBackPress={cancelAllChangesAndGoBack}
				/>
				{
					hasError && (
						<>
							<VerticalSigh height={relativeScreenHeight(2)} />
							<InstructionCard
								message={'opa! \nalgo deu errado, tente novamente. '}
								highlightedWords={['\nalgo', 'deu', 'errado']}
								backgroundColor={theme.red1}
								flex={0}
								fontSize={14}
								lineHeight={20}
								padding={7}
							/>
						</>
					)
				}
				{
					(Object.keys(editDataContext.unsaved).length > 0 || unsavedPost) && (
						isLoading && !hasError
							? <Loader />
							: (
								<SaveButtonContainer>
									<PrimaryButton
										color={theme.green3}
										label={getHeaderButtonLabel()}
										labelColor={theme.white3}
										highlightedWords={getHeaderButtonLabelHighlightedWords()}
										fontSize={16}
										SecondSvgIcon={getHeaderButtonIcon()}
										svgIconScale={['35%', '18%']}
										minHeight={relativeScreenHeight(6)}
										relativeHeight={relativeScreenHeight(8)}
										onPress={getHeaderButtonHandler()}
									/>
								</SaveButtonContainer>
							)
					)
				}
			</Header>
			<Body >
				{
					unsavedPost && (
						<>
							<SubtitleCard
								text={'seu post'}
								highlightedText={['post']}
							/>
							<PostCardContainer backgroundColor={backgroundColor} hasError={hasError}>
								<PostCard
									owner={owner}
									post={{ ...initialPostData, ...editDataContext.unsaved, createdAt: new Date() }}
									onPress={() => { }}
								/>
							</PostCardContainer>
							<SubtitleCard
								text={'detalhes do post'}
								highlightedText={['detalhes']}
							/>
						</>
					)
				}
				<BodyPadding backgroundColor={backgroundColor} hasError={hasError} >
					{children}
					<VerticalSigh height={relativeScreenHeight(1.5)} />
				</BodyPadding >
			</Body>
		</Container>
	)
}

export { EditPost }
