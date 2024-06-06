import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, ScrollView, TouchableOpacity } from 'react-native'

import { Chat } from '@domain/chat/entity/types'
import { useImpactReportDomain } from '@domain/impactReport/useImpactReportDomain'
import { CultureCategories, CultureEntityOptional, CultureEntity } from '@domain/post/entity/types'

import { useImpactReportRepository } from '@data/impactReport/useImpactReportRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { LoaderContext } from '@contexts/LoaderContext'

import { CultureStackParamList } from '@routes/Stack/CultureStack/types'
import { ViewCulturePostScreenProps } from '@routes/Stack/ProfileStack/screenProps'
import { HomeTabParamList } from '@routes/Tabs/HomeTab/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiPostUtils } from '@utils-ui/post/UiPostUtils'
import { cultureCategories } from '@utils/postsCategories/cultureCategories'

import { Body, Container } from './styles'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenWidth } from '@common/screenDimensions'
import { share } from '@common/share'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { CultureTypeCard } from '@components/_cards/CultureTypeCard'
import { DateTimeCard } from '@components/_cards/DateTimeCard'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { LinkCard } from '@components/_cards/LinkCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PlaceModality } from '@components/_cards/PlaceModalityCard'
import { SaleOrExchangeCard } from '@components/_cards/SaleOrExchangeCard'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { GalleryModal } from '@components/_modals/GalleryModal'
import { ImpactReportModal } from '@components/_modals/ImpactReportModal'
import { ImpactReportSuccessModal } from '@components/_modals/ImpactReportSuccessModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { HorizontalTagList } from '@components/HorizontalTagList'
import { ImageCarousel } from '@components/ImageCarousel'
import { Loader } from '@components/Loader'
import { PostHeader } from '@components/PostHeader'
import { PostPopOver } from '@components/PostPopOver'

const { localStorage } = useUserRepository()
const { remoteStorage } = usePostRepository()
const { sendImpactReport } = useImpactReportDomain()

const { convertTextToNumber, arrayIsEmpty } = UiUtils()
const { mergeArrayPosts } = UiPostUtils()

function ViewCulturePost({ route, navigation }: ViewCulturePostScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { editDataContext, clearEditContext } = useContext(EditContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)
	const [isCompleted, setIsCompleted] = useState(false)

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [impactReportModalIsVisible, setImpactReportModalIsVisible] = useState(false)
	const [impactReportSuccessModalIsVisible, setImpactReportSuccessModalIsVisible] = useState(false)
	const [galeryIsVisible, setGaleryIsVisible] = useState(false)

	const [postLoaded, setPostLoaded] = useState(false)
	const [postData, setPostData] = useState<CultureEntity>(route.params.postData || null)

	useEffect(() => {
		getPost()
		return () => {
			clearEditContext()
		}
	}, [])

	const getPost = (async () => {
		if (route.params.redirectedPostId) {
			const post = await remoteStorage.getPostById(route.params.redirectedPostId)
			setPostData(post as CultureEntity)
			setIsCompleted(!!(post && post.completed))
		}
		setPostLoaded(true)
	})

	const loggedUserIsOwner = () => {
		if (!postData || !postData.owner) return false
		return userDataContext.userId === postData.owner.userId
	}
	const isAuthor = loggedUserIsOwner()

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) return null
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	const markAsCompleted = async (impactValue: string) => {
		try {
			const updatedPostData: CultureEntity = { ...postData, completed: !isCompleted }
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
		try {
			setLoaderIsVisible(true)

			await remoteStorage.deletePost(postData.postId, postData.owner.userId)
			await remoteStorage.deletePostMedias(getPostField('picturesUrl') || [], 'pictures')
			await removePostOnContext()

			setLoaderIsVisible(false)
			backToPreviousScreen()
		} catch (error) {
			setLoaderIsVisible(false)
		}
	}

	const removePostOnContext = async () => {
		const currentUserPosts = userDataContext.posts || []
		const postsWithoutDeletedPost = currentUserPosts.filter((post) => post.postId !== postData.postId)
		setUserDataOnContext({ ...userDataContext, posts: postsWithoutDeletedPost })
	}

	const goToEditPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('CultureStack' as any, {
			screen: 'EditCulturePostReview' as keyof CultureStackParamList,
			params: { postData: { ...postData, ...editDataContext.saved } }
		})
	}

	const backToPreviousScreen = () => {
		setPostOptionsIsOpen(false)
		navigation.goBack()
	}

	const sharePost = () => {
		share(`Olha o que ${isAuthor ? 'estou anunciando' : 'encontrei'} no corre. no corre.\n\nhttps://corre.social/p/${getPostField('postId')}`)
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
				} as Chat,
				via: 'post',
				postType: 'culture'
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
		navigation.navigate('ProfileHome' as any, { userId: postData.owner.userId })// TODO Type
	}

	const getCategoryLabel = () => {
		try {
			const categoryField = getPostField('category') as CultureCategories
			if (Object.keys(cultureCategories).includes(categoryField)) {
				return cultureCategories[categoryField].label
			}
			return ''
		} catch (err) {
			console.log(err)
			return ''
		}
	}

	const getPostField = (fieldName: keyof CultureEntityOptional, allowNull?: boolean) => {
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
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostHeader
				title={getPostField('description')}
				isAuthor={isAuthor}
				isCompleted={isCompleted}
				owner={postData.owner}
				createdAt={getPostField('createdAt')}
				navigateToProfile={navigateToProfile}
				highlightedButtonAction={openChat}
				sharePost={sharePost}
			>
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
			</PostHeader>

			<ScrollView showsVerticalScrollIndicator={false} >
				<VerticalSpacing />
				<HorizontalTagList
					tags={[getCategoryLabel(), ...getPostField('tags')]}
					selectedColor={theme.blue1}
				/>
				<Body>
					<VerticalSpacing />
					<CultureTypeCard
						title={'tipo de cultura'}
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
										indicatorColor={theme.blue1}
										square
										showFullscreenIcon
									/>
								</TouchableOpacity>

							</>
						)
					}
					{
						getPostField('eventPlaceModality') && (
							<>
								<PlaceModality
									title={'como participar'}
									hightligtedWords={['participar']}
									placeModality={getPostField('eventPlaceModality')}
								/>
								<VerticalSpacing />
							</>
						)
					}
					{
						getPostField('entryValue', true) && (
							<>
								<SaleOrExchangeCard
									title={'custo de entrada'}
									hightligtedWords={['custo', 'entrada']}
									saleValue={getPostField('entryValue', true)}
									isCulturePost
								/>
								<VerticalSpacing />
							</>
						)
					}
					<LocationViewCard
						online={getPostField('eventPlaceModality') === 'online'}
						locationView={getPostField('locationView')}
						location={getPostField('location')}
					/>
					<VerticalSpacing />
					<DateTimeCard
						weekDaysfrequency={getPostField('exhibitionFrequency')}
						daysOfWeek={getPostField('daysOfWeek', true)}
						repetition={getPostField('repeat', true)}
						startDate={getPostField('startDate', true)}
						endDate={getPostField('endDate', true)}
						startTime={getPostField('startHour', true)}
						endTime={getPostField('endHour')}
					/>
					<VerticalSpacing bottomNavigatorSpace />
				</Body>
			</ScrollView>
		</Container >
	)
}

export { ViewCulturePost }
