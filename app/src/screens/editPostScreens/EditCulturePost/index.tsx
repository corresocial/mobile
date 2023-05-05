import React, { useContext, useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { StatusBar } from 'react-native'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { Body, Container, Header, SaveButtonContainer } from './styles'
import CheckIcon from '../../../assets/icons/check-white.svg'
import RecycleWhiteIcon from '../../../assets/icons/recycle-white.svg'
import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'
import CalendarEmptyIcon from '../../../assets/icons/calendarEmpty-unfilled.svg'

import { cultureCategories } from '../../../utils/postsCategories/cultureCategories'
import { arrayIsEmpty, formatDate, formatHour, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'

import { EditCulturePostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { CultureCategories, CultureCollection, CultureCollectionRemote, EventRepeatType } from '../../../services/firebase/types'
import { CultureStackParamList } from '../../../routes/Stack/CultureStack/types'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { theme } from '../../../common/theme'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Loader } from '../../../components/Loader'
import { deletePostPictures } from '../../../services/firebase/post/deletePostPictures'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { PostRangeCard } from '../../../components/_cards/PostRangeCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { PlaceModality } from '../../../components/_cards/PlaceModalityCard'

function EditCulturePost({ route, navigation }: EditCulturePostScreenProps) {
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

	const renderCultureRepeat = () => {
		const repeat = getPostField('repeat') as EventRepeatType
		switch (repeat) {
			case 'unrepeatable': return showMessageWithHighlight('não se repete', ['não'])
			case 'everyDay': return showMessageWithHighlight('todos os dias', ['todos'])
			case 'weekly': return showMessageWithHighlight('uma vez por semana', ['1', 'semana'])
			case 'biweekly': return showMessageWithHighlight('a cada 15 dias', ['15'])
			case 'monthly': return showMessageWithHighlight('1 vez no mês', ['1', 'mês'])
			default: return '---'
		}
	}

	const navigateToEditScreen = (screenName: keyof CultureStackParamList, initialValue: keyof CultureCollectionRemote, especificField?: string) => {
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

		navigation.navigate('CultureStack', {
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
		if (!editDataContext.unsaved) return

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
				postData.owner.userId,
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

	const updateUserContext = (postAfterEdit: CultureCollection) => {
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

	const getPostField = (fieldName: keyof CultureCollection, allowNull?: boolean) => {
		if (allowNull && editDataContext.unsaved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const formatCategoryAndTags = () => {
		const category: CultureCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${cultureCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
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
				<EditCard
					title={'tags do post'}
					highlightedWords={['tags']}
					value={formatCategoryAndTags()}
					onEdit={() => navigateToEditScreen('SelectCultureCategory', 'tags')}
				/>
				<VerticalSigh />
				<PlaceModality
					title={'como participar'}
					hightligtedWords={['participar']}
					placeModality={getPostField('eventPlaceModality')}
					onEdit={() => navigateToEditScreen('SelectEventPlaceModality', 'eventPlaceModality')}
				/>
				<VerticalSigh />
				<EditCard
					title={'título do post'}
					highlightedWords={['título']}
					value={getPostField('title')}
					onEdit={() => navigateToEditScreen('InsertCultureTitle', 'title')}
				/>
				<VerticalSigh />
				<DescriptionCard
					text={getPostField('description')}
					onEdit={() => navigateToEditScreen('InsertCultureDescription', 'description')}
				/>
				<VerticalSigh />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={getPicturesUrl()}
					carousel
					onEdit={() => navigateToEditScreen('CulturePicturePreview', 'picturesUrl')}
				/>
				<VerticalSigh />
				<PostRangeCard
					postRange={getPostField('range')}
					onEdit={() => navigateToEditScreen('SelectCultureRange', 'range')}
				/>
				<VerticalSigh />
				<LocationViewCard
					title={'localização'}
					locationView={getPostField('locationView')}
					textFontSize={16}
					location={getPostField('location')}
					onEdit={() => navigateToEditScreen('SelectCultureLocationView', 'location')}
				/>
				<VerticalSigh />
				<SaleOrExchangeCard
					title={'custo de entrada'}
					hightligtedWords={['custo', 'entrada']}
					saleValue={getPostField('entryValue', true) || '---'}
					onEdit={() => navigateToEditScreen('InsertEntryValue', 'entryValue')}
					isCulturePost
				/>
				<VerticalSigh />
				<DateTimeCard
					title={'dias da semana'}
					highlightedWords={['dias']}
					weekDaysfrequency={getPostField('exhibitionFrequency')}
					daysOfWeek={getPostField('daysOfWeek', true)}
					onEdit={() => navigateToEditScreen('SelectCultureFrequency', 'daysOfWeek')}
				/>
				<VerticalSigh />
				<EditCard
					title={'repetição'}
					highlightedWords={['repetição']}
					SecondSvgIcon={RecycleWhiteIcon}
					value={renderCultureRepeat() || '---'}
					onEdit={() => navigateToEditScreen('SelectEventRepeat', 'repeat')}
				/>
				<VerticalSigh />
				<EditCard
					title={'que dia começa'}
					highlightedWords={['começa']}
					SecondSvgIcon={CalendarEmptyIcon}
					value={formatDate(getPostField('startDate', true)) || '---'}
					onEdit={() => navigateToEditScreen('InsertCultureStartDate', 'startDate')}
				/>
				<VerticalSigh />
				<EditCard
					title={'que horas começa'}
					highlightedWords={['começa']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('startHour', true)) || '---'}
					onEdit={() => navigateToEditScreen('InsertCultureStartHour', 'startHour')}
				/>
				<VerticalSigh />
				<EditCard
					title={'que dia termina'}
					highlightedWords={['termina']}
					SecondSvgIcon={CalendarEmptyIcon}
					value={formatDate(getPostField('endDate', true)) || '---'}
					onEdit={() => navigateToEditScreen('InsertCultureEndDate', 'endDate')}
				/>
				<VerticalSigh />
				<EditCard
					title={'que horas termina'}
					highlightedWords={['termina']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('endHour', true)) || '---'}
					onEdit={() => navigateToEditScreen('InsertCultureEndHour', 'endHour')}
				/>
				<VerticalSigh />
				<VerticalSigh />
			</Body>
		</Container>
	)
}

export { EditCulturePost }
