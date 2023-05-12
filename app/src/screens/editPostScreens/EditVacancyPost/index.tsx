import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, Alert } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { Body, BodyPadding, Container, Header, PostCardContainer, SaveButtonContainer } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'
import CalendarEmptyIcon from '../../../assets/icons/calendarEmpty-unfilled.svg'
import PlusWhiteIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { vacancyCategories } from '../../../utils/postsCategories/vacancyCategories'
import { arrayIsEmpty, formatDate, formatHour } from '../../../common/auxiliaryFunctions'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { deletePostPictures } from '../../../services/firebase/post/deletePostPictures'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'

import { VacancyStackParamList } from '../../../routes/Stack/VacancyStack/types'
import { EditVacancyPostReviewScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { Id, PostCollection, ServiceCollection, VacancyCategories, VacancyCollection, VacancyCollectionRemote } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { theme } from '../../../common/theme'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Loader } from '../../../components/Loader'
import { VacancyPurposeCard } from '../../../components/_cards/VacancyPurposeCard'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { PlaceModality } from '../../../components/_cards/PlaceModalityCard'
import { VacancyTypeCard } from '../../../components/_cards/VacancyTypeCard'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { PostRangeCard } from '../../../components/_cards/PostRangeCard'
import { ImportantPointsCard } from '../../../components/_cards/ImportantPointsCard'
import { LocalUserData, VacancyData } from '../../../contexts/types'
import { createPost } from '../../../services/firebase/post/createPost'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { PostCard } from '../../../components/_cards/PostCard'
import { InstructionCard } from '../../../components/_cards/InstructionCard'

