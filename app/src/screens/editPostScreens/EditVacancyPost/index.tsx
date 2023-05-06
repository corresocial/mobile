import React, { useContext, useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { Body, Container, Header, SaveButtonContainer } from './styles'
import CheckIcon from '../../../assets/icons/check-white.svg'
import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'
import CalendarEmptyIcon from '../../../assets/icons/calendarEmpty-unfilled.svg'

import { vacancyCategories } from '../../../utils/postsCategories/vacancyCategories'
import { arrayIsEmpty, formatDate, formatHour } from '../../../common/auxiliaryFunctions'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { deletePostPictures } from '../../../services/firebase/post/deletePostPictures'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'

import { VacancyStackParamList } from '../../../routes/Stack/VacancyStack/types'
import { EditVacancyPostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { Id, ServiceCollection, VacancyCategories, VacancyCollection, VacancyCollectionRemote } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'

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

function EditVacancyPost({ route, navigation }: EditVacancyPostScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)

	const [isLoading, setIsLoading] = useState(false)

	const { postData } = route.params

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

		if (initialValue === 'location') {
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

	const cancelAllChangesAndGoBack = () => {
		navigation.goBack()
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
					onBackPress={cancelAllChangesAndGoBack}
					text={'editar seu post'}
					highlightedWords={['editar']}
				/>
				{
					Object.keys(editDataContext.unsaved).length > 0 && (
						isLoading
							? <Loader />
							: (
								<SaveButtonContainer>
									<PrimaryButton
										color={theme.green3}
										labelColor={theme.white3}
										label={'salvar alterações'}
										highlightedWords={['salvar']}
										fontSize={16}
										SecondSvgIcon={CheckIcon}
										svgIconScale={['35%', '18%']}
										minHeight={relativeScreenHeight(6)}
										relativeHeight={relativeScreenHeight(8)}
										onPress={editPost}
									/>
								</SaveButtonContainer>
							)

					)
				}
			</Header>
			<Body>
				<VacancyPurposeCard
					vacancyPurpose={getPostField('vacancyPurpose') || 'findProffessional'}
					onEdit={() => Alert.alert('In development...')}
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
			</Body>
		</Container>
	)
}

export { EditVacancyPost }
