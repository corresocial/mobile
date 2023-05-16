import React, { useContext, useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { StatusBar, Alert } from 'react-native'

import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { Body, BodyPadding, Container, Header, PostCardContainer, SaveButtonContainer } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import PlusWhiteIcon from '../../../assets/icons/plusTabIconInactive.svg'
import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'
import CalendarEmptyIcon from '../../../assets/icons/calendarEmpty-unfilled.svg'
import RecycleWhiteIcon from '../../../assets/icons/recycle-white.svg'

import { socialImpactCategories } from '../../../utils/postsCategories/socialImpactCategories'
import { arrayIsEmpty, formatDate, formatHour, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'

import { EditSocialImpactPostReviewScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { EventRepeatType, Id, PostCollection, SocialImpactCategories, SocialImpactCollection, SocialImpactCollectionRemote } from '../../../services/firebase/types'
import { SocialImpactStackParamList } from '../../../routes/Stack/SocialImpactStack/types'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Loader } from '../../../components/Loader'
import { deletePostPictures } from '../../../services/firebase/post/deletePostPictures'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { ExhibitionPlaceCard } from '../../../components/_cards/ExhibitionPlace'
import { PostRangeCard } from '../../../components/_cards/PostRangeCard'
import { createPost } from '../../../services/firebase/post/createPost'
import { LocalUserData, SocialImpactData } from '../../../contexts/types'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { PostCard } from '../../../components/_cards/PostCard'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { SocialImpactTypeCard } from '../../../components/_cards/SocialImpactType'

function EditSocialImpactPost({ route, navigation }: EditSocialImpactPostReviewScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	const owner = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	const { postData, unsavedPost } = route.params

	useEffect(() => {
		clearUnsavedEditContext()
	}, [])

	const getPicturesUrl = () => {
		const picturesUrl = getPostField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const renderSocialImpactRepeat = () => {
		const repeat = getPostField('repeat', true) as EventRepeatType
		switch (repeat) {
			case 'unrepeatable': return showMessageWithHighlight('não se repete', ['não'])
			case 'everyDay': return showMessageWithHighlight('todos os dias', ['todos'])
			case 'weekly': return showMessageWithHighlight('uma vez por semana', ['1', 'semana'])
			case 'biweekly': return showMessageWithHighlight('a cada 15 dias', ['15'])
			case 'monthly': return showMessageWithHighlight('1 vez no mês', ['1', 'mês'])
			default: return '---'
		}
	}

	const navigateToEditScreen = (screenName: keyof SocialImpactStackParamList, initialValue: keyof SocialImpactCollectionRemote) => {
		let value = getPostField(initialValue)

		if (initialValue === 'picturesUrl') {
			value = getPicturesUrl()
		}

		if (initialValue === 'location') {
			value = {
				coordinates: value.coordinates,
				postRange: getPostField('range')
			}
		}

		navigation.navigate('SocialImpactStack', {
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value
			}
		})
	}

	const getUserPostsWithoutEdited = () => {
		const userPosts = userDataContext.posts || []
		return userPosts.filter((post: SocialImpactCollection) => post.postId !== postData.postId)
	}

	const editPost = async () => {
		if (!editDataContext.unsaved) return
		const registredPicturesUrl = postData.picturesUrl || []

		try {
			setIsLoading(true)

			if ((editDataContext.unsaved.picturesUrl && editDataContext.unsaved.picturesUrl.length > 0) && !allPicturesAlreadyUploaded()) {
				console.log('with pictures')
				await performPicturesUpload()
				return
			}
			console.log('without pictures')

			const postDataToSave = { ...postData, ...editDataContext.unsaved }
			delete postDataToSave.owner

			const picturesAlreadyUploadedToRemove = registredPicturesUrl.filter((pictureUrl) => editDataContext.unsaved.picturesUrl && !editDataContext.unsaved.picturesUrl.includes(pictureUrl))
			if (picturesAlreadyUploadedToRemove.length) {
				await deletePostPictures(picturesAlreadyUploadedToRemove)
			}

			await updatePost('posts', postData.postId, postDataToSave)

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
			navigation.goBack()
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			throw new Error('Erro ao editar post')
		}
	}

	const changeStateOfEditedFields = (uploadedPictures?: string[]) => {
		let newEditState
		if (uploadedPictures) {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved, picturesUrl: [...uploadedPictures] }, unsaved: {} }
		} else {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} }
		}

		setEditDataOnContext(newEditState)
	}

	const allPicturesAlreadyUploaded = () => {
		return editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')).length === editDataContext.unsaved.picturesUrl.length
	}

	const performPicturesUpload = async () => {
		const picturesNotUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')) || []
		const registredPicturesUrl = postData.picturesUrl || []

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
												...postData,
												...editDataContext.unsaved,
												picturesUrl: [...picturePostsUrls, ...picturesAlreadyUploaded]
											}

											const picturesAlreadyUploadedToRemove = registredPicturesUrl.filter((pictureUrl) => ![...picturePostsUrls, ...picturesAlreadyUploaded].includes(pictureUrl))
											if (picturesAlreadyUploadedToRemove.length) {
												await deletePostPictures(picturesAlreadyUploadedToRemove)
											}

											await updatePost('posts', postData.postId, postDataToSave)

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
											navigation.goBack()
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

	const updateUserContext = (postAfterEdit: SocialImpactCollection) => {
		setUserDataOnContext({
			posts: [
				...getUserPostsWithoutEdited(),
				postAfterEdit
			]
		})
	}

	const extractSocialImpactPictures = (socialImpactData: SocialImpactData) => socialImpactData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveSocialImpactPost = async () => {
		setHasError(false)
		setIsLoading(true)

		const socialImpactData = { ...postData, ...editDataContext.unsaved } as SocialImpactCollection
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
			setIsLoading(false)
			setHasError(true)
		}
	}

	const updateUserPost = async (
		localUser: LocalUserData,
		postId: string,
		socialImpactDataPost: SocialImpactData,
	) => {
		const postDataToSave = {
			...socialImpactDataPost,
			postId,
			postType: 'socialImpact',
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
				setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{
							...postDataToSave,
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
							...postDataToSave,
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
				navigation.navigate('ViewSocialImpactPost' as any, { postData: { ...postDataToSave, owner } }) // TODO Type
			})
			.catch((err: any) => {
				console.log(err)
				setIsLoading(false)
				setHasError(true)
			})
	}

	const cancelAllChangesAndGoBack = () => {
		if (!(Object.keys(editDataContext.unsaved).length > 0 || unsavedPost)) return navigation.goBack()

		Alert.alert(
			'atenção!',
			`você tem certeza que deseja descartar o post "${getPostField('title')}"?`,
			[
				{ text: 'Não', style: 'destructive' },
				{ text: 'Sim', onPress: () => navigation.goBack() },
			],
			{ cancelable: false }
		)
	}

	const getPostField = (fieldName: keyof SocialImpactCollection, allowNull?: boolean) => {
		if (allowNull && editDataContext.unsaved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const formatCategoryAndTags = () => {
		const category: SocialImpactCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${socialImpactCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
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
										label={unsavedPost ? 'publicar post' : 'salvar alterações'}
										labelColor={theme.white3}
										highlightedWords={unsavedPost ? ['publicar'] : ['salvar']}
										fontSize={16}
										SecondSvgIcon={unsavedPost ? PlusWhiteIcon : CheckWhiteIcon}
										svgIconScale={['35%', '18%']}
										minHeight={relativeScreenHeight(6)}
										relativeHeight={relativeScreenHeight(8)}
										onPress={unsavedPost ? saveSocialImpactPost : editPost}
									/>
								</SaveButtonContainer>
							)
					)
				}
			</Header>
			<Body>
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
									post={{ ...postData, ...editDataContext.unsaved, postType: 'socialImpact', createdAt: new Date() }}
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
					<SocialImpactTypeCard
						title={'tipo de impacto'}
						socialImpactType={getPostField('socialImpactType')}
						onEdit={() => navigateToEditScreen('SelectSocialImpactType', 'socialImpactType')}
					/>
					<VerticalSigh />
					<EditCard
						title={'tags do post'}
						highlightedWords={['tags']}
						value={formatCategoryAndTags()}
						onEdit={() => navigateToEditScreen('SelectSocialImpactCategory', 'tags')}
					/>
					<VerticalSigh />
					<EditCard
						title={'título do post'}
						highlightedWords={['título']}
						value={getPostField('title')}
						onEdit={() => navigateToEditScreen('InsertSocialImpactTitle', 'title')}
					/>
					<VerticalSigh />
					<DescriptionCard
						text={getPostField('description')}
						onEdit={() => navigateToEditScreen('InsertSocialImpactDescription', 'description')}
					/>
					<VerticalSigh />
					<EditCard
						title={'fotos do post'}
						highlightedWords={['fotos']}
						profilePicturesUrl={getPicturesUrl()}
						indicatorColor={theme.pink1}
						carousel
						onEdit={() => navigateToEditScreen('SocialImpactPicturePreview', 'picturesUrl')}
					/>
					<VerticalSigh />
					<PostRangeCard
						postRange={getPostField('range')}
						onEdit={() => navigateToEditScreen('SelectSocialImpactRange', 'range')}
					/>
					<VerticalSigh />
					<LocationViewCard
						title={'localização'}
						locationView={getPostField('locationView')}
						textFontSize={16}
						location={getPostField('location')}
						onEdit={() => navigateToEditScreen('SelectSocialImpactLocationView', 'location')}
					/>
					<VerticalSigh />
					<ExhibitionPlaceCard
						exhibitionPlace={getPostField('exhibitionPlace')}
						onEdit={() => navigateToEditScreen('SelectSocialImpactExhibitionRange', 'exhibitionPlace')}
					/>
					<VerticalSigh />
					<DateTimeCard
						title={'dias da semana'}
						highlightedWords={['dias']}
						weekDaysfrequency={getPostField('exhibitionFrequency')}
						daysOfWeek={getPostField('daysOfWeek', true)}
						onEdit={() => navigateToEditScreen('SelectSocialImpactFrequency', 'daysOfWeek')}
					/>
					<VerticalSigh />
					<EditCard
						title={'repetição'}
						highlightedWords={['repetição']}
						SecondSvgIcon={RecycleWhiteIcon}
						value={renderSocialImpactRepeat() || '---'}
						onEdit={() => navigateToEditScreen('SelectSocialImpactRepeat', 'repeat')}
					/>
					<VerticalSigh />
					<EditCard
						title={'que dia começa'}
						highlightedWords={['começa']}
						SecondSvgIcon={CalendarEmptyIcon}
						value={formatDate(getPostField('startDate', true)) || '---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertSocialImpactStartDate', 'startDate')}
					/>
					<VerticalSigh />
					<EditCard
						title={'que horas começa'}
						highlightedWords={['começa']}
						SecondSvgIcon={ClockWhiteIcon}
						value={formatHour(getPostField('startHour', true)) || '---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertSocialImpactStartHour', 'startHour')}
					/>
					<VerticalSigh />
					<EditCard
						title={'que dia termina'}
						highlightedWords={['termina']}
						SecondSvgIcon={CalendarEmptyIcon}
						value={formatDate(getPostField('endDate', true)) || '---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertSocialImpactEndDate', 'endDate')}
					/>
					<VerticalSigh />
					<EditCard
						title={'que horas termina'}
						highlightedWords={['termina']}
						SecondSvgIcon={ClockWhiteIcon}
						value={formatHour(getPostField('endHour', true)) || '---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertSocialImpactEndHour', 'endHour')}
					/>
					<VerticalSigh />
					<VerticalSigh />
				</BodyPadding>
			</Body>
		</Container>
	)
}

export { EditSocialImpactPost }
