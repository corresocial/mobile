import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, ScrollView, TouchableOpacity } from 'react-native'

import { Chat } from '@domain/chat/entity/types'
import { useChatDomain } from '@domain/chat/useChatDomain'
import { PostEntityKeys } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'
import { UserOwner } from '@domain/user/entity/types'

import { usePostRepository } from '@data/post/usePostRepository'

import { useAuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { useLeaderAreaContext } from '@contexts/LeaderAreaContext'
import { LoaderContext } from '@contexts/LoaderContext'

import { navigateToProfileView } from '@routes/auxMethods'
import { ViewUnapprovedPostScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { defaultUserProfilePicture } from '@utils/defaultUserProfilePicture'
import { cultureCategories } from '@utils/postsCategories/cultureCategories'
import { incomeCategories } from '@utils/postsCategories/incomeCategories'
import { socialImpactCategories } from '@utils/postsCategories/socialImpactCategories'

import { Body, Container, Header, OptionsArea, UserAndValueContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { CultureTypeCard } from '@components/_cards/CultureTypeCard'
import { DateTimeCard } from '@components/_cards/DateTimeCard'
import { DeliveryMethodCard } from '@components/_cards/DeliveryMethodCard'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { ExhibitionPlaceCard } from '@components/_cards/ExhibitionPlace'
import { ImportantPointsCard } from '@components/_cards/ImportantPointsCard'
import { IncomeTypeCard } from '@components/_cards/IncomeTypeCard'
import { ItemStatusCard } from '@components/_cards/ItemStatusCard'
import { LinkCard } from '@components/_cards/LinkCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PlaceModality } from '@components/_cards/PlaceModalityCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { SaleOrExchangeCard } from '@components/_cards/SaleOrExchangeCard'
import { SocialImpactTypeCard } from '@components/_cards/SocialImpactType'
import { VacancyPurposeCard } from '@components/_cards/VacancyPurposeCard'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { GalleryModal } from '@components/_modals/GalleryModal'
import { RejectConfirmationModal } from '@components/_modals/RejectConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { HorizontalTagList } from '@components/HorizontalTagList'
import { ImageCarousel } from '@components/ImageCarousel'
import { PostPopOver } from '@components/PostPopOver'
import { SmallUserIdentification } from '@components/SmallUserIdentification'

const { approvePost, rejectPost } = usePostDomain()

const { formatRelativeDate, arrayIsEmpty } = UiUtils()

const {
	existsOnDatabase,
	registerNewChat,
	setChatIdForUsers,
	generateNewMessageObject,
	sendMessage,
} = useChatDomain()

function ViewUnapprovedPost({ route, navigation }: ViewUnapprovedPostScreenProps) {
	const { userDataContext } = useAuthContext()
	const { clearEditContext } = useContext(EditContext)
	const { removeFromUnapprovedPostList } = useLeaderAreaContext()

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)

	const { setLoaderIsVisible } = useContext(LoaderContext)
	const [approveConfirmationModalIsVisible, setApproveConfirmationModalIsVisible] = useState(false)
	const [rejectConfirmationModalIsVisible, setRejectConfirmationModalIsVisible] = useState(false)
	const [galeryIsVisible, setGaleryIsVisible] = useState(false)

	const { postData } = route.params

	useEffect(() => {
		return () => {
			clearEditContext()
		}
	}, [])

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) return null
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	const renderFormatedPostDateTime = () => {
		const formatedDate = formatRelativeDate(postData.createdAt || '')
		return formatedDate
	}

	const reportPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage' as any, { // TODO TYpe
			title: 'denunciar',
			contactUsType: 'denúncia',
			reportedType: postData.postType,
			reportedId: postData.postId
		})
	}

	const navigateToProfile = () => {
		const ownerId = postData.owner.userId
		if (userDataContext.userId === ownerId) return navigateToProfileView(navigation)
		navigateToProfileView(navigation, ownerId, 'LeaderArea', postData.owner.redirect)
	}

	const getCategoryLabel = () => {
		try {
			const categories = getRelativeCategories()

			const categoryField = getPostField('category')
			if (Object.keys(categories).includes(categoryField)) {
				return (categories as any)[categoryField].label
			}
			return ''
		} catch (err) {
			console.log(err)
			return ''
		}
	}

	const getPostField = (fieldName: PostEntityKeys, useApprovedPostData?: boolean): any => {
		return useApprovedPostData ? (postData.unapprovedData as any)[fieldName] || (postData as any)[fieldName] : (postData.unapprovedData as any)[fieldName]
	}

	const toggleApproveConfirmationModalVisibility = () => {
		setPostOptionsIsOpen(false)
		setTimeout(() => setApproveConfirmationModalIsVisible(!approveConfirmationModalIsVisible), 400)
	}

	const toggleRejectConfirmationModalVisibility = () => {
		setPostOptionsIsOpen(false)
		setTimeout(() => setRejectConfirmationModalIsVisible(!rejectConfirmationModalIsVisible), 400)
	}

	const openGallery = () => setGaleryIsVisible(true)

	const closeGalery = () => setGaleryIsVisible(false)

	const handleApprovePostButton = () => {
		toggleApproveConfirmationModalVisibility()
	}

	const handleRejectPostButton = () => {
		toggleRejectConfirmationModalVisibility()
	}

	const rejectUserPost = async (rejectMessage?: string) => {
		try {
			setLoaderIsVisible(true)
			const rejectedPost = await rejectPost(usePostRepository, postData)
			removeFromUnapprovedPostList(rejectedPost!)
			await sendRejectMessageToChat(rejectMessage)
			setLoaderIsVisible(false)
			navigationBackwards()
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
		}
	}

	const approveUserPost = async () => {
		try {
			setLoaderIsVisible(true)
			const approvedPost = await approvePost(usePostRepository, postData)
			removeFromUnapprovedPostList(approvedPost!)
			setLoaderIsVisible(false)
			navigationBackwards()
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
		}
	}

	const sendRejectMessageToChat = async (rejectMessage?: string) => {
		try {
			const authenticatedUserId = userDataContext.userId
			const recipientUser: UserOwner = getPostField('owner', true)

			if (authenticatedUserId === recipientUser.userId) throw new Error('Você não pode enviar mensagens para seu próprio post')

			const secondaryChatId = `${recipientUser.userId}-${userDataContext.userId}`
			const currentChat = {
				chatId: `${userDataContext.userId}-${recipientUser.userId}`,
				user1: {
					userId: userDataContext.userId || '',
					name: userDataContext.name || '',
					profilePictureUrl: userDataContext.profilePictureUrl && userDataContext.profilePictureUrl.length ? userDataContext.profilePictureUrl[0] : '',
				},
				user2: { ...recipientUser, profilePictureUrl: recipientUser.profilePictureUrl && recipientUser.profilePictureUrl.length ? recipientUser.profilePictureUrl[0] : '' },
				messages: {},
			}

			let validChatId = ''
			if (await existsOnDatabase(currentChat.chatId)) {
				validChatId = currentChat.chatId
			} else if (await existsOnDatabase(secondaryChatId)) {
				validChatId = secondaryChatId
			} else {
				await registerNewChat(currentChat as Chat)
				await setChatIdForUsers([currentChat.user1.userId, currentChat.user2.userId], currentChat.chatId)
				validChatId = currentChat.chatId
			}

			if (!validChatId) throw new Error('Não foi possível utilizar um identificador de chat válido')

			const textMessage = `Sua postagem "${getShortText(getPostField('description', true) || '', 45)}" foi rejeitada por não estar de acordo com nossos termos de uso\n${rejectMessage ? `MOTIVO: ${rejectMessage}` : ''}`
			const newMessageObject = generateNewMessageObject(textMessage, authenticatedUserId)
			const newMessageValue = Object.values(newMessageObject)[0]

			await sendMessage(
				{ ...newMessageValue },
				validChatId,
				recipientUser.name
			)
		} catch (error) {
			console.log(error)
		}
	}

	const navigationBackwards = () => navigation.goBack()

	const getRelativeCategories = () => {
		switch (postData.postType) {
			case 'income': return incomeCategories
			case 'socialImpact': return socialImpactCategories
			case 'culture': return cultureCategories
		}
	}

	const getRelativeColor = (light?: boolean) => {
		switch (postData.postType) {
			case 'income': return light ? theme.colors.green[1] : theme.colors.green[2]
			case 'socialImpact': return light ? theme.colors.pink[1] : theme.colors.pink[2]
			case 'culture': return light ? theme.colors.blue[1] : theme.colors.blue[2]
		}
	}

	return (
		<Container backgroundColor={getRelativeColor()}>
			<DefaultConfirmationModal // APROVAR
				overlayColor={'success'}
				visibility={approveConfirmationModalIsVisible}
				title={'aprovar'}
				text={'você tem certeza que deseja aprovar esse post?'}
				highlightedWords={['aprovar']}
				buttonKeyword={'aprovar'}
				closeModal={toggleApproveConfirmationModalVisibility}
				onPressButton={approveUserPost}
			/>
			<RejectConfirmationModal // REJEITAR
				visibility={rejectConfirmationModalIsVisible}
				closeModal={toggleRejectConfirmationModalVisibility}
				onPressButton={rejectUserPost}
			/>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={getPostField('description', true)}
				/>
				<VerticalSpacing />
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
				</UserAndValueContainer>
				<VerticalSpacing />
				<OptionsArea>
					<SmallButton
						label={'rejeitar'}
						color={theme.colors.red[3]}
						SvgIcon={DeniedWhiteIcon}
						relativeWidth={'40%'}
						height={relativeScreenWidth(12)}
						onPress={handleRejectPostButton}
					/>
					<SmallButton
						label={'aprovar'}
						color={theme.colors.green[3]}
						SvgIcon={CheckWhiteIcon}
						relativeWidth={'40%'}
						height={relativeScreenWidth(12)}
						onPress={handleApprovePostButton}
					/>
					<PostPopOver
						postTitle={getShortText(getPostField('description'), 45) || 'publicação no corre.'}
						popoverVisibility={postOptionsIsOpen}
						closePopover={() => setPostOptionsIsOpen(false)}
						isAuthor={false}
						goToComplaint={reportPost}
					>
						<SmallButton
							SvgIcon={ThreeDotsWhiteIcon}
							relativeWidth={relativeScreenWidth(12)}
							height={relativeScreenWidth(12)}
							onPress={() => setPostOptionsIsOpen(true)}
						/>
					</PostPopOver>
				</OptionsArea>
			</Header>
			<ScrollView showsVerticalScrollIndicator={false} >
				<VerticalSpacing />
				{
					getPostField('tags') && (
						<HorizontalTagList
							tags={[getCategoryLabel(), ...getPostField('tags')]}
							selectedColor={getRelativeColor(true)}
						/>
					)
				}
				<VerticalSpacing />
				<Body backgroundColor={getRelativeColor()}>
					{
						getPostField('description') && (
							<DescriptionCard
								text={getPostField('description')}
							/>
						)
					}
					{
						getPostField('macroCategory') && getPostField('postType') === 'income' && (
							<IncomeTypeCard
								title={'tipo de renda'}
								macroCategory={getPostField('macroCategory')}
							/>
						)
					}
					{
						getPostField('macroCategory') && getPostField('postType') === 'culture' && (
							<CultureTypeCard
								title={'tipo de cultura'}
								macroCategory={getPostField('macroCategory')}
							/>
						)
					}
					{
						getPostField('macroCategory') && getPostField('postType') === 'socialImpact' && (
							<SocialImpactTypeCard
								title={'tipo de impacto'}
								macroCategory={getPostField('macroCategory')}
							/>
						)
					}
					{
						getPostField('itemStatus') && (
							<ItemStatusCard
								itemStatus={getPostField('itemStatus')}
							/>
						)
					}
					{
						getPostField('vacancyPurpose' as any) && getPostField('macroCategory') === 'vacancy' && (
							<VacancyPurposeCard
								vacancyPurpose={getPostField('vacancyPurpose' as any) || getPostField('lookingFor')}
							/>
						)
					}
					{
						!arrayIsEmpty(getPostField('links')) && (
							<LinkCard
								links={getPostField('links')}
							/>
						)
					}
					{
						!arrayIsEmpty(getPostField('picturesUrl')) || !arrayIsEmpty(getPostField('videosUrl'))
							? (
								<>
									<GalleryModal
										picturesUrl={getPostField('picturesUrl')}
										videosUrl={getPostField('videosUrl')}
										showGallery={galeryIsVisible}
										onClose={closeGalery}
									/>
									<TouchableOpacity
										activeOpacity={1}
										onPress={openGallery}
									>
										<ImageCarousel
											picturesUrl={getPostField('picturesUrl') || []}
											videosThumbnails={getPostField('videosUrl') || []}
											indicatorColor={theme.colors.blue[1]}
											square
											showFullscreenIcon
										/>
									</TouchableOpacity>
								</>
							)
							: Object.keys((postData.unapprovedData || {})).length <= 2 && (
								<ImageCarousel
									picturesUrl={[defaultUserProfilePicture]}
									indicatorColor={theme.colors.blue[1]}
									square
								/>
							)
					}
					{
						getPostField('range') && (
							<PostRangeCard postRange={getPostField('range')} />
						)
					}
					{
						getPostField('eventPlaceModality') && (
							<PlaceModality
								title={'como participar'}
								hightligtedWords={['participar']}
								placeModality={getPostField('eventPlaceModality')}
							/>
						)
					}
					{
						getPostField('eventPlaceModality') && (
							<PlaceModality
								title={'local de trabalho'}
								hightligtedWords={['local', 'trabalho']}
								placeModality={getPostField('workplace')}
								isVacancy
							/>
						)
					}
					{
						(getPostField('eventPlaceModality') || getPostField('locationView') || getPostField('location')) && (
							<LocationViewCard
								online={getPostField('workplace') === 'homeoffice'}
								locationView={'public'}
								withoutMapView={!(getPostField('location') && getPostField('location').coordinates)}
								location={getPostField('location')}
							/>
						)
					}
					{
						getPostField('exhibitionPlace') && (
							<ExhibitionPlaceCard
								exhibitionPlace={getPostField('exhibitionPlace')}
							/>
						)
					}
					{
						getPostField('entryValue', true) && getPostField('postType') === 'culture' && (
							<SaleOrExchangeCard
								title={'custo de entrada'}
								hightligtedWords={['custo', 'entrada']}
								saleValue={getPostField('entryValue', true)}
								isCulturePost
							/>
						)
					}
					{
						(getPostField('saleValue', true) || getPostField('exchangeValue', true)) && getPostField('macroCategory') === 'vacancy' && (
							<SaleOrExchangeCard
								title={'tipo de remuneração'}
								hightligtedWords={['tipo', 'remuneração']}
								saleValue={getPostField('saleValue', true)}
								exchangeValue={getPostField('exchangeValue', true)}
								isPayment
							/>
						)
					}
					{
						(getPostField('saleValue') || getPostField('exchangeValue')) && getPostField('postType') === 'income' && (
							<SaleOrExchangeCard
								saleValue={getPostField('saleValue', true)}
								exchangeValue={getPostField('exchangeValue', true)}
							/>
						)
					}
					{
						(
							getPostField('exhibitionFrequency')
							|| getPostField('daysOfWeek', true)
							|| getPostField('startDate', true)
							|| getPostField('endDate', true)
							|| getPostField('startHour', true)
							|| getPostField('endHour', true)
							|| getPostField('repeat')
						) && (
							<DateTimeCard
								weekDaysfrequency={getPostField('exhibitionFrequency')}
								daysOfWeek={getPostField('daysOfWeek', true)}
								startDate={getPostField('startDate', true)}
								endDate={getPostField('endDate', true)}
								startTime={getPostField('startHour', true)}
								endTime={getPostField('endHour', true)}
								repetition={getPostField('repeat')}
							/>
						)
					}
					{
						getPostField('deliveryMethod') && (
							<DeliveryMethodCard
								deliveryMethod={getPostField('deliveryMethod')}
							/>
						)
					}
					{
						!!(getPostField('importantPoints') && getPostField('importantPoints').length) && (
							<ImportantPointsCard
								importantPoints={getPostField('importantPoints')}
							/>
						)
					}
					<VerticalSpacing bottomNavigatorSpace />
				</Body>
			</ScrollView>
		</Container >
	)
}

export { ViewUnapprovedPost }
