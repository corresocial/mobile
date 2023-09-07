import React, { useContext, useEffect, useState } from 'react'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { SubscriptionContext } from '../../../contexts/SubscriptionContext'
import { StateContext } from '../../../contexts/StateContext'

import { EditSalePostReviewScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { SaleStackParamList } from '../../../routes/Stack/SaleStack/types'
import { PostCollection, SaleCategories, SaleCollection, SaleCollectionRemote } from '../../../services/firebase/types'

import { saleCategories } from '../../../utils/postsCategories/saleCategories'
import { getTextualAddress } from '../../../utils/maps/addressFormatter'
import { arrayIsEmpty, formatHour } from '../../../common/auxiliaryFunctions'

import { theme } from '../../../common/theme'
import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'

import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { DeliveryMethodCard } from '../../../components/_cards/DeliveryMethodCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { ItemStatusCard } from '../../../components/_cards/ItemStatusCard'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { PostRangeCard } from '../../../components/_cards/PostRangeCard'
import { EditCard } from '../../../components/_cards/EditCard'
import { EditPost } from '../../../components/EditPost'
import { LocationChangeConfirmationModal } from '../../../components/_modals/LocationChangeConfirmation'
import { PostReviewPresentationModal } from '../../../components/_modals/PostReviewPresentationModal'

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

	const getPostField = (fieldName: keyof SaleCollection, allowNull?: boolean) => {
		if (allowNull && editDataContext.unsaved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || postData[fieldName]
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

	const navigateToPostView = (salePostData: PostCollection) => {
		navigation.navigate('ViewSalePost' as any, { postData: salePostData }) // TODO Type // xxx
	}

	const navigateToEditScreen = (screenName: keyof SaleStackParamList, initialValue: keyof SaleCollectionRemote) => {
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

		navigation.navigate('SaleStack', {
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
				postType: 'sale',
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
				initialPostData={{ ...postData, postType: 'sale' }}
				owner={owner}
				backgroundColor={theme.green2}
				unsavedPost={unsavedPost}
				offlinePost={offlinePost}
				navigateBackwards={navigateBackwards}
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
					onEdit={() => navigateToEditScreen('SelectSaleCategory', 'tags')}
				/>
				<VerticalSigh />
				<ItemStatusCard
					itemStatus={getPostField('itemStatus')}
					onEdit={() => navigateToEditScreen('SelectItemStatus', 'itemStatus')}
				/>
				<VerticalSigh />
				<DescriptionCard
					text={getPostField('description')}
					onEdit={() => navigateToEditScreen('InsertSaleDescription', 'description')}
				/>
				<VerticalSigh />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={getPicturesUrl()}
					indicatorColor={theme.green1}
					carousel
					onEdit={() => navigateToEditScreen('SalePicturePreview', 'picturesUrl')}
				/>
				<VerticalSigh />
				<SaleOrExchangeCard
					saleValue={getPostField('saleValue', true)}
					exchangeValue={getPostField('exchangeValue', true)}
					onEdit={() => navigateToEditScreen('SelectPaymentType', 'saleValue')}
				/>
				<VerticalSigh />
				<PostRangeCard
					postRange={getPostField('range')}
					onEdit={() => navigateToEditScreen('SelectSaleRange', 'range')}
				/>
				<VerticalSigh />
				<LocationViewCard
					title={'localização'}
					locationView={getPostField('locationView')}
					textFontSize={16}
					location={getPostField('location')}
					onEdit={checkChangeLocationAlertIsRequired}
				/>
				<VerticalSigh />
				<DeliveryMethodCard
					deliveryMethod={getPostField('deliveryMethod')}
					onEdit={() => navigateToEditScreen('SelectDeliveryMethod', 'deliveryMethod')}
				/>
				<VerticalSigh />
				<DateTimeCard
					title={'dias da semana'}
					highlightedWords={['dias']}
					weekDaysfrequency={getPostField('attendanceFrequency')}
					daysOfWeek={getPostField('daysOfWeek', true)}
					onEdit={() => navigateToEditScreen('SelectSaleFrequency', 'daysOfWeek')}
				/>
				<VerticalSigh />
				<EditCard
					title={'que horas começa'}
					highlightedWords={['começa']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('startHour', true)) || ' ---'}
					valueBold
					onEdit={() => navigateToEditScreen('InsertSaleStartHour', 'startHour')}
				/>
				<VerticalSigh />
				<EditCard
					title={'que horas termina'}
					highlightedWords={['termina']}
					SecondSvgIcon={ClockWhiteIcon}
					value={formatHour(getPostField('endHour', true)) || ' ---'}
					valueBold
					onEdit={() => navigateToEditScreen('InsertSaleEndHour', 'endHour')}
				/>
			</EditPost>
		</>
	)
}

export { EditSalePost }
