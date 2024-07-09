import React, { useContext, useEffect, useState } from 'react'

import { PostEntityOptional, SaleCategories, IncomeEntityOptional } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { StateContext } from '@contexts/StateContext'
import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { navigateToPostView } from '@routes/auxMethods'
import { EditSalePostReviewScreenProps } from '@routes/Stack/SaleStack/screenProps'
import { SaleStackParamList } from '@routes/Stack/SaleStack/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'
import { saleCategories } from '@utils/postsCategories/saleCategories'

import ClockWhiteIcon from '@assets/icons/clock-white.svg'
import { theme } from '@common/theme'

import { DateTimeCard } from '@components/_cards/DateTimeCard'
import { DeliveryMethodCard } from '@components/_cards/DeliveryMethodCard'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { EditCard } from '@components/_cards/EditCard'
import { IncomeTypeCard } from '@components/_cards/IncomeTypeCard'
import { ItemStatusCard } from '@components/_cards/ItemStatusCard'
import { LinkCard } from '@components/_cards/LinkCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { SaleOrExchangeCard } from '@components/_cards/SaleOrExchangeCard'
import { LocationChangeConfirmationModal } from '@components/_modals/LocationChangeConfirmation'
import { PostReviewPresentationModal } from '@components/_modals/PostReviewPresentationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { EditPost } from '@components/EditPost'

const { formatHour, arrayIsEmpty } = UiUtils()
const { getTextualAddress } = UiLocationUtils()

function EditSalePost({ route, navigation }: EditSalePostReviewScreenProps) {
	const { setCurrentPostDataOnContext } = useContext(SubscriptionContext)
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, userPostsContext, setUserDataOnContext, getLastUserPost } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

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

	const getPostField = (fieldName: keyof IncomeEntityOptional, allowNull?: boolean) => {
		const currentPostData = { ...postData, postType: 'income' }

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

	const formatCategoryAndTags = () => {
		const category: SaleCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${saleCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
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

	const viewPostDetails = (post: PostEntityOptional) => {
		navigateToPostView(post, navigation)
	}

	const navigateToEditScreen = (screenName: keyof SaleStackParamList, initialValue: keyof IncomeEntityOptional, customStack?: string) => { // TODO tipar com tipos de rotas
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

		if (customStack) {
			return navigation.push(customStack || 'SaleStack' as any, { // TODO Type
				screen: screenName,
				params: {
					editMode: true,
					initialValue: value
				}
			})
		}

		navigation.push(screenName, { editMode: true, initialValue: value })
	}

	const navigateToEditLocationScreen = () => navigateToEditScreen('SelectLocationView', 'location')

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
		if (userPostsContext && userPostsContext.length < 1) navigateToEditScreen('SelectLocationView', 'location')

		if (userDataContext.subscription?.subscriptionRange === 'near') {
			toggleRangeChangeModalVisibility()
			return
		}

		navigateToEditScreen('SelectLocationView', 'location')
	}

	const navigateToSubscriptionContext = () => {
		setCurrentPostDataOnContext({
			...postData,
			...editDataContext.unsaved,
			postType: 'income',
			macroCategory: 'sale',
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
				initialPostData={{ ...postData, postType: 'income', macroCategory: 'sale' }}
				approvedPostData={route.params.approvedPostData || {}}
				owner={owner}
				backgroundColor={theme.green2}
				unsavedPost={unsavedPost}
				offlinePost={offlinePost}
				navigateBackwards={navigateBackwards}
				navigateToProfile={navigateToProfile}
				navigateToPostView={viewPostDetails}
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
					onEdit={() => navigateToEditScreen('InsertSaleDescription', 'description')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={[...getVideosUrl(), ...getPicturesUrl()]}
					indicatorColor={theme.green1}
					carousel
					pressionable={arrayIsEmpty([...getPicturesUrl(), ...getVideosUrl()])}
					onEdit={() => navigateToEditScreen('SalePicturePreview', 'picturesUrl')}
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
					onEdit={() => navigateToEditScreen('SelectSaleCategory', 'tags')}
				/>
				<VerticalSpacing />
				<ItemStatusCard
					itemStatus={getPostField('itemStatus')}
					onEdit={() => navigateToEditScreen('SelectItemStatus', 'itemStatus')}
				/>
				<VerticalSpacing />
				<SaleOrExchangeCard
					saleValue={getPostField('saleValue', true)}
					exchangeValue={getPostField('exchangeValue', true)}
					onEdit={() => navigateToEditScreen('SelectPaymentType', 'saleValue')}
				/>
				<VerticalSpacing />
				<PostRangeCard
					postRange={getPostField('range')}
					onEdit={() => navigateToEditScreen('SelectSaleRange', 'range')}
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
				<DeliveryMethodCard
					deliveryMethod={getPostField('deliveryMethod')}
					onEdit={() => navigateToEditScreen('SelectDeliveryMethod', 'deliveryMethod')}
				/>
				<VerticalSpacing />
				<DateTimeCard
					title={'dias da semana'}
					highlightedWords={['dias']}
					weekDaysfrequency={getPostField('attendanceFrequency')}
					daysOfWeek={getPostField('daysOfWeek', true)}
					onEdit={() => navigateToEditScreen('SelectSaleFrequency', 'daysOfWeek')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que horas começa'}
					highlightedWords={['começa']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('startHour', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertSaleStartHour', 'startHour')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'que horas termina'}
					highlightedWords={['termina']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('endHour', true))}
					valueBold
					onEdit={() => navigateToEditScreen('InsertSaleEndHour', 'endHour')}
				/>
			</EditPost>
		</>
	)
}

export { EditSalePost }
