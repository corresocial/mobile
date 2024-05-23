import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, ScrollView, TouchableOpacity } from 'react-native'

import { useUtils } from '@newutils/useUtils'

import { Chat } from '@domain/chat/entity/types'
import { useImpactReportDomain } from '@domain/impactReport/useImpactReportDomain'
import { PostEntityOptional, SocialImpactCategories, SocialImpactEntityOptional, SocialImpactEntity } from '@domain/post/entity/types'

import { useImpactReportRepository } from '@data/impactReport/useImpactReportRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { ViewSocialImpactPostScreenProps } from '@routes/Stack/ProfileStack/screenProps'
import { SocialImpactStackParamList } from '@routes/Stack/SocialImpactStack/types'
import { HomeTabParamList } from '@routes/Tabs/HomeTab/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiPostUtils } from '@utils-ui/post/UiPostUtils'
import { socialImpactCategories } from '@utils/postsCategories/socialImpactCategories'

import { Body, Container, Header, OptionsArea, UserAndValueContainer } from './styles'
import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ShareWhiteIcon from '@assets/icons/share-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenWidth } from '@common/screenDimensions'
import { share } from '@common/share'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { DateTimeCard } from '@components/_cards/DateTimeCard'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { ExhibitionPlaceCard } from '@components/_cards/ExhibitionPlace'
import { LinkCard } from '@components/_cards/LinkCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { SocialImpactTypeCard } from '@components/_cards/SocialImpactType'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { GalleryModal } from '@components/_modals/GalleryModal'
import { ImpactReportModal } from '@components/_modals/ImpactReportModal'
import { ImpactReportSuccessModal } from '@components/_modals/ImpactReportSuccessModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { HorizontalTagList } from '@components/HorizontalTagList'
import { ImageCarousel } from '@components/ImageCarousel'
import { Loader } from '@components/Loader'
import { PostPopOver } from '@components/PostPopOver'
import { SmallUserIdentification } from '@components/SmallUserIdentification'

const { localStorage } = useUserRepository()
const { remoteStorage } = usePostRepository()
const { sendImpactReport } = useImpactReportDomain()

const { convertTextToNumber, formatRelativeDate, arrayIsEmpty } = UiUtils()
const { mergeArrayPosts } = UiPostUtils()

const { mergeObjects } = useUtils()

