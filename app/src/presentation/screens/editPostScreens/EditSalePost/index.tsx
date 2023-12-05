import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { StateContext } from '@contexts/StateContext'
import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { navigateToPostView } from '@routes/auxMethods'
import { EditSalePostReviewScreenProps } from '@routes/Stack/SaleStack/stackScreenProps'
import { SaleStackParamList } from '@routes/Stack/SaleStack/types'
import { PostCollection, SaleCategories, IncomeCollection } from '@services/firebase/types'

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

import { UiUtils } from '../../../utils-ui/common/UiUtils'
import { UiLocationUtils } from '../../../utils-ui/location/UiLocationUtils'
import { saleCategories } from '../../../utils/postsCategories/saleCategories'

const { formatHour, arrayIsEmpty } = UiUtils()
const { getTextualAddress } = UiLocationUtils()

function EditSalePost({ route, navigation }: EditSalePostReviewScreenProps) {
	const { setSubscriptionDataOnContext } = useContext(SubscriptionContext)
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setDataOnSecureStore, setUserDataOnContext, getLastUserPost } = useContext(AuthContext)
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

	const getPostField = (fieldName: keyof IncomeCollection, allowNull?: boolean) => {
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
		navigation.navigate('Profile' as any) // TODO Type
	}

	const viewPostDetails = (post: PostCollection) => {
		navigateToPostView(post, navigation)
	}

	const navigateToEditScreen = (screenName: keyof SaleStackParamList, initialValue: keyof IncomeCollection, customStack?: string) => {
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

		navigation.navigate(customStack || 'SaleStack' as any, { // TODO Type
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value
			}
		})
	}

	const navigateToEditLocationScreen = () => navigateToEditScreen('SelectLocationView', 'location')

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
		if (userDataContext.posts && userDataContext.posts.length < 1) navigateToEditScreen('SelectLocationView', 'location')

		if (userDataContext.subscription?.subscriptionRange === 'near') {
			toggleRangeChangeModalVisibility()
			return
		}

		navigateToEditScreen('SelectLocationView', 'location')
	}

	const navigateToSubscriptionContext = () => {
		setSubscriptionDataOnContext({
			currentPost: {
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
				initialPostData={{ ...postData, postType: 'income', macroCategory: 'sale' }}
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
				<DescriptionCard
					text={getPostField('description')}
					onEdit={() => navigateToEditScreen('InsertSaleDescription', 'description')}
				/>
				<VerticalSpacing />
				<LinkCard
					links={getPostField('links')}
					onEdit={() => navigateToEditScreen('InsertIncomeLinks', 'links')}
				/>
				<VerticalSpacing />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={getPicturesUrl()}
					indicatorColor={theme.green1}
					carousel
					onEdit={() => navigateToEditScreen('SalePicturePreview', 'picturesUrl')}
				/>
				<VerticalSpacing />
				<IncomeTypeCard
					title={'tipo de renda'}
					hightligtedWords={['tipo', 'renda']}
					macroCategory={getPostField('macroCategory')}
					onEdit={() => navigateToEditScreen('SelectIncomeType', 'macroCategory', 'UserStack')}
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
