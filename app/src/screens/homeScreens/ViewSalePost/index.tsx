import React, { useContext, useState } from 'react'
import { StatusBar, ScrollView, Linking } from 'react-native'

import { Body, Container, Header, LastSigh, OptionsArea, Sigh, UserAndValueContainer } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import ShareIcon from '../../../assets/icons/share.svg'
import ChatIcon from '../../../assets/icons/chat.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { arrayIsEmpty, formatRelativeDate } from '../../../common/auxiliaryFunctions'
import { deletePost } from '../../../services/firebase/post/deletePost'
import { share } from '../../../common/share'
import { getPrivateContacts } from '../../../services/firebase/user/getPrivateContacts'

import { ViewSalePostScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PostCollection } from '../../../services/firebase/types'
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

function ViewSalePost({ route, navigation }: ViewSalePostScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const loggedUserIsOwner = () => {
		if (!route.params.postData || !route.params.postData.owner) return false
		return userDataContext.userId === route.params.postData.owner.userId
	}
	const isAuthor = loggedUserIsOwner()
	const { postData } = route.params as any // TODO Type

	const renderFormatedPostDateTime = () => {
		const formatedDate = formatRelativeDate(postData.createdAt)
		return formatedDate
	}

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) return null
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	const goToEditPost = () => {
		navigation.navigate('EditPost' as any)
	}

	const deleteRemotePost = async () => {
		setIsLoading(true)
		await deletePost(postData.postId, postData.postType, postData.owner.userId)
		await removePostOnContext()
		setIsLoading(false)
		backToPreviousScreen()
	}

	const removePostOnContext = async () => {
		const currentUserPosts = userDataContext.posts || []
		const postsWithoutDeletedPost = currentUserPosts.filter((post: PostCollection) => post.postId !== postData.postId)
		setUserDataOnContext({ ...userDataContext, posts: postsWithoutDeletedPost })
	}

	const backToPreviousScreen = () => {
		setPostOptionsIsOpen(false)
		navigation.goBack()
	}

	const sharePost = () => {
		share(`${isAuthor ? 'tô' : 'estão'} anunciando ${postData.title} no corre.\n\nhttps://corre.social`)
	}

	const openChat = async () => {
		const { cellNumber } = await getPrivateContacts(postData.owner.userId)
		const message = `olá! vi que publicou ${postData.title} no corre. Podemos conversar?`
		Linking.openURL(`whatsapp://send?text=${message}&phone=${cellNumber}`)
	}

	const reportPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage' as any, { title: 'denunciar', contactUsType: 'denúncia', reportedPostType: postData.postType, reportedPostId: postData.postId }) // TODO Type
	}

	const navigateToProfile = () => {
		if (userDataContext.userId === postData.owner.userId) {
			navigation.navigate('Profile' as any)// TODO Type
			return
		}
		navigation.navigate('ProfileHome' as any, { userId: postData.owner.userId })// TODO Type
	}

	return (
		<Container>
			<StatusBar backgroundColor={postOptionsIsOpen ? 'rgba(0,0,0,0.5)' : theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={postData.title}
				/>
				<Sigh />
				<UserAndValueContainer>
					<SmallUserIdentification
						userName={postData.owner ? postData.owner.name : 'usuário do corre.'}
						postDate={renderFormatedPostDateTime()}
						userNameFontSize={14}
						profilePictureUrl={getProfilePictureUrl()}
						pictureDimensions={45}
						width={'60%'}
						navigateToProfile={navigateToProfile}
					/>
					<SaleExchangeValue
						saleValue={postData.saleValue}
						exchangeValue={postData.exchangeValue}
						breakRow
						smallFontSize={14}
						largeFontSize={25}
						exchanveFontSize={14}
					/>
				</UserAndValueContainer>
				<Sigh />
				<OptionsArea>
					{
						!isAuthor && (
							<SmallButton
								color={theme.white3}
								fontSize={14}
								SvgIcon={ShareIcon}
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								onPress={sharePost}
							/>
						)
					}
					<SmallButton
						color={theme.green2}
						label={isAuthor ? 'compartilhar' : 'comprar'}
						fontSize={14}
						SvgIcon={isAuthor ? ShareIcon : ChatIcon}
						relativeWidth={isAuthor ? '80%' : '63%'}
						height={relativeScreenWidth(12)}
						onPress={isAuthor ? sharePost : openChat}
					/>
					<PostPopOver
						postTitle={postData.title || 'publicação no corre.'}
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
				<ScrollView showsVerticalScrollIndicator={false} >
					<DescriptionCard
						title={'descrição do produto'}
						text={postData.itemDescription}
						textFontSize={14}
					/>
					<Sigh />
					{
						!arrayIsEmpty(postData.picturesUrl) && (
							<>
								<ImageCarousel
									picturesUrl={postData.picturesUrl && postData.picturesUrl}
								/>
								<Sigh />
							</>
						)
					}
					<SaleOrExchangeCard
						title={'venda ou troca'}
						saleValue={postData.saleValue}
						exchangeValue={postData.exchangeValue}
					/>
					<Sigh />
					<LocationViewCard
						title={'local de trabalho'}
						locationView={postData.locationView}
						postType={postData.postType}
						postId={route.params.postData.postId as string}
						textFontSize={16}
					/>
					<Sigh />
					<DateTimeCard
						title={'dias e horários'}
						weekDaysfrequency={postData.attendanceFrequency}
						daysOfWeek={postData.attendanceWeekDays}
						openingTime={postData.openingHour}
						closingTime={postData.closingHour}
						textFontSize={14}
					/>
					<Sigh />
					<DeliveryMethodCard
						title={'entrega'}
						deliveryMethod={postData.deliveryMethod}
						textFontSize={16}
					/>
					<LastSigh />
				</ScrollView>
			</Body>
		</Container >
	)
}

export { ViewSalePost }
