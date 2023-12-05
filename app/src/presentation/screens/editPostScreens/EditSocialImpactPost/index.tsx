import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { StateContext } from '@contexts/StateContext'
import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { EditSocialImpactPostReviewScreenProps } from '@routes/Stack/SocialImpactStack/stackScreenProps'
import { SocialImpactStackParamList } from '@routes/Stack/SocialImpactStack/types'
import { EventRepeatType, PostCollection, SocialImpactCategories, SocialImpactCollection, SocialImpactCollectionRemote } from '@services/firebase/types'

import CalendarEmptyIcon from '@assets/icons/calendarEmpty-unfilled.svg'
import ClockWhiteIcon from '@assets/icons/clock-white.svg'
import RecycleWhiteIcon from '@assets/icons/recycle-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { theme } from '@common/theme'

import { DateTimeCard } from '@components/_cards/DateTimeCard'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { EditCard } from '@components/_cards/EditCard'
import { ExhibitionPlaceCard } from '@components/_cards/ExhibitionPlace'
import { LinkCard } from '@components/_cards/LinkCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { SocialImpactTypeCard } from '@components/_cards/SocialImpactType'
import { LocationChangeConfirmationModal } from '@components/_modals/LocationChangeConfirmation'
import { PostReviewPresentationModal } from '@components/_modals/PostReviewPresentationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { EditPost } from '@components/EditPost'

import { UiUtils } from '../../../utils-ui/common/UiUtils'
import { UiLocationUtils } from '../../../utils-ui/location/UiLocationUtils'
import { socialImpactCategories } from '../../../utils/postsCategories/socialImpactCategories'

const { formatDate, formatHour, arrayIsEmpty } = UiUtils()
const { getTextualAddress } = UiLocationUtils()

function EditSocialImpactPost({ route, navigation }: EditSocialImpactPostReviewScreenProps) {
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

	const getPostField = (fieldName: keyof SocialImpactCollection, allowNull?: boolean) => {
		const currentPostData = { ...postData, postType: 'socialImpact' }

		if (allowNull && editDataContext.unsaved[fieldName] === '' && currentPostData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || currentPostData[fieldName]
	}

	const getPicturesUrl = () => {
		const picturesUrl = getPostField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const formatCategoryAndTags = () => {
		const category: SocialImpactCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${socialImpactCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
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

	const navigateToPostView = (socialImpactPostData: PostCollection) => {
		navigation.navigate('ViewSocialImpactPost' as any, { postData: socialImpactPostData })
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

	const navigateToEditLocationScreen = () => navigateToEditScreen('SelectSocialImpactLocationView', 'location')

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
		if (userDataContext.posts && userDataContext.posts.length < 1) navigateToEditScreen('SelectSocialImpactLocationView', 'location')

		if (userDataContext.subscription?.subscriptionRange === 'near') {
			toggleRangeChangeModalVisibility()
			return
		}

		navigateToEditScreen('SelectSocialImpactLocationView', 'location')
	}

	const navigateToSubscriptionContext = () => {
		setSubscriptionDataOnContext({
			currentPost: {
				...postData,
				...editDataContext.unsaved,
				postType: 'socialImpact',
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
				initialPostData={{ ...postData, postType: 'socialImpact' }}
				owner={owner}
				backgroundColor={theme.pink2}
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
				<EditCard
					title={'tags do post'}
					highlightedWords={['tags']}
					value={formatCategoryAndTags()}
					onEdit={() => navigateToEditScreen('SelectSocialImpactCategory', 'tags')}
				/>
				<VerticalSpacing />
				<DescriptionCard
					text={getPostField('description')}
					onEdit={() => navigateToEditScreen('InsertSocialImpactDescription', 'description')}
				/>
				<VerticalSpacing />
				<LinkCard
					links={getPostField('links')}
					onEdit={() => navigateToEditScreen('InsertSocialImpactLinks', 'links')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={getPicturesUrl()}
					indicatorColor={theme.pink1}
					carousel
					onEdit={() => navigateToEditScreen('SocialImpactPicturePreview', 'picturesUrl')}
				/>
				<VerticalSpacing />
				<SocialImpactTypeCard
					title={'tipo de impacto'}
					macroCategory={getPostField('macroCategory')}
					onEdit={() => navigateToEditScreen('SelectSocialImpactType', 'macroCategory')}
				/>
				<VerticalSpacing />
				<PostRangeCard
					postRange={getPostField('range')}
					onEdit={() => navigateToEditScreen('SelectSocialImpactRange', 'range')}
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
				<ExhibitionPlaceCard
					exhibitionPlace={getPostField('exhibitionPlace')}
					onEdit={() => navigateToEditScreen('SelectSocialImpactExhibitionRange', 'exhibitionPlace')}
				/>
				<VerticalSpacing />
				<DateTimeCard
					title={'dias da semana'}
					highlightedWords={['dias']}
					weekDaysfrequency={getPostField('exhibitionFrequency')}
					daysOfWeek={getPostField('daysOfWeek', true)}
					onEdit={() => navigateToEditScreen('SelectSocialImpactFrequency', 'daysOfWeek')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'repetição'}
					highlightedWords={['repetição']}
					SecondSvgIcon={RecycleWhiteIcon}
					value={renderSocialImpactRepeat()}
					onEdit={() => navigateToEditScreen('SelectSocialImpactRepeat', 'repeat')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que dia começa'}
					highlightedWords={['começa']}
					SecondSvgIcon={CalendarEmptyIcon}
					value={formatDate(getPostField('startDate', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertSocialImpactStartDate', 'startDate')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que horas começa'}
					highlightedWords={['começa']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('startHour', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertSocialImpactStartHour', 'startHour')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que dia termina'}
					highlightedWords={['termina']}
					SecondSvgIcon={CalendarEmptyIcon}
					value={formatDate(getPostField('endDate', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertSocialImpactEndDate', 'endDate')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que horas termina'}
					highlightedWords={['termina']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('endHour', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertSocialImpactEndHour', 'endHour')}
				/>
			</EditPost>
		</>
	)
}

export { EditSocialImpactPost }