function ViewSocialImpactPost({ route, navigation }: ViewSocialImpactPostScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { editDataContext, clearEditContext } = useContext(EditContext)

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)
	const [isCompleted, setIsCompleted] = useState(false)

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [impactReportModalIsVisible, setImpactReportModalIsVisible] = useState(false)
	const [impactReportSuccessModalIsVisible, setImpactReportSuccessModalIsVisible] = useState(false)
	const [galeryIsVisible, setGaleryIsVisible] = useState(false)

	const [postLoaded, setPostLoaded] = useState(false)
	const [postData, setPostData] = useState<SocialImpactEntity>(route.params?.postData || null)
	const [approvedPostData, setApprovedPostData] = useState<SocialImpactEntity>(route.params?.postData || null)

	useEffect(() => {
		getPost()
		return () => {
			clearEditContext()
		}
	}, [])

	const getPost = async () => {
		if (route.params.redirectedPostId) {
			const post = await remoteStorage.getPostById(route.params.redirectedPostId)
			setPostData(post as SocialImpactEntity)
			setApprovedPostData(post as SocialImpactEntity)
			setIsCompleted(!!(post && post.completed)) // TODO type post.completed
		}
		mergeUnapprovedPostData()
		setPostLoaded(true)
	}

	const mergeUnapprovedPostData = () => {
		if (canRenderUnapprovedData()) {
			const mergedPost = mergeObjects(postData, postData.unapprovedData as any)
			setPostData(mergedPost)
		}
	}

	const canRenderUnapprovedData = () => {
		return loggedUserIsOwner() && postData && postData.unapprovedData
	}

	const loggedUserIsOwner = () => {
		if (!postData || !postData.owner) return false
		return userDataContext.userId === postData.owner.userId
	}

	const isAuthor = loggedUserIsOwner()

	const renderFormatedPostDateTime = () => {
		const formatedDate = formatRelativeDate(postData.createdAt || '')
		return formatedDate
	}

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) return null
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	const markAsCompleted = async (impactValue: string) => {
		try {
			const updatedPostData = { ...postData, completed: !isCompleted }
			const mergedPosts = mergeArrayPosts(userDataContext.posts, updatedPostData)

			remoteStorage.markPostAsComplete(userDataContext.userId, postData.postId, updatedPostData, mergedPosts || [])

			setUserDataOnContext({ posts: mergedPosts })
			localStorage.saveLocalUserData({ ...userDataContext, posts: mergedPosts })

			setPostOptionsIsOpen(false)

			!isCompleted && saveImpactReport(impactValue)

			setIsCompleted(!isCompleted)
		} catch (err) {
			console.log(err)
		}
	}

	const saveImpactReport = async (impactValue: string) => {
		const numericImpactValue = convertTextToNumber(impactValue) || 0
		const usersIdInvolved = [userDataContext.userId]
		await sendImpactReport(useImpactReportRepository, usersIdInvolved, numericImpactValue, postData.postType)

		toggleImpactReportSuccessModalVisibility()
	}

	const deleteRemotePost = async () => {
		await remoteStorage.deletePost(postData.postId, postData.owner.userId)
		await remoteStorage.deletePostMedias(getPostField('picturesUrl') || [], 'pictures')

		await removePostOnContext()
		backToPreviousScreen()
	}

	const removePostOnContext = async () => {
		const currentUserPosts = userDataContext.posts || []
		const postsWithoutDeletedPost = currentUserPosts.filter((post: PostEntityOptional) => post.postId !== postData.postId)
		setUserDataOnContext({ ...userDataContext, posts: postsWithoutDeletedPost })
	}

	const backToPreviousScreen = () => {
		setPostOptionsIsOpen(false)
		navigation.goBack()
	}

	const goToEditPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('SocialImpactStack' as any, {
			screen: 'EditSocialImpactPostReview' as keyof SocialImpactStackParamList,
			params: { postData: { ...postData, ...editDataContext.saved }, approvedPostData: approvedPostData }
		})
	}

	const sharePost = () => {
		share(`Olha o que ${isAuthor ? 'estou anunciando' : 'encontrei'} no corre.\n\n${getShortText(getPostField('description'), 170)}\n\nhttps://corre.social/p/${getPostField('postId')}`)
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

		navigation.navigate('HomeTab' as any, {
			screen: 'ChatStack' as keyof HomeTabParamList
		})
		setTimeout(() => {
			navigation.navigate('ChatMessages' as any, {
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
				} as Chat
			})
		}, 50)
	}

	const reportPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage', {
			title: 'denunciar',
			contactUsType: 'denúncia',
			reportedType: postData.postType,
			reportedId: postData.postId
		})
	}

	const navigateToProfile = () => {
		if (userDataContext.userId === postData.owner.userId && !route.params.redirectedPostId) {
			return navigation.navigate('Profile')
		}
		navigation.navigate('ProfileHome' as any, { userId: postData.owner.userId })
	}

	const getCategoryLabel = () => {
		try {
			const categoryField = getPostField('category') as SocialImpactCategories
			if (Object.keys(socialImpactCategories).includes(categoryField)) {
				return socialImpactCategories[categoryField].label
			}
			return ''
		} catch (err) {
			console.log(err)
			return ''
		}
	}

	const getPostField = (fieldName: keyof SocialImpactEntityOptional, allowNull?: boolean) => {
		if (allowNull && editDataContext.saved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.saved[fieldName] || postData[fieldName]
	}

	const toggleDefaultConfirmationModalVisibility = () => {
		setPostOptionsIsOpen(false)
		setTimeout(() => setDefaultConfirmationModalIsVisible(!defaultConfirmationModalIsVisible), 400)
	}

	const toggleImpactReportModalVisibility = () => {
		setPostOptionsIsOpen(false)
		setTimeout(() => setImpactReportModalIsVisible(!impactReportModalIsVisible), 500)
	}

	const toggleImpactReportSuccessModalVisibility = () => {
		setTimeout(() => setImpactReportSuccessModalIsVisible(!impactReportSuccessModalIsVisible), 500)
	}

	const openGallery = () => setGaleryIsVisible(true)

	const closeGalery = () => setGaleryIsVisible(false)

	if (!postLoaded) {
		return (
			<Loader flex />
		)
	}

	return (
		<Container>
			<DefaultConfirmationModal
				visibility={defaultConfirmationModalIsVisible}
				title={'apagar post'}
				text={`você tem certeza que deseja apagar o post ${getShortText(getPostField('description'), 70)}?`}
				highlightedWords={[...getShortText(getPostField('description'), 70).split(' ')]}
				buttonKeyword={'apagar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={deleteRemotePost}
			/>
			<ImpactReportModal // IMPACT REPORT
				visibility={impactReportModalIsVisible}
				closeModal={toggleImpactReportModalVisibility}
				onPressButton={(impactValue?: string) => markAsCompleted(impactValue as string)}
			/>
			<ImpactReportSuccessModal // IMPACT REPORT SUCCESS
				visibility={impactReportSuccessModalIsVisible}
				closeModal={toggleImpactReportSuccessModalVisibility}
			/>
			<GalleryModal
				picturesUrl={getPostField('picturesUrl')}
				videosUrl={getPostField('videosUrl')}
				showGallery={galeryIsVisible}
				onClose={closeGalery}
			/>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={getPostField('description')}
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
					{canRenderUnapprovedData() && <ClockArrowWhiteIcon/>}
				</UserAndValueContainer>
				<VerticalSpacing />
				<OptionsArea>
					{
						!isAuthor && (
							<SmallButton
								color={theme.white3}
								SvgIcon={ShareWhiteIcon}
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								onPress={sharePost}
							/>
						)
					}
					{
						isCompleted
							? (
								<SmallButton
									label={'post foi concluído'}
									labelColor={theme.black4}
									SvgIcon={DeniedWhiteIcon}
									relativeWidth={'80%'}
									height={relativeScreenWidth(12)}
									onPress={() => { }}
								/>
							)
							: (
								<SmallButton
									color={theme.green3}
									label={isAuthor ? 'compartilhar' : 'conversar'}
									SvgIcon={isAuthor ? ShareWhiteIcon : ChatWhiteIcon}
									relativeWidth={isAuthor ? '80%' : '63%'}
									height={relativeScreenWidth(12)}
									onPress={isAuthor ? sharePost : openChat}
								/>
							)
					}
					<PostPopOver
						postTitle={getShortText(getPostField('description'), 45) || 'publicação no corre.'}
						popoverVisibility={postOptionsIsOpen}
						closePopover={() => setPostOptionsIsOpen(false)}
						isAuthor={isAuthor || false}
						isCompleted={isCompleted}
						goToComplaint={reportPost}
						markAsCompleted={!isCompleted ? toggleImpactReportModalVisibility : markAsCompleted}
						editPost={goToEditPost}
						deletePost={toggleDefaultConfirmationModalVisibility}
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
			<ScrollView showsVerticalScrollIndicator={false}	>
				<VerticalSpacing />
				<HorizontalTagList
					tags={[getCategoryLabel(), ...getPostField('tags')]}
					selectedColor={theme.pink1}
				/>
				<Body>
					<VerticalSpacing />
					<SocialImpactTypeCard
						title={'tipo de impacto'}
						macroCategory={getPostField('macroCategory')}
					/>
					<VerticalSpacing />
					<DescriptionCard
						text={getPostField('description')}
					/>
					{
						!arrayIsEmpty(getPostField('links')) && (
							<>
								<VerticalSpacing />
								<LinkCard
									links={getPostField('links')}
								/>
							</>
						)
					}
					<VerticalSpacing />
					{
						!arrayIsEmpty(getPostField('picturesUrl')) && (
							<>
								<TouchableOpacity
									activeOpacity={1}
									onPress={openGallery}
								>
									<ImageCarousel
										picturesUrl={getPostField('picturesUrl') || []}
										indicatorColor={theme.pink1}
										square
										showFullscreenIcon
									/>
								</TouchableOpacity>
							</>
						)
					}
					<ExhibitionPlaceCard
						exhibitionPlace={getPostField('exhibitionPlace')}
					/>
					<VerticalSpacing />
					<LocationViewCard
						locationView={getPostField('locationView')}
						location={getPostField('location')}
					/>
					<VerticalSpacing />
					<DateTimeCard
						weekDaysfrequency={getPostField('exhibitionFrequency')}
						daysOfWeek={getPostField('daysOfWeek', true)}
						startDate={getPostField('startDate', true)}
						endDate={getPostField('endDate', true)}
						startTime={getPostField('startHour', true)}
						endTime={getPostField('endHour', true)}
						repetition={getPostField('repeat')}
					/>
					<VerticalSpacing bottomNavigatorSpace />
				</Body>
			</ScrollView>
		</Container >
	)
}

export { ViewSocialImpactPost }
