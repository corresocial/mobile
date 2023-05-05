import React, { useState, useContext, useEffect } from 'react'
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
import { share } from '../../../common/share'
import { vacancyCategories } from '../../../utils/postsCategories/vacancyCategories'

import { ViewVacancyPostScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'
import { PostCollection, VacancyCategories, VacancyCollection, VacancyCollectionRemote } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PostPopOver } from '../../../components/PostPopOver'
import { ImageCarousel } from '../../../components/ImageCarousel'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { HorizontalTagList } from '../../../components/HorizontalTagList'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { PlaceModality } from '../../../components/_cards/PlaceModalityCard'
import { VacancyTypeCard } from '../../../components/_cards/VacancyTypeCard'
import { VacancyPurposeCard } from '../../../components/_cards/VacancyPurposeCard'
import { ImportantPointsCard } from '../../../components/_cards/ImportantPointsCard'

function ViewVacancyPost({ route, navigation }: ViewVacancyPostScreenProps) {
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
		if (!route.params.postData || !route.params.postData.owner) return false
		return userDataContext.userId === route.params.postData.owner.userId
	}
	const isAuthor = loggedUserIsOwner()
	const { postData } = route.params as { postData: VacancyCollectionRemote }

	const renderFormatedPostDateTime = () => {
		const formatedDate = formatRelativeDate(postData.createdAt)
		return formatedDate
	}

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) return null
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	const deleteRemotePost = async () => {
		setIsLoading(true)
		await deletePost(postData.postId, postData.owner.userId)
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
		navigation.navigate('EditVacancyPost' as any, { postData: { ...postData, ...editDataContext.saved } })
	}

	const backToPreviousScreen = () => {
		setPostOptionsIsOpen(false)
		navigation.goBack()
	}

	const sharePost = () => {
		share(`${isAuthor ? 'tô' : 'estão'} anunciando ${getPostField('title')} no corre.\n\nhttps://corre.social`)
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
			navigation.navigate('Profile')
			return
		}
		navigation.navigate('ProfileHome' as any, { userId: postData.owner.userId })// TODO Type
	}

	const getCategoryLabel = () => {
		return vacancyCategories[getPostField('category') as VacancyCategories].label || ''
	}

	const getPostField = (fieldName: keyof VacancyCollection) => {
		return editDataContext.saved[fieldName] || postData[fieldName]
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={getPostField('title')}
				/>
				<VerticalSigh />
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
				<VerticalSigh />
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
					<SmallButton
						color={theme.green3}
						label={isAuthor ? 'compartilhar' : 'me candidatar'}
						SvgIcon={isAuthor ? ShareWhiteIcon : ChatWhiteIcon}
						relativeWidth={isAuthor ? '80%' : '63%'}
						height={relativeScreenWidth(12)}
						onPress={isAuthor ? sharePost : openChat}
					/>
					<PostPopOver
						postTitle={getPostField('title') || 'publicação no corre.'}
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
			<ScrollView showsVerticalScrollIndicator={false} >
				<VerticalSigh />
				<HorizontalTagList
					tags={[getCategoryLabel(), ...getPostField('tags')]}
					selectedTags={[getCategoryLabel(), ...getPostField('tags')]}
					selectedColor={theme.yellow1}
					onSelectTag={() => { }}
				/>
				<Body>
					<VerticalSigh />
					{
						getPostField('vacancyPurpose') && (
							<>
								<VacancyPurposeCard
									vacancyPurpose={getPostField('vacancyPurpose')}
								/>
								<VerticalSigh />
							</>
						)
					}
					<DescriptionCard
						title={'descrição da vaga'}
						text={getPostField('description')}
					/>
					<VerticalSigh />
					{!arrayIsEmpty(getPostField('picturesUrl')) && (
						<>
							<ImageCarousel
								picturesUrl={getPostField('picturesUrl') || []}
								indicatorColor={theme.yellow1}
							/>
							<VerticalSigh />
						</>
					)}
					<PlaceModality
						title={'local de trabalho'}
						hightligtedWords={['local', 'trabalho']}
						placeModality={getPostField('workplace')}
						isVacancy
					/>
					<VerticalSigh />
					<VacancyTypeCard
						vacancyType={'temporary'}
					/>
					<VerticalSigh />
					{
						(getPostField('saleValue') || getPostField('exchangeValue')) && (
							<>
								<SaleOrExchangeCard
									title={'tipo de remuneração'}
									hightligtedWords={['tipo', 'remuneração']}
									saleValue={getPostField('saleValue')}
									exchangeValue={getPostField('exchangeValue')}
									isPayment
								/>
							</>
						)
					}
					<VerticalSigh />
					<LocationViewCard
						online={getPostField('workplace') === 'homeoffice'}
						locationView={getPostField('locationView')}
						withoutMapView={!getPostField('location').coordinates}
						location={getPostField('location')}
					/>
					<VerticalSigh />
					<DateTimeCard
						weekDaysfrequency={'someday'}
						daysOfWeek={getPostField('daysOfWeek')}
						startTime={getPostField('startHour')}
						endTime={getPostField('endHour')}
						startDate={getPostField('startDate')}
						endDate={getPostField('endDate')}
					/>
					<VerticalSigh />
					{
						(!getPostField('importantPoints') || getPostField('importantPoints').length)
						&& (
							<ImportantPointsCard
								importantPoints={getPostField('importantPoints')}
							/>
						)
					}
					<VerticalSigh bottomNavigatorSpace />
				</Body>
			</ScrollView>
		</Container >
	)
}

export { ViewVacancyPost }
