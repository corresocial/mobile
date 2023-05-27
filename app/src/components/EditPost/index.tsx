import React, { useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { StatusBar, Alert } from 'react-native'

import { Id, PostCollection, ServiceCollection, ServiceCollectionRemote, UserCollection } from '../../services/firebase/types'
import { LocalUserData, ServiceData } from '../../contexts/types'

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
	initialPostData: ServiceCollectionRemote
	owner?: PostCollection['owner']
	unsavedPost?: boolean
	children: React.ReactNode | React.ReactNode[]
	navigateBackwards: () => void
	navigateToPostView: (postData: PostCollection) => void
	navigateToSubscriptionContext: () => void
	showShareModal: (visibility: boolean, postTitle?: string) => void
	getPostField: (fieldName: keyof ServiceCollection, allowNull?: boolean) => any // TODO Type
	userContext: UserContextFragment
	editContext: EditContextFragment
}

function EditPost({
	initialPostData,
	owner,
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

	const { editDataContext } = editContext
	const { userDataContext } = userContext

	useEffect(() => {
		editContext.clearUnsavedEditContext()
	}, [])

	const getUserPostsWithoutEdited = () => {
		const userPosts = userDataContext.posts || []
		return userPosts.filter((post: any) => post.postId !== initialPostData.postId) // TODO Type ServiceCollection
	}

	const editPost = async () => {
		if (!editDataContext.unsaved) return

		try {
			setIsLoading(true)

			if ((editDataContext.unsaved.picturesUrl && editDataContext.unsaved.picturesUrl.length > 0) && !allPicturesAlreadyUploaded()) {
				console.log('with pictures')
				await performPicturesUpload()
				return
			}
			console.log('without pictures')

			const postDataToSave = { ...initialPostData, ...editDataContext.unsaved }
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

			updateUserContext(postDataToSave)
			changeStateOfEditedFields()
			setIsLoading(false)
			navigateBackwards()
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			throw new Error('Erro ao editar post')
		}
	}

	const extractServicePictures = (postData: ServiceData) => postData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const saveServicePost = async () => {
		setHasError(false)
		setIsLoading(true)

		const postData = { ...initialPostData, ...editDataContext.unsaved } as ServiceCollection
		const servicePictures = extractServicePictures(postData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!servicePictures.length) {
				const postId = await createPost(postData, localUser, 'posts', 'service')
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					postData
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
												const postDataWithPicturesUrl = { ...postData, picturesUrl: picturePostsUrls }

												const postId = await createPost(postDataWithPicturesUrl, localUser, 'posts', 'service')
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													postDataWithPicturesUrl
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
		postData: ServiceData,
	) => {
		const postDataToSave = {
			...postData,
			postId,
			postType: 'service',
			createdAt: new Date()
		}

		await updateDocField(
			'users',
			localUser.userId as string,
			'posts',
			postDataToSave,
			true,
		)
			.then(() => {
				const localUserPosts = localUser.posts ? [...localUser.posts] as PostCollection[] : []
				userContext.setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave, owner } as ServiceCollection
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

	const performPicturesUpload = async () => {
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
											updateUserContext(postDataToSave)
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

	const updateUserContext = (postAfterEdit: ServiceCollection) => {
		userContext.setUserDataOnContext({
			posts: [
				...getUserPostsWithoutEdited(),
				postAfterEdit
			]
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

	const userSubscribeIsValid = () => {
		console.log(`range CURRENT: ${getPostField('range')}`)

		if (!userDataContext.subscription) {
			if (getPostField('range') === 'near') return true
			return false
		}

		const rangeOnContext = userDataContext.subscription.subscriptionRange

		console.log(`range CONTEXT: ${rangeOnContext}`)

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
		return unsavedPost ? saveServicePost : editPost
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
							<PostCardContainer hasError={hasError}>
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
				<BodyPadding hasError={hasError}>
					{children}
					<VerticalSigh />
				</BodyPadding >
			</Body>
		</Container>
	)
}

export { EditPost }
