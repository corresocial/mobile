import React, { useContext, useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { StatusBar } from 'react-native'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { Body, Container, Header, LastSigh, SaveButtonContainer, Sigh } from './styles'
import CheckIcon from '../../../assets/icons/check.svg'

import { cultureCategories } from '../../cultureScreens/cultureCategories'
import { arrayIsEmpty, formatDate, formatHour } from '../../../common/auxiliaryFunctions'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { updatePostPrivateData } from '../../../services/firebase/post/updatePostPrivateData'

import { EditCulturePostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { CultureCollection, CultureCollectionRemote, EventRepeatType, ExhibitionPlaceType } from '../../../services/firebase/types'
import { CultureStackParamList } from '../../../routes/Stack/CultureStack/types'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { theme } from '../../../common/theme'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Loader } from '../../../components/Loader'

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

	const getRelativeTitle = () => {
		switch (postData.postType) {
			case 'service': return 'do serviço'
			case 'sale': return 'da venda'
			case 'vacancy': return 'da vaga'
			case 'socialImpact': return 'da iniciativa'
			case 'culture': {
				const { cultureType } = postData as any
				return cultureType === 'artistProfile' ? 'do artista' : 'do evento'
			}
			default: return 'do post'
		}
	}

	const renderCultureRepeat = () => {
		const socialImpactRepeat = getPostField('eventRepeat') as EventRepeatType
		switch (socialImpactRepeat) {
			case 'unrepeatable': return 'não se repete'
			case 'everyDay': return 'todos os dias'
			case 'weekly': return 'uma vez por semana'
			case 'biweekly': return 'a cada 15 dias'
			case 'monthly': return '1 vez no mês'
			default: return '---'
		}
	}

	const renderExhibitionRange = () => {
		const socialImpactRepeat = getPostField('exhibitionPlace') as ExhibitionPlaceType
		switch (socialImpactRepeat) {
			case 'near': return 'no bairro'
			case 'city': return 'na cidade'
			case 'country': return 'no país'
			default: return '---'
		}
	}

	const navigateToEditScreen = (screenName: keyof CultureStackParamList, initialValue: keyof CultureCollectionRemote) => {
		const value = getPostField(initialValue)
		navigation.navigate('CultureStack', {
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value,
				cultureType: postData.cultureType
			}
		})
	}

	const getUserPostsWithoutEdited = () => {
		const userPosts = userDataContext.posts || []
		return userPosts.filter((post) => post.postId !== postData.postId)
	}

	const editPost = async () => {
		try {
			setIsLoading(true)
			if (editDataContext.unsaved.address) {
				await savePrivateAddress()
			}

			if ((editDataContext.unsaved.picturesUrl && editDataContext.unsaved.picturesUrl.length > 0) && !allPicturesAlreadyUploaded()) {
				console.log('with pictures')
				await performPicturesUpload()
				return
			}
			console.log('without pictures')

			const postDataToSave = { ...postData, ...editDataContext.unsaved }
			delete postDataToSave.owner
			delete postDataToSave.address

			await updatePost('cultures', postData.postId, postDataToSave)
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

	const changeStateOfEditedFields = () => {
		setEditDataOnContext({ saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} })
	}

	const allPicturesAlreadyUploaded = () => {
		return editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')).length === editDataContext.unsaved.picturesUrl.length
	}

	const performPicturesUpload = async () => {
		const picturesNotUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')) || []

		const picturePostsUrls: string[] = []
		await picturesNotUploaded.map(async (picturePath: string, index: number) => {
			return uploadImage(picturePath, 'cultures', postData.postId, index).then(
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

											await updatePost('cultures', postData.postId, postDataToSave)
											await updateDocField(
												'users',
												postData.owner.userId,
												'posts',
												[postDataToSave, ...getUserPostsWithoutEdited()]
											)

											changeStateOfEditedFields()
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

	const savePrivateAddress = async () => {
		await updatePostPrivateData(
			{
				...editDataContext.unsaved.address,
				locationView: editDataContext.unsaved.locationView,
				postType: 'culture',
			},
			postData.postId,
			'cultures',
			`address${postData.postId}`
		)
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

	const getPostField = (fieldName: keyof CultureCollection) => {
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const formatCategoryAndTags = () => {
		const category: string = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${cultureCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`// TODO Type
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
				<Sigh />
				<EditCard
					title={'título do post'}
					highlightedWords={['título']}
					value={getPostField('title')}
					onEdit={() => navigateToEditScreen('InsertCultureTitle', 'title')}
				/>
				<Sigh />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={getPicturesUrl()}
					carousel
					onEdit={() => navigateToEditScreen('CulturePicturePreview', 'picturesUrl')}
				/>
				<Sigh />
				<EditCard
					title={`descrição ${getRelativeTitle()}`}
					highlightedWords={['descrição']}
					value={getPostField('description') || '---'}
					onEdit={() => navigateToEditScreen('InsertCultureDescription', 'description')}
				/>
				<Sigh />
				{
					postData.cultureType === 'eventPost' && (
						<>
							<EditCard
								title={'valor de entrada'}
								highlightedWords={['entrada']}
								value={getPostField('entryValue') || '---'}
								onEdit={() => navigateToEditScreen('InsertEntryValue', 'entryValue')}
							/>
							<Sigh />
						</>
					)
				}
				{
					postData.cultureType === 'eventPost' && (
						<EditCard
							title={'alcance de exibição'}
							highlightedWords={['alcance']}
							value={renderExhibitionRange() || '---'}
							onEdit={() => navigateToEditScreen('SelectExhibitionPlace', 'exhibitionPlace')}
						/>
					)
				}

				<Sigh />
				<LocationViewCard
					title={'localização'}
					locationView={getPostField('locationView')}
					postType={getPostField('postType')}
					postId={getPostField('postId')}
					textFontSize={16}
					editable
					isAuthor
					defaultAddress={editDataContext.unsaved.address}
					onEdit={() => navigateToEditScreen('SelectCultureLocationView', 'postId')}
				/>
				<Sigh />
				{
					postData.cultureType === 'eventPost' && (
						<>
							<EditCard
								title={'repetição'}
								highlightedWords={['repetição']}
								value={renderCultureRepeat() || '---'}
								onEdit={() => navigateToEditScreen('SelectEventRepeat', 'eventRepeat')}
							/>
							<Sigh />
							<EditCard
								title={'data de início'}
								highlightedWords={['início']}
								value={formatDate(getPostField('eventStartDate')) || '---'}
								onEdit={() => navigateToEditScreen('InsertEventStartDate', 'eventStartDate')}
							/>
							<Sigh />
							<EditCard
								title={'horário de início'}
								highlightedWords={['início']}
								value={formatHour(getPostField('eventStartHour')) || '---'}
								onEdit={() => navigateToEditScreen('InsertEventStartHour', 'eventStartHour')}
							/>
							<Sigh />
							<EditCard
								title={'data de fim'}
								highlightedWords={['fim']}
								value={formatDate(getPostField('eventEndDate')) || '---'}
								onEdit={() => navigateToEditScreen('InsertEventEndDate', 'eventEndDate')}
							/>
							<Sigh />
							<EditCard
								title={'horário de fim'}
								highlightedWords={['fim']}
								value={formatHour(getPostField('eventEndHour')) || '---'}
								onEdit={() => navigateToEditScreen('InsertEventEndHour', 'eventEndHour')}
							/>
						</>
					)
				}
				<LastSigh />
			</Body>
		</Container>
	)
}

export { EditCulturePost }
