import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, ScrollView, TouchableOpacity } from 'react-native'

import { ReportContext } from '@domain/entities/impactReport/types'

import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { ViewCulturePostScreenProps } from '@routes/Stack/ProfileStack/stackScreenProps'
import { CultureCategories, CultureCollection, CultureCollectionRemote, Id, PostCollection } from '@services/firebase/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiPostUtils } from '@utils-ui/post/UiPostUtils'
import { cultureCategories } from '@utils/postsCategories/cultureCategories'

import {
	Body,
	Container,
	Header,
	OptionsArea,
	UserAndValueContainer
} from './styles'
import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ShareWhiteIcon from '@assets/icons/share-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenWidth } from '@common/screenDimensions'
import { share } from '@common/share'
import { theme } from '@common/theme'

import { ImpactReportAdapter } from '@adapters/impactReport/ImpactReportAdapter'

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
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { HorizontalTagList } from '@components/HorizontalTagList'
import { ImageCarousel } from '@components/ImageCarousel'
import { PostPopOver } from '@components/PostPopOver'
import { SmallUserIdentification } from '@components/SmallUserIdentification'

const { localStorage } = useUserRepository()
const { remoteStorage } = usePostRepository()
const { sendImpactReport } = ImpactReportAdapter()

const { convertTextToNumber, formatRelativeDate, arrayIsEmpty } = UiUtils()
const { mergeArrayPosts } = UiPostUtils()

function ViewCulturePost({ route, navigation }: ViewCulturePostScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { editDataContext, clearEditContext } = useContext(EditContext)

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isCompleted, setIsCompleted] = useState(route.params.postData.completed || false)

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [impactReportModalIsVisible, setImpactReportModalIsVisible] = useState(false)
	const [impactReportSuccessModalIsVisible, setImpactReportSuccessModalIsVisible] = useState(false)
	const [galeryIsVisible, setGaleryIsVisible] = useState(false)

	useEffect(() => {
		return () => {
			clearEditContext()
		}
	}, [])

	const loggedUserIsOwner = () => {
		if (!route.params.postData || !route.params.postData.owner) return false
		return userDataContext.userId === route.params.postData.owner.userId
	}
	const isAuthor = loggedUserIsOwner()
	const { postData } = route.params as { postData: CultureCollectionRemote }

	const renderFormatedPostDateTime = () => {
		const formatedDate = formatRelativeDate(postData.createdAt)
		return formatedDate
	}

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) return null
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	const markAsCompleted = async (hadImpact: boolean, impactValue: string) => {
		try {
			const updatedPostData = { ...postData, completed: !isCompleted }
			const mergedPosts = mergeArrayPosts(userDataContext.posts, updatedPostData)

			remoteStorage.markPostAsComplete(userDataContext.userId as string, postData.postId, updatedPostData, mergedPosts || [])

			setUserDataOnContext({ posts: mergedPosts })
			localStorage.saveLocalUserData({ ...userDataContext, posts: mergedPosts })

			setPostOptionsIsOpen(false)

			!isCompleted && saveImpactReport(hadImpact, impactValue)

			setIsCompleted(!isCompleted)
		} catch (err) {
			console.log(err)
		}
	}

	const saveImpactReport = async (hadImpact: boolean, impactValue: string) => {
		const numericImpactValue = convertTextToNumber(impactValue) || 0
		const usersIdInvolved = [userDataContext.userId as Id]
		await sendImpactReport(usersIdInvolved, hadImpact, numericImpactValue, postData.postType as ReportContext)

		toggleImpactReportSuccessModalVisibility()
	}

	const deleteRemotePost = async () => {
		setIsLoading(true)
		await remoteStorage.deletePost(postData.postId, postData.owner.userId)
		await remoteStorage.deletePostPictures(getPostField('picturesUrl') || [])
		await removePostOnContext()
		setIsLoading(false)
		backToPreviousScreen()
	}

	const removePostOnContext = async () => {
		const currentUserPosts = userDataContext.posts || []
		const postsWithoutDeletedPost = currentUserPosts.filter((post: PostCollection) => post.postId !== postData.postId)
		setUserDataOnContext({ ...userDataContext, posts: postsWithoutDeletedPost })
	}

	const goToEditPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('EditCulturePost', { postData: { ...postData, ...editDataContext.saved } })
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
			reportedId: postData.postId
		})
	}

	const navigateToProfile = () => {
		if (userDataContext.userId === postData.owner.userId) {
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

	const getPostField = (fieldName: keyof CultureCollection, allowNull?: boolean) => {
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
				onPressButton={(impactValue?: string) => markAsCompleted(true, impactValue as string)}
			/>
			<ImpactReportSuccessModal // IMPACT REPORT SUCCESS
				visibility={impactReportSuccessModalIsVisible}
				closeModal={toggleImpactReportSuccessModalVisibility}
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
				</UserAndValueContainer>
				<VerticalSpacing />
				<OptionsArea>
					{
						!isAuthor && (
							<SmallButton
								color={theme.white3}
								SvgIcon={ShareWhiteIcon}
								relativeWidth={relativeScreenWidth(11)}
								height={relativeScreenWidth(11)}
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
									label={isAuthor ? 'compartilhar' : 'comprar'}
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
						isLoading={isLoading}
						isCompleted={isCompleted}
						goToComplaint={reportPost}
						markAsCompleted={!isCompleted ? toggleImpactReportModalVisibility : markAsCompleted as any} // TODO Type
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
