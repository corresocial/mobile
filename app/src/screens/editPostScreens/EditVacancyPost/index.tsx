import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { Body, Container, Header, LastSigh, SaveButtonContainer, Sigh } from './styles'
import CheckIcon from '../../../assets/icons/check-white.svg'

import { vacancyCategories } from '../../../utils/postsCategories/vacancyCategories'
import { formatDate, formatHour } from '../../../common/auxiliaryFunctions'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'

import { VacancyStackParamList } from '../../../routes/Stack/VacancyStack/types'
import { EditVacancyPostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { DaysOfWeek, Id, ServiceCollection, VacancyCategories, VacancyCollection, VacancyCollectionRemote } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { theme } from '../../../common/theme'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Loader } from '../../../components/Loader'

function EditVacancyPost({ route, navigation }: EditVacancyPostScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)

	const [isLoading, setIsLoading] = useState(false)

	const { postData } = route.params

	useEffect(() => {
		clearUnsavedEditContext()
	}, [])

	const getRelativeTitle = () => {
		switch (postData.postType) {
			case 'service': return 'do serviço'
			case 'sale': return 'da venda'
			case 'vacancy': return 'da vaga'
			case 'socialImpact': return 'da iniciativa'
			case 'culture': return 'do evento'
			default: return 'do post'
		}
	}

	const formatDaysOfWeek = () => {
		const daysOfWeek = getPostField('daysOfWeek')

		const allDaysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]
		const ordenedDaysOfWeek = allDaysOfWeek.filter((weekDay: DaysOfWeek) => daysOfWeek.includes(weekDay))
		return ordenedDaysOfWeek.toString().split(',').join(', ')
	}

	const navigateToEditScreen = (screenName: keyof VacancyStackParamList, initialValue: keyof VacancyCollectionRemote, especificField?: string) => {
		const value = getPostField(initialValue)
		navigation.navigate('VacancyStack', {
			screen: screenName,
			params: {
				editMode: true,
				initialValue: !especificField ? value : value[especificField]
			}
		})
	}

	const getUserPostsWithoutEdited = () => {
		const userPosts = userDataContext.posts || []
		return userPosts.filter((post: VacancyCollection) => post.postId !== postData.postId)
	}

	const editPost = async () => {
		try {
			setIsLoading(true)

			const postDataToSave = { ...postData, ...editDataContext.unsaved }
			delete postDataToSave.owner

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

	const changeStateOfEditedFields = () => {
		setEditDataOnContext({ saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} })
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

	const getPostField = (fieldName: keyof VacancyCollection) => {
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const formatCategoryAndTags = () => {
		const category: VacancyCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${vacancyCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
	}

	const getRelativeVacancyType = () => {
		switch (getPostField('vacancyType')) {
			case 'beak': return 'bico'
			case 'temporary': return 'temporária'
			case 'professional': return 'profissional'
			default: return '---'
		}
	}

	const getRelativeWorkPlace = () => {
		switch (getPostField('workplace')) {
			case 'homeoffice': return 'home-office'
			case 'presential': return 'presencial'
			case 'hybrid': return 'híbrida'
			default: return '---'
		}
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
					onEdit={() => navigateToEditScreen('SelectVacancyCategory', 'tags')}
				/>
				<Sigh />
				<EditCard
					title={'título do post'}
					highlightedWords={['título']}
					value={getPostField('title')}
					onEdit={() => navigateToEditScreen('InsertVacancyTitle', 'title')}
				/>
				<Sigh />
				<EditCard
					title={`descrição ${getRelativeTitle()}`}
					highlightedWords={['descrição']}
					value={getPostField('description') || '---'}
					onEdit={() => navigateToEditScreen('InsertVacancyDescription', 'description')}
				/>
				<Sigh />
				<EditCard
					title={'descrição da empresa'}
					highlightedWords={['descrição']}
					value={getPostField('companyDescription') || '---'}
					onEdit={() => navigateToEditScreen('InsertCompanyDescription', 'companyDescription')}
				/>
				<Sigh />
				<EditCard
					title={'tipo de vaga'}
					highlightedWords={['tipo']}
					value={getRelativeVacancyType() || '---'}
					onEdit={() => navigateToEditScreen('SelectVacancyType', 'vacancyType')}
				/>
				<Sigh />
				<EditCard
					title={'local de trabalho'}
					highlightedWords={['local']}
					value={getRelativeWorkPlace() || '---'}
					onEdit={() => navigateToEditScreen('SelectWorkplace', 'workplace')}
				/>
				<Sigh />
				{
					getPostField('workplace') !== 'homeoffice' && (
						<>
							<LocationViewCard
								title={'localização'}
								locationView={'public'}
								textFontSize={16}
								withoutMapView={!getPostField('location').coordinates}
								editable
								isAuthor
								location={getPostField('location')}
								onEdit={() => navigateToEditScreen('InsertWorkplaceLocation', 'location', 'coordinates')}
							/>
							<Sigh />
						</>
					)
				}
				{
					getPostField('vacancyType') === 'professional' && (
						<>
							<EditCard
								title={'dias da semana'}
								highlightedWords={['semana']}
								value={formatDaysOfWeek() || '---'}
								onEdit={() => navigateToEditScreen('SelectWorkWeekdays', 'daysOfWeek')}
							/>
							<Sigh />
						</>
					)
				}
				{
					getPostField('vacancyType') !== 'professional' && (
						<>
							<EditCard
								title={'data de início'}
								highlightedWords={['início']}
								value={formatDate(getPostField('startDate')) || '---'}
								onEdit={() => navigateToEditScreen('InsertVacancyStartDate', 'startDate')}
							/>
							<Sigh />
						</>
					)
				}
				<EditCard
					title={'horário de início'}
					highlightedWords={['início']}
					value={formatHour(getPostField('startHour')) || '---'}
					onEdit={() => navigateToEditScreen('InsertVacancyStartHour', 'startHour')}
				/>
				<Sigh />
				{
					getPostField('vacancyType') !== 'professional' && (
						<>
							<EditCard
								title={'data de fim'}
								highlightedWords={['fim']}
								value={formatDate(getPostField('endDate')) || '---'}
								onEdit={() => navigateToEditScreen('InsertVacancyEndDate', 'endDate')}
							/>
							<Sigh />
						</>
					)
				}
				<EditCard
					title={'horário de fim'}
					highlightedWords={['fim']}
					value={formatHour(getPostField('endHour')) || '---'}
					onEdit={() => navigateToEditScreen('InsertVacancyEndHour', 'endHour')}
				/>
				<LastSigh />
			</Body>
		</Container>
	)
}

export { EditVacancyPost }