function EditVacancyPost({ route, navigation }: EditVacancyPostReviewScreenProps) {
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

	const navigateToEditScreen = (screenName: keyof VacancyStackParamList, initialValue: keyof VacancyCollectionRemote, especificField?: string) => {
		let value = getPostField(initialValue)

		if (initialValue === 'picturesUrl') {
			value = getPicturesUrl()
		}

		if (initialValue === 'location' && value) {
			value = {
				coordinates: value.coordinates,
				postRange: getPostField('range')
			}
		}

		navigation.navigate('VacancyStack', {
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value
			}
		})
	}

	const getUserPostsWithoutEdited = () => {
		const userPosts = userDataContext.posts || []
		return userPosts.filter((post: any) => post.postId !== postData.postId) // TODO Type
	}

	const editPost = async () => {
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

			const registredPicturesUrl = postData.picturesUrl || []
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

		// [LEGADO] quando vagas não possuiam imagens
		// setEditDataOnContext({ saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} })
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
												...postData,
												...editDataContext.unsaved,
												picturesUrl: [...picturePostsUrls, ...picturesAlreadyUploaded]
											}

											const registredPicturesUrl = postData.picturesUrl || []
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
												postData.owner.userId,
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

	const updateUserContext = (postAfterEdit: ServiceCollection) => {
		setUserDataOnContext({
			posts: [
				...getUserPostsWithoutEdited(),
				postAfterEdit
			]
		})
	}

	const extractVacancyPictures = (vacancyData: VacancyData) => vacancyData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveVacancyPost = async () => {
		setHasError(false)
		setIsLoading(true)

		const vacancyData = { ...postData, ...editDataContext.unsaved } as VacancyCollection
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
		const postDataToSave = {
			...vacancyDataPost,
			postId,
			postType: 'vacancy',
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
						} as VacancyCollection
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
				showShareModal(true, vacancyDataPost.title)
				navigation.navigate('HomeTab')
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

	const getPostField = (fieldName: keyof VacancyCollection, allowNull?: boolean) => {
		if (allowNull && editDataContext.unsaved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const formatCategoryAndTags = () => {
		const category: VacancyCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${vacancyCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
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
										onPress={unsavedPost ? saveVacancyPost : editPost}
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
									post={{ ...postData, ...editDataContext.unsaved, postType: 'vacancy', createdAt: new Date() }}
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
					<VacancyPurposeCard
						vacancyPurpose={getPostField('vacancyPurpose') || 'findProffessional'}
						onEdit={() => navigateToEditScreen('SelectVacancyPurpose', 'vacancyPurpose')}
					/>
					<VerticalSigh />
					<EditCard
						title={'tags do post'}
						highlightedWords={['tags']}
						value={formatCategoryAndTags()}
						onEdit={() => navigateToEditScreen('SelectVacancyCategory', 'tags')}
					/>
					<VerticalSigh />
					<EditCard
						title={'título do post'}
						highlightedWords={['título']}
						value={getPostField('title')}
						onEdit={() => navigateToEditScreen('InsertVacancyTitle', 'title')}
					/>
					<VerticalSigh />
					<DescriptionCard
						text={getPostField('description')}
						onEdit={() => navigateToEditScreen('InsertVacancyDescription', 'description')}
					/>
					<VerticalSigh />
					<EditCard
						title={'fotos do post'}
						highlightedWords={['fotos']}
						profilePicturesUrl={getPicturesUrl()}
						indicatorColor={theme.yellow1}
						carousel
						onEdit={() => navigateToEditScreen('VacancyPicturePreview', 'picturesUrl')}
					/>
					<VerticalSigh />
					<PlaceModality
						title={'local de trabalho'}
						hightligtedWords={['local', 'trabalho']}
						placeModality={getPostField('workplace')}
						isVacancy
						onEdit={() => navigateToEditScreen('SelectWorkplace', 'workplace')}
					/>
					<VerticalSigh />
					<VacancyTypeCard
						vacancyType={getPostField('vacancyType')}
						onEdit={() => navigateToEditScreen('SelectVacancyType', 'vacancyType')}
					/>
					<VerticalSigh />
					<SaleOrExchangeCard
						title={'tipo de remuneração'}
						hightligtedWords={['tipo', 'remuneração']}
						saleValue={getPostField('saleValue', true)}
						exchangeValue={getPostField('exchangeValue', true)}
						isPayment
						onEdit={() => navigateToEditScreen('SelectPaymentType', 'saleValue')}
					/>
					<VerticalSigh />
					<PostRangeCard
						postRange={getPostField('range')}
						onEdit={() => navigateToEditScreen('SelectVacancyRange', 'range')}
					/>
					<VerticalSigh />
					<LocationViewCard
						title={'localização'}
						locationView={getPostField('locationView')}
						textFontSize={16}
						location={getPostField('location')}
						withoutMapView={!(getPostField('location') && getPostField('location').coordinates)}
						onEdit={() => navigateToEditScreen('SelectVacancyLocationView', 'location')}
					/>
					<VerticalSigh />
					<DateTimeCard
						title={'dias da semana'}
						highlightedWords={['dias']}
						weekDaysfrequency={getPostField('workFrequency')}
						daysOfWeek={getPostField('daysOfWeek', true)}
						onEdit={() => navigateToEditScreen('SelectVacancyFrequency', 'daysOfWeek')}
					/>
					<VerticalSigh />
					<EditCard
						title={'data de início'}
						highlightedWords={['início']}
						SecondSvgIcon={CalendarEmptyIcon}
						value={formatDate(getPostField('startDate', true)) || '---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertVacancyStartDate', 'startDate')}
					/>
					<VerticalSigh />
					<EditCard
						title={'horário de início'}
						highlightedWords={['início']}
						SecondSvgIcon={ClockWhiteIcon}
						value={formatHour(getPostField('startHour', true)) || '---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertVacancyStartHour', 'startHour')}
					/>
					<VerticalSigh />
					<EditCard
						title={'data de fim'}
						highlightedWords={['fim']}
						SecondSvgIcon={CalendarEmptyIcon}
						value={formatDate(getPostField('endDate', true)) || '---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertVacancyEndDate', 'endDate')}
					/>
					<VerticalSigh />
					<EditCard
						title={'horário de fim'}
						highlightedWords={['fim']}
						SecondSvgIcon={ClockWhiteIcon}
						value={formatHour(getPostField('endHour', true)) || '---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertVacancyEndHour', 'endHour')}
					/>
					<VerticalSigh />
					<ImportantPointsCard
						importantPoints={getPostField('importantPoints')}
						onEdit={() => navigateToEditScreen('InsertVacancyImportantPoints', 'importantPoints')}
					/>
					<VerticalSigh />
					<VerticalSigh />
				</BodyPadding>
			</Body>
		</Container>
	)
}

export { EditVacancyPost }
