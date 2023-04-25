import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, ScrollView } from 'react-native'

import {
	Body,
	Container,
	Header,
	LastSigh,
	OptionsArea,
	Sigh,
	UserAndValueContainer,
} from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import ShareIcon from '../../../assets/icons/share.svg'
import ChatIcon from '../../../assets/icons/chat.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { arrayIsEmpty, formatRelativeDate } from '../../../common/auxiliaryFunctions'
import { deletePost } from '../../../services/firebase/post/deletePost'
import { share } from '../../../common/share'

import { ViewSalePostScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import {
	PostCollection,
	SaleCollection,
	SaleCollectionRemote,
} from '../../../services/firebase/types'
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
import { deletePostPictures } from '../../../services/firebase/post/deletePostPictures'

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

	const openChat = async () => {
		const userId1 = userDataContext.userId
		const userId2 = postData.owner.userId

		navigation.navigate('ChatMessages', {
			chat: {
				chatId: '',
				user1: {
					userId: userId1,
					name: userDataContext.name,
					profilePictureUrl: userDataContext.profilePictureUrl[0] || ''
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
				<Sigh />
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
				<Sigh />
				<OptionsArea>
					{!isAuthor && (
						<SmallButton
							color={theme.white3}
							SvgIcon={ShareIcon}
							relativeWidth={relativeScreenWidth(12)}
							height={relativeScreenWidth(12)}
							onPress={sharePost}
						/>
					)}
					<SmallButton
						color={theme.green2}
						label={isAuthor ? 'compartilhar' : 'comprar'}
						fontSize={13}
						SvgIcon={isAuthor ? ShareIcon : ChatIcon}
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
							SvgIcon={ThreeDotsIcon}
							relativeWidth={relativeScreenWidth(12)}
							height={relativeScreenWidth(12)}
							onPress={() => setPostOptionsIsOpen(true)}
						/>
					</PostPopOver>
				</OptionsArea>
			</Header>
			<Body>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Sigh />
					<DescriptionCard
						title={'descrição do produto'}
						text={getPostField('itemDescription')}
						textFontSize={14}
					/>
					<Sigh />
					{!arrayIsEmpty(getPostField('picturesUrl')) && (
						<>
							<ImageCarousel
								picturesUrl={getPostField('picturesUrl') || []}
							/>
							<Sigh />
						</>
					)}
					<SaleOrExchangeCard
						title={'venda ou troca'}
						saleValue={getPostField('saleValue')}
						exchangeValue={getPostField('exchangeValue')}
					/>
					<Sigh />
					<LocationViewCard
						title={'local de trabalho'}
						locationView={getPostField('locationView')}
						isAuthor={isAuthor}
						textFontSize={16}
						location={getPostField('location')}
					/>
					<Sigh />
					<DateTimeCard
						title={'dias e horários'}
						weekDaysfrequency={getPostField('attendanceFrequency')}
						daysOfWeek={getPostField('daysOfWeek')}
						startTime={getPostField('startHour')}
						endTime={getPostField('endHour')}
						textFontSize={14}
					/>
					<Sigh />
					<DeliveryMethodCard
						title={'entrega'}
						deliveryMethod={getPostField('deliveryMethod')}
						textFontSize={16}
					/>
					<LastSigh />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { ViewSalePost }
