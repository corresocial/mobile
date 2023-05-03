import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, ScrollView } from 'react-native'

import {
	Body,
	Container,
	Header,
	OptionsArea,
	UserAndValueContainer,
} from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import ShareWhiteIcon from '../../../assets/icons/share-white.svg'
import ChatWhiteIcon from '../../../assets/icons/chatTabIconInactive.svg'
import ThreeDotsWhiteIcon from '../../../assets/icons/threeDots.svg'

import { arrayIsEmpty, formatRelativeDate } from '../../../common/auxiliaryFunctions'
import { deletePost } from '../../../services/firebase/post/deletePost'
import { deletePostPictures } from '../../../services/firebase/post/deletePostPictures'
import { saleCategories } from '../../../utils/postsCategories/saleCategories'
import { share } from '../../../common/share'

import { ViewSalePostScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostCollection, SaleCategories, SaleCollection, SaleCollectionRemote } from '../../../services/firebase/types'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { SaleExchangeValue } from '../../../components/SaleExchangeValue'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { ImageCarousel } from '../../../components/ImageCarousel'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { DeliveryMethodCard } from '../../../components/_cards/DeliveryMethodCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PostPopOver } from '../../../components/PostPopOver'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { HorizontalTagList } from '../../../components/HorizontalTagList'
import { ItemStatusCard } from '../../../components/_cards/ItemStatusCard'

