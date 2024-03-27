import React, { useContext, useEffect, useState } from 'react'

import { PostEntityOptional, PostEntityCommonFields, VacancyCategories, VacancyEntityOptional, VacancyEntity } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { StateContext } from '@contexts/StateContext'
import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { EditVacancyPostReviewScreenProps } from '@routes/Stack/VacancyStack/screenProps'
import { VacancyStackParamList } from '@routes/Stack/VacancyStack/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'
import { incomeCategories } from '@utils/postsCategories/incomeCategories'

import CalendarEmptyIcon from '@assets/icons/calendarEmpty-unfilled.svg'
import ClockWhiteIcon from '@assets/icons/clock-white.svg'
import { theme } from '@common/theme'

import { DateTimeCard } from '@components/_cards/DateTimeCard'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { EditCard } from '@components/_cards/EditCard'
import { ImportantPointsCard } from '@components/_cards/ImportantPointsCard'
import { IncomeTypeCard } from '@components/_cards/IncomeTypeCard'
import { LinkCard } from '@components/_cards/LinkCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PlaceModality } from '@components/_cards/PlaceModalityCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { SaleOrExchangeCard } from '@components/_cards/SaleOrExchangeCard'
import { VacancyPurposeCard } from '@components/_cards/VacancyPurposeCard'
import { LocationChangeConfirmationModal } from '@components/_modals/LocationChangeConfirmation'
import { PostReviewPresentationModal } from '@components/_modals/PostReviewPresentationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { EditPost } from '@components/EditPost'

const { formatDate, formatHour, arrayIsEmpty } = UiUtils()
const { getTextualAddress } = UiLocationUtils()

function EditVacancyPost({ route, navigation }: EditVacancyPostReviewScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext, getLastUserPost } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { setCurrentPostDataOnContext } = useContext(SubscriptionContext)

	const [locationChangeModalIsVisible, setLocationChangeModalIsVisible] = useState(false)
	const [postReviewPresentationModalIsVisible, setPostReviewPresentationModalIsVisible] = useState(false)

	const { postData, unsavedPost, offlinePost, showPresentationModal } = route.params
	const owner: PostEntityCommonFields['owner'] = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	useEffect(() => {
		showPresentationModal && togglePostReviewPresentationModalVisibility()
		clearUnsavedEditContext()
	}, [])

	const getPostField = (fieldName: keyof VacancyEntityOptional, allowNull?: boolean) => {
		const currentPostData = { ...postData, postType: 'income' }

		if (allowNull && editDataContext.unsaved[fieldName] === '' && currentPostData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || currentPostData[fieldName]
	}

	const getPicturesUrl = () => {
		const picturesUrl = getPostField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const formatCategoryAndTags = () => {
		const category: VacancyCategories = getPostField('category')
		const tags = getPostField('tags')

		try {
			const categoryAndTagsText = `	●  ${incomeCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
			return categoryAndTagsText
		} catch (err) {
			console.log(err)
			return ''
		}
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
		navigation.navigate('Profile' as any)
	}

	const navigateToPostView = (vacancyPostData: PostEntityOptional) => {
		navigation.navigate('ViewVacancyPost' as any, { postData: vacancyPostData })
	}

	const navigateToEditScreen = (screenName: keyof VacancyStackParamList, initialValue: keyof VacancyEntity, customStack?: string) => {
		let value = getPostField(initialValue, true)

		if (initialValue === 'picturesUrl') {
			value = getPicturesUrl()
		}

		if (initialValue === 'location') {
			value = {
				coordinates: value.coordinates,
				postRange: getPostField('range')
			}
		}

		navigation.navigate(customStack || 'VacancyStack' as any, { // TODO Type
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value
			}
		})
	}

	const navigateToEditLocationScreen = () => navigateToEditScreen('SelectVacancyLocationView', 'location')

	const getLastPostAddress = () => {
		const lastUserPost = getLastUserPost()
		return getTextualAddress(lastUserPost.location)
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
		setCurrentPostDataOnContext({
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
		})
		navigation.navigate('SelectSubscriptionPlan', { postRange: getPostField('range'), postReview: true })
	}

	const userContext = {
		userDataContext,
		setUserDataOnContext
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
				<IncomeTypeCard
					title={'tipo de renda'}
					hightligtedWords={['tipo', 'renda']}
					macroCategory={getPostField('macroCategory')}
					onEdit={() => navigateToEditScreen('SelectIncomeType', 'macroCategory', 'UserStack')}
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
				<LinkCard
					links={getPostField('links')}
					onEdit={() => navigateToEditScreen('InsertIncomeLinks', 'links')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'tags do post'}
					highlightedWords={['tags']}
					value={formatCategoryAndTags()}
					onEdit={() => navigateToEditScreen('SelectVacancyCategory', 'tags')}
				/>
				<VerticalSpacing />
				<VacancyPurposeCard
					vacancyPurpose={getPostField('vacancyPurpose' as any) || getPostField('lookingFor')}
					onEdit={() => { // TODO Refatorar: Temporário tudante a transição de estrutura de dados
						getPostField('vacancyPurpose' as any)
							? navigateToEditScreen('SelectVacancyPurpose', 'vacancyPurpose' as any)
							: navigateToEditScreen('SelectVacancyPurpose', 'lookingFor')
					}}
				/>
				<VerticalSpacing />
				<PlaceModality
					title={'local de trabalho'}
					hightligtedWords={['local', 'trabalho']}
					placeModality={getPostField('workplace')}
					isVacancy
					onEdit={() => navigateToEditScreen('SelectWorkplace', 'workplace')}
				/>

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
					value={formatDate(getPostField('startDate', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertVacancyStartDate', 'startDate')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'horário de início'}
					highlightedWords={['início']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('startHour', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertVacancyStartHour', 'startHour')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'data de fim'}
					highlightedWords={['fim']}
					SecondSvgIcon={CalendarEmptyIcon}
					value={formatDate(getPostField('endDate', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertVacancyEndDate', 'endDate')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'horário de fim'}
					highlightedWords={['fim']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('endHour', true))}
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
