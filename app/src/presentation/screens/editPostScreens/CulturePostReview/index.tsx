import React, { useContext, useEffect, useState } from 'react'

import { CultureCategories, CultureEntityOptional, CultureEntity, PostEntityOptional, PostEntityCommonFields } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { StateContext } from '@contexts/StateContext'
import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { CulturePostReviewScreenProps } from '@routes/Stack/CultureStack/screenProps'
import { CultureStackParamList } from '@routes/Stack/CultureStack/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'
import { cultureCategories } from '@utils/postsCategories/cultureCategories'

import CalendarEmptyIcon from '@assets/icons/calendarEmpty-unfilled.svg'
import ClockWhiteIcon from '@assets/icons/clock-white.svg'
import { theme } from '@common/theme'

import { CultureTypeCard } from '@components/_cards/CultureTypeCard'
import { DateTimeCard } from '@components/_cards/DateTimeCard'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { EditCard } from '@components/_cards/EditCard'
import { LinkCard } from '@components/_cards/LinkCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PlaceModality } from '@components/_cards/PlaceModalityCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { SaleOrExchangeCard } from '@components/_cards/SaleOrExchangeCard'
import { LocationChangeConfirmationModal } from '@components/_modals/LocationChangeConfirmation'
import { PostReviewPresentationModal } from '@components/_modals/PostReviewPresentationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { EditPost } from '@components/EditPost'

const { formatDate, formatHour, arrayIsEmpty } = UiUtils()
const { getTextualAddress } = UiLocationUtils()

