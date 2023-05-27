import React, { useContext, useEffect } from 'react'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'
import { SubscriptionContext } from '../../../contexts/SubscriptionContext'

import { VacancyStackParamList } from '../../../routes/Stack/VacancyStack/types'
import { EditVacancyPostReviewScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { PostCollection, VacancyCategories, VacancyCollection, VacancyCollectionRemote } from '../../../services/firebase/types'

import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'
import CalendarEmptyIcon from '../../../assets/icons/calendarEmpty-unfilled.svg'

import { vacancyCategories } from '../../../utils/postsCategories/vacancyCategories'
import { arrayIsEmpty, formatDate, formatHour } from '../../../common/auxiliaryFunctions'

import { EditCard } from '../../../components/_cards/EditCard'
import { theme } from '../../../common/theme'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { VacancyPurposeCard } from '../../../components/_cards/VacancyPurposeCard'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { PlaceModality } from '../../../components/_cards/PlaceModalityCard'
import { VacancyTypeCard } from '../../../components/_cards/VacancyTypeCard'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { PostRangeCard } from '../../../components/_cards/PostRangeCard'
import { ImportantPointsCard } from '../../../components/_cards/ImportantPointsCard'
import { EditPost } from '../../../components/EditPost'

function EditVacancyPost({ route, navigation }: EditVacancyPostReviewScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { setSubscriptionDataOnContext } = useContext(SubscriptionContext)

	const { postData, unsavedPost } = route.params
	const owner = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	useEffect(() => {
		clearUnsavedEditContext()
	}, [])

	const getPostField = (fieldName: keyof VacancyCollection, allowNull?: boolean) => {
		if (allowNull && editDataContext.unsaved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const getPicturesUrl = () => {
		const picturesUrl = getPostField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const formatCategoryAndTags = () => {
		const category: VacancyCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${vacancyCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
	}

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const navigateBackwards = () => {
		navigation.goBack()
	}

	const navigateToPostView = (vacancyPostData: PostCollection) => {
		navigation.navigate('ViewVacancyPost' as any, { postData: vacancyPostData })
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

	const navigateToSubscriptionContext = () => {
		setSubscriptionDataOnContext({
			currentPost: {
				...postData,
				...editDataContext.unsaved,
				postType: 'vacancy',
				createdAt: new Date(),
				owner: {
					userId: userDataContext.userId,
					name: userDataContext.name,
					profilePictureUrl: userDataContext.profilePictureUrl
				}
			}
		})
		navigation.navigate('SelectSubscriptionPlan', { postRange: getPostField('range') })
	}

	const userContext = {
		userDataContext,
		setUserDataOnContext,
		setDataOnSecureStore
	}

	const editContext = {
		editDataContext,
		setEditDataOnContext,
		clearUnsavedEditContext
	}

	return (
		<EditPost
			initialPostData={{ ...postData, postType: 'vacancy' }}
			owner={owner}
			backgroundColor={theme.yellow2}
			unsavedPost={unsavedPost}
			navigateBackwards={navigateBackwards}
			navigateToPostView={navigateToPostView}
			navigateToSubscriptionContext={navigateToSubscriptionContext}
			showShareModal={showShareModal}
			getPostField={getPostField}
			userContext={userContext}
			editContext={editContext}
		>
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
		</EditPost>
	)
}

export { EditVacancyPost }