function ViewSalePost({ route, navigation }: ViewSalePostScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { editDataContext, clearEditContext } = useContext(EditContext)

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		return () => {
			clearEditContext()
		}
	}, [])

	const loggedUserIsOwner = () => {
		if (!route.params.postData || !route.params.postData.owner) { return false }
		return userDataContext.userId === route.params.postData.owner.userId
	}

	const isAuthor = loggedUserIsOwner()
	const { postData } = route.params as { postData: SaleCollectionRemote }

	const renderFormatedPostDateTime = () => {
		const formatedDate = formatRelativeDate(postData.createdAt)
		return formatedDate
	}

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) { return null }
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	const goToEditPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('EditSalePost' as any, {
			postData: { ...postData, ...editDataContext.saved },
		})
	}

	const deleteRemotePost = async () => {
		setIsLoading(true)
		await deletePost(postData.postId, postData.owner.userId)
		await deletePostPictures(getPostField('picturesUrl') || [])
		await removePostOnContext()
		setIsLoading(false)
		backToPreviousScreen()
	}

	const removePostOnContext = async () => {
		const currentUserPosts = userDataContext.posts || []
		const postsWithoutDeletedPost = currentUserPosts.filter(
			(post: PostCollection) => post.postId !== postData.postId
		)
		setUserDataOnContext({
			...userDataContext,
			posts: postsWithoutDeletedPost,
		})
	}

	const backToPreviousScreen = () => {
		setPostOptionsIsOpen(false)
		navigation.goBack()
	}

	const sharePost = () => {
		share(
			`${isAuthor ? 'tô' : 'estão'} anunciando ${getPostField('title')} no corre.\n\nhttps://corre.social`
		)
	}

	const getUserProfilePictureFromContext = () => {
		if (userDataContext && userDataContext.profilePictureUrl) {
			return userDataContext.profilePictureUrl[0] || ''
		}
		return ''
	}

	const openChat = async () => {
		const userId1 = userDataContext.userId
		const userId2 = postData.owner.userId

		navigation.navigate('ChatMessages', {
			chat: {
				chatId: '',
				user1: {
					userId: userId1 || '',
					name: userDataContext.name || '',
					profilePictureUrl: getUserProfilePictureFromContext()
				},
				user2: {
					userId: userId2,
					name: postData.owner.name,
					profilePictureUrl: getProfilePictureUrl() || ''
				},
				messages: {}
			}
		})
	}

	const reportPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage', {
			title: 'denunciar',
			contactUsType: 'denúncia',
			reportedType: postData.postType,
			reportedId: postData.postId,
		})
	}

	const navigateToProfile = () => {
		if (userDataContext.userId === postData.owner.userId) {
			navigation.navigate('Profile')
			return
		}
		navigation.navigate('ProfileHome' as any, {
			userId: postData.owner.userId,
		}) // TODO Type
	}

	const getCategoryLabel = () => {
		return saleCategories[getPostField('category') as SaleCategories].label || ''
	}

	const getPostField = (fieldName: keyof SaleCollection) => {
		return editDataContext.saved[fieldName] || postData[fieldName]
	}

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.white3}
				barStyle={'dark-content'}
			/>
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={getPostField('title')}
				/>
				<VerticalSigh />
				<UserAndValueContainer>
					<SmallUserIdentification
						userName={
							postData.owner
								? postData.owner.name
								: 'usuário do corre.'
						}
						postDate={renderFormatedPostDateTime()}
						userNameFontSize={14}
						profilePictureUrl={getProfilePictureUrl() || ''}
						pictureDimensions={45}
						width={'60%'}
						navigateToProfile={navigateToProfile}
					/>
					<SaleExchangeValue
						saleValue={getPostField('saleValue')}
						exchangeValue={getPostField('exchangeValue')}
						breakRow
						smallFontSize={14}
						largeFontSize={25}
						exchangeFontSize={14}
					/>
				</UserAndValueContainer>
				<VerticalSigh />
				<OptionsArea>
					{!isAuthor && (
						<SmallButton
							color={theme.white3}
							SvgIcon={ShareWhiteIcon}
							relativeWidth={relativeScreenWidth(12)}
							height={relativeScreenWidth(12)}
							onPress={sharePost}
						/>
					)}
					<SmallButton
						color={theme.green3}
						label={isAuthor ? 'compartilhar' : 'comprar'}
						SvgIcon={isAuthor ? ShareWhiteIcon : ChatWhiteIcon}
						relativeWidth={isAuthor ? '80%' : '63%'}
						height={relativeScreenWidth(12)}
						onPress={isAuthor ? sharePost : openChat}
					/>
					<PostPopOver
						postTitle={
							getPostField('title') || 'publicação no corre.'
						}
						postId={postData.postId}
						postType={postData.postType}
						popoverVisibility={postOptionsIsOpen}
						closePopover={() => setPostOptionsIsOpen(false)}
						isAuthor={isAuthor || false}
						isLoading={isLoading}
						goToComplaint={reportPost}
						editPost={goToEditPost}
						deletePost={deleteRemotePost}
					>
						<SmallButton
							color={theme.white3}
							SvgIcon={ThreeDotsWhiteIcon}
							relativeWidth={relativeScreenWidth(12)}
							height={relativeScreenWidth(12)}
							onPress={() => setPostOptionsIsOpen(true)}
						/>
					</PostPopOver>
				</OptionsArea>
			</Header>
			<ScrollView showsVerticalScrollIndicator={false}>
				<VerticalSigh />
				<HorizontalTagList
					tags={[getCategoryLabel(), ...getPostField('tags')]}
					selectedTags={[getCategoryLabel(), ...getPostField('tags')]}
					selectedColor={theme.green1}
					onSelectTag={() => { }}
				/>
				<Body>
					<VerticalSigh />
					<ItemStatusCard
						itemStatus={getPostField('itemStatus')}
					/>
					<VerticalSigh />
					<DescriptionCard
						text={getPostField('itemDescription')}
					/>
					<VerticalSigh />
					{!arrayIsEmpty(getPostField('picturesUrl')) && (
						<>
							<ImageCarousel
								picturesUrl={getPostField('picturesUrl') || []}
								indicatorColor={theme.green1}
							/>
							<VerticalSigh />
						</>
					)}

					{
						getPostField('saleValue') && !getPostField('exchangeValue') && (
							<>
								<SaleOrExchangeCard
									saleValue={getPostField('saleValue')}
									showsValueType={'sale'}
								/>
								<VerticalSigh />
							</>
						)
					}
					{
						!getPostField('saleValue') && getPostField('exchangeValue') && (
							<>
								<SaleOrExchangeCard
									exchangeValue={getPostField('exchangeValue')}
									showsValueType={'exchange'}
								/>
								<VerticalSigh />
							</>
						)
					}
					{
						getPostField('saleValue') && getPostField('exchangeValue') && (
							<>
								<SaleOrExchangeCard
									saleValue={getPostField('saleValue')}
									exchangeValue={getPostField('exchangeValue')}
									showsValueType={'both'}
								/>
								<VerticalSigh />
							</>
						)
					}

					<LocationViewCard
						title={'local de trabalho'}
						locationView={getPostField('locationView')}
						location={getPostField('location')}
					/>
					<VerticalSigh />
					<DateTimeCard
						weekDaysfrequency={getPostField('attendanceFrequency')}
						daysOfWeek={getPostField('daysOfWeek')}
						startTime={getPostField('startHour')}
						endTime={getPostField('endHour')}
					/>
					<VerticalSigh />
					<DeliveryMethodCard
						deliveryMethod={getPostField('deliveryMethod')}
					/>
					<VerticalSigh bottomNavigatorSpace />
				</Body>
			</ScrollView>
		</Container>
	)
}

export { ViewSalePost }
