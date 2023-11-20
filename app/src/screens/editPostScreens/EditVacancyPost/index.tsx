import React, { useContext, useEffect, useState } from 'react'

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
import { getTextualAddress } from '../../../utils/maps/addressFormatter'
import { arrayIsEmpty, formatDate, formatHour } from '../../../common/auxiliaryFunctions'

import { EditCard } from '../../../components/_cards/EditCard'
import { theme } from '../../../common/theme'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { VacancyPurposeCard } from '../../../components/_cards/VacancyPurposeCard'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { PlaceModality } from '../../../components/_cards/PlaceModalityCard'
import { MacroCategoryCard } from '../../../components/_cards/MacroCategoryCard'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { PostRangeCard } from '../../../components/_cards/PostRangeCard'
import { ImportantPointsCard } from '../../../components/_cards/ImportantPointsCard'
import { EditPost } from '../../../components/EditPost'
import { LocationChangeConfirmationModal } from '../../../components/_modals/LocationChangeConfirmation'
import { PostReviewPresentationModal } from '../../../components/_modals/PostReviewPresentationModal'

function EditVacancyPost({ route, navigation }: EditVacancyPostReviewScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore, getLastUserPost } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { setSubscriptionDataOnContext } = useContext(SubscriptionContext)

	const [locationChangeModalIsVisible, setLocationChangeModalIsVisible] = useState(false)
	const [postReviewPresentationModalIsVisible, setPostReviewPresentationModalIsVisible] = useState(false)

	const { postData, unsavedPost, offlinePost, showPresentationModal } = route.params
	const owner: any = { // TODO Type
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	useEffect(() => {
		showPresentationModal && togglePostReviewPresentationModalVisibility()
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

	const showShareModal = (visibility: boolean, postTitle?: string, postId?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle,
			lastPostId: postId
		})
	}

	const navigateBackwards = () => {
		navigation.goBack()
	}

	const navigateToProfile = () => {
		navigation.navigate('Profile' as any) // TODO Type
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

	const navigateToEditLocationScreen = () => navigateToEditScreen('SelectVacancyLocationView', 'location')

	const getLastPostAddress = () => {
		const lastUserPost: PostCollection = getLastUserPost()
		return getTextualAddress(lastUserPost?.location)
	}

	const toggleRangeChangeModalVisibility = () => {
		setLocationChangeModalIsVisible(!locationChangeModalIsVisible)
	}

	const togglePostReviewPresentationModalVisibility = () => {
		setPostReviewPresentationModalIsVisible(!postReviewPresentationModalIsVisible)
	}

	const checkChangeLocationAlertIsRequired = () => {
		if (userDataContext.posts && userDataContext.posts.length < 1) navigateToEditScreen('SelectVacancyLocationView', 'location')

		if (userDataContext.subscription?.subscriptionRange === 'near') {
			toggleRangeChangeModalVisibility()
			return
		}

		navigateToEditScreen('SelectVacancyLocationView', 'location')
	}

	const navigateToSubscriptionContext = () => {
		setSubscriptionDataOnContext({
			currentPost: {
				...postData,
				...editDataContext.unsaved,
				postType: 'income',
				macroCategory: 'vacancy',
				createdAt: new Date(),
				owner: {
					userId: userDataContext.userId,
					name: userDataContext.name,
					profilePictureUrl: userDataContext.profilePictureUrl
				}
			}
		})
		navigation.navigate('SelectSubscriptionPlan', { postRange: getPostField('range'), postReview: true })
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
		<>
			<LocationChangeConfirmationModal
				visibility={locationChangeModalIsVisible}
				currentPostAddress={getLastPostAddress()}
				newRangeSelected={'near'}
				onPressButton={navigateToEditLocationScreen}
				closeModal={toggleRangeChangeModalVisibility}
			/>
			<PostReviewPresentationModal
				visibility={postReviewPresentationModalIsVisible}
				onPressButton={togglePostReviewPresentationModalVisibility}
			/>

			<EditPost
				initialPostData={{ ...postData, postType: 'income', macroCategory: 'vacancy' }}
				owner={owner}
				backgroundColor={theme.green2}
				unsavedPost={unsavedPost}
				offlinePost={offlinePost}
				navigateBackwards={navigateBackwards}
				navigateToProfile={navigateToProfile}
				navigateToPostView={navigateToPostView}
				navigateToSubscriptionContext={navigateToSubscriptionContext}
				showShareModal={showShareModal}
				getPostField={getPostField}
				userContext={userContext}
				editContext={editContext}
			>
				<VacancyPurposeCard
					vacancyPurpose={getPostField('vacancyPurpose') || getPostField('lookingFor')}
					onEdit={() => {
						getPostField('vacancyPurpose')
							? navigateToEditScreen('SelectVacancyPurpose', 'vacancyPurpose')
							: navigateToEditScreen('SelectVacancyPurpose', 'lookingFor')
					}}
				/>
				<VerticalSpacing />
				<EditCard
					title={'tags do post'}
					highlightedWords={['tags']}
					value={formatCategoryAndTags()}
					onEdit={() => navigateToEditScreen('SelectVacancyCategory', 'tags')}
				/>
				<VerticalSpacing />
				<DescriptionCard
					text={getPostField('description')}
					onEdit={() => navigateToEditScreen('InsertVacancyDescription', 'description')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={getPicturesUrl()}
					indicatorColor={theme.green1}
					carousel
					onEdit={() => navigateToEditScreen('VacancyPicturePreview', 'picturesUrl')}
				/>
				<VerticalSpacing />
				<PlaceModality
					title={'local de trabalho'}
					hightligtedWords={['local', 'trabalho']}
					placeModality={getPostField('workplace')}
					isVacancy
					onEdit={() => navigateToEditScreen('SelectWorkplace', 'workplace')}
				/>
				{
					getPostField('macroCategory') && (
						<>
							<VerticalSpacing />
							<MacroCategoryCard
								title={'macrocategoria'}
								hightligtedWords={['macrocategoria']}
								postType={getPostField('postType')}
								macroCategory={getPostField('macroCategory')}
								onEdit={() => navigateToEditScreen('SelectVacancyType', 'vacancyType')}
							/>

						</>

					)
				}
				<VerticalSpacing />
				<SaleOrExchangeCard
					title={'tipo de remuneração'}
					hightligtedWords={['tipo', 'remuneração']}
					saleValue={getPostField('saleValue', true)}
					exchangeValue={getPostField('exchangeValue', true)}
					isPayment
					onEdit={() => navigateToEditScreen('SelectPaymentType', 'saleValue')}
				/>
				<VerticalSpacing />
				<PostRangeCard
					postRange={getPostField('range')}
					onEdit={() => navigateToEditScreen('SelectVacancyRange', 'range')}
				/>
				<VerticalSpacing />
				<LocationViewCard
					title={'localização'}
					locationView={getPostField('locationView')}
					textFontSize={16}
					location={getPostField('location')}
					withoutMapView={!(getPostField('location') && getPostField('location').coordinates)}
					onEdit={checkChangeLocationAlertIsRequired}
				/>
				<VerticalSpacing />
				<DateTimeCard
					title={'dias da semana'}
					highlightedWords={['dias']}
					weekDaysfrequency={getPostField('workFrequency')}
					daysOfWeek={getPostField('daysOfWeek', true)}
					onEdit={() => navigateToEditScreen('SelectVacancyFrequency', 'daysOfWeek')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'data de início'}
					highlightedWords={['início']}
					SecondSvgIcon={CalendarEmptyIcon}
					value={formatDate(getPostField('startDate', true)) || '---'}
					valueBold
					onEdit={() => navigateToEditScreen('InsertVacancyStartDate', 'startDate')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'horário de início'}
					highlightedWords={['início']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('startHour', true)) || '---'}
					valueBold
					onEdit={() => navigateToEditScreen('InsertVacancyStartHour', 'startHour')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'data de fim'}
					highlightedWords={['fim']}
					SecondSvgIcon={CalendarEmptyIcon}
					value={formatDate(getPostField('endDate', true)) || '---'}
					valueBold
					onEdit={() => navigateToEditScreen('InsertVacancyEndDate', 'endDate')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'horário de fim'}
					highlightedWords={['fim']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('endHour', true)) || '---'}
					valueBold
					onEdit={() => navigateToEditScreen('InsertVacancyEndHour', 'endHour')}
				/>
				<VerticalSpacing />
				<ImportantPointsCard
					importantPoints={getPostField('importantPoints')}
					onEdit={() => navigateToEditScreen('InsertVacancyImportantPoints', 'importantPoints')}
				/>
			</EditPost>
		</>
	)
}

export { EditVacancyPost }