function CulturePostReview({ route, navigation }: CulturePostReviewScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, userPostsContext, setUserDataOnContext, getLastUserPost } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { setCurrentPostDataOnContext } = useContext(SubscriptionContext)

	const [locationChangeModalIsVisible, setLocationChangeModalIsVisible] = useState(false)
	const [postReviewPresentationModalIsVisible, setPostReviewPresentationModalIsVisible] = useState(false)

	const owner: PostEntityCommonFields['owner'] = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	const { postData, unsavedPost, offlinePost, showPresentationModal } = route.params

	useEffect(() => {
		showPresentationModal && togglePostReviewPresentationModalVisibility()
		clearUnsavedEditContext()
	}, [])

	const getPostField = (fieldName: keyof CultureEntityOptional, allowNull?: boolean) => { // REFACTOR Retornar tipo relativo <T> generics
		const currentPostData = { ...postData, postType: 'culture' }

		if (allowNull && editDataContext.unsaved[fieldName] === '' && currentPostData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || currentPostData[fieldName]
	}

	const getPicturesUrl = () => {
		const picturesUrl = getPostField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const getVideosUrl = () => {
		const videosUrl = getPostField('videosUrl')
		if (arrayIsEmpty(videosUrl)) return []
		return videosUrl
	}

	const formatCategoryAndTags = () => { // REFACTOR useUiUtils internalizar no componente?
		const category: CultureCategories = getPostField('category')
		const tags = getPostField('tags')

		if (!cultureCategories[category]) return ''

		return `	●  ${cultureCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
	}

	// const renderCultureRepeat = () => {
	// 	const repeat = getPostField('repeat') as EventRepeatType
	// 	switch (repeat) {
	// 		case 'unrepeatable': return showMessageWithHighlight('não se repete', ['não'])
	// 		case 'everyDay': return showMessageWithHighlight('todos os dias', ['todos'])
	// 		case 'weekly': return showMessageWithHighlight('uma vez por semana', ['1', 'semana'])
	// 		case 'biweekly': return showMessageWithHighlight('a cada 15 dias', ['15'])
	// 		case 'monthly': return showMessageWithHighlight('1 vez no mês', ['1', 'mês'])
	// 		default: return ''
	// 	}
	// }

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
		navigation.navigate('Profile' as any) // TODO Type todas as navegações entre stacks que estão no mesmo nível
	}

	const navigateToPostView = (culturePostData: PostEntityOptional) => {
		navigation.navigate('PostViewProfile' as any, { postData: culturePostData })
	}

	const navigateToEditScreen = (screenName: keyof CultureStackParamList, initialValue: keyof CultureEntity) => {
		let value = getPostField(initialValue, true)

		if (initialValue === 'picturesUrl' || initialValue === 'videosUrl') {
			value = { picturesUrl: getPicturesUrl(), videosUrl: getVideosUrl() }
		}

		if (initialValue === 'location') {
			value = {
				coordinates: value.coordinates,
				postRange: getPostField('range')
			}
		}

		navigation.push(screenName, { editMode: true, initialValue: value })
	}

	const navigateToEditLocationScreen = () => navigateToEditScreen('SelectCultureLocationView', 'location')

	const getLastPostAddress = () => {
		const lastUserPost = getLastUserPost()
		if (!lastUserPost) return ''
		return getTextualAddress(lastUserPost.location)
	}

	const toggleRangeChangeModalVisibility = () => {
		setLocationChangeModalIsVisible(!locationChangeModalIsVisible)
	}

	const togglePostReviewPresentationModalVisibility = () => {
		setPostReviewPresentationModalIsVisible(!postReviewPresentationModalIsVisible)
	}

	const checkChangeLocationAlertIsRequired = () => {
		if (userPostsContext && userPostsContext.length < 1) navigateToEditScreen('SelectCultureLocationView', 'location')

		if (userDataContext.subscription?.subscriptionRange === 'near') {
			toggleRangeChangeModalVisibility()
			return
		}

		navigateToEditScreen('SelectCultureLocationView', 'location')
	}

	const navigateToSubscriptionContext = () => {
		setCurrentPostDataOnContext({
			...postData,
			...editDataContext.unsaved,
			postType: 'culture',
			createdAt: new Date(),
			owner: {
				userId: userDataContext.userId,
				name: userDataContext.name,
				profilePictureUrl: userDataContext.profilePictureUrl
			}
		})
		navigation.navigate('SelectSubscriptionPlan', { postRange: getPostField('range'), postReview: true })
	}

	const userContext = { userDataContext, setUserDataOnContext }
	const editContext = { editDataContext, setEditDataOnContext, clearUnsavedEditContext }

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
				initialPostData={{ ...postData, postType: 'culture' }}
				approvedPostData={route.params.approvedPostData || {}}
				owner={owner}
				backgroundColor={theme.colors.blue[2]}
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
				<VerticalSpacing />
				<CultureTypeCard
					title={'tipo de cultura'}
					macroCategory={getPostField('macroCategory')}
					onEdit={() => navigateToEditScreen('SelectCultureType', 'macroCategory')}
				/>
				<VerticalSpacing />
				<DescriptionCard
					text={getPostField('description')}
					onEdit={() => navigateToEditScreen('InsertCultureDescription', 'description')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={[...getPicturesUrl()]}
					videosUrl={[...getVideosUrl()]}
					indicatorColor={theme.colors.blue[1]}
					carousel
					pressionable={arrayIsEmpty([...getPicturesUrl(), ...getVideosUrl()])}
					onEdit={() => navigateToEditScreen('SelectCulturePostMedia', 'picturesUrl')}
				/>
				<VerticalSpacing />
				<LinkCard
					links={getPostField('links')}
					onEdit={() => navigateToEditScreen('InsertCultureLinks', 'links')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'tags do post'}
					highlightedWords={['tags']}
					value={formatCategoryAndTags()}
					onEdit={() => navigateToEditScreen('SelectCultureCategory', 'tags')}
				/>
				<VerticalSpacing />
				<PostRangeCard
					postRange={getPostField('range')}
					onEdit={() => navigateToEditScreen('SelectCultureRange', 'range')}
				/>
				<VerticalSpacing />
				<LocationViewCard
					title={'localização'}
					locationView={getPostField('locationView')}
					textFontSize={16}
					location={getPostField('location')}
					onEdit={checkChangeLocationAlertIsRequired}
				/>
				<VerticalSpacing />
				<SaleOrExchangeCard
					title={'custo de entrada'}
					hightligtedWords={['custo', 'entrada']}
					saleValue={getPostField('entryValue', true)}
					onEdit={() => navigateToEditScreen('InsertEntryValue', 'entryValue')}
					isCulturePost
				/>
				<VerticalSpacing />
				<PlaceModality
					title={'como participar'}
					hightligtedWords={['participar']}
					placeModality={getPostField('eventPlaceModality')}
					onEdit={() => navigateToEditScreen('SelectCulturePlaceModality', 'eventPlaceModality')}
				/>
				<VerticalSpacing />
				<DateTimeCard
					title={'dias da semana'}
					highlightedWords={['dias']}
					weekDaysfrequency={getPostField('exhibitionFrequency')}
					daysOfWeek={getPostField('daysOfWeek', true)}
					onEdit={() => navigateToEditScreen('SelectCultureFrequency', 'daysOfWeek')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que dia começa'}
					highlightedWords={['começa']}
					SecondSvgIcon={CalendarEmptyIcon}
					value={formatDate(getPostField('startDate', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertCultureStartDate', 'startDate')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que horas começa'}
					highlightedWords={['começa']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('startHour', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertCultureStartHour', 'startHour')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que dia termina'}
					highlightedWords={['termina']}
					SecondSvgIcon={CalendarEmptyIcon}
					value={formatDate(getPostField('endDate', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertCultureEndDate', 'endDate')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que horas termina'}
					highlightedWords={['termina']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('endHour', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertCultureEndHour', 'endHour')}
				/>
			</EditPost >
		</>
	)
}

export { CulturePostReview }
