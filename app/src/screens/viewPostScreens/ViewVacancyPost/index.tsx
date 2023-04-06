import React, { useState, useContext, useEffect } from 'react'
import { StatusBar, ScrollView } from 'react-native'

import {
	Body,
	Container,
	Header,
	LastSigh,
	OptionsArea,
	Sigh,
	UserAndValueContainer,
	VacancyDetails,
	VacancyDetailsItem
} from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import ShareIcon from '../../../assets/icons/share.svg'
import ChatIcon from '../../../assets/icons/chat.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { arrayIsEmpty, formatRelativeDate, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { deletePost } from '../../../services/firebase/post/deletePost'
import { share } from '../../../common/share'

import { ViewVacancyPostScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'
import { PostCollection, VacancyCollection, VacancyCollectionRemote } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PostPopOver } from '../../../components/PostPopOver'

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

	const getVacancyDetails = () => {
		const vacancyType = getRelativeVacancyType()
		const workplace = getRelativeWorkPlace()

		return (
			<VacancyDetails>
				<VacancyDetailsItem>
					{showMessageWithHighlight(`●  vaga ${vacancyType}`, [vacancyType])}
				</VacancyDetailsItem>
				<VacancyDetailsItem>
					{showMessageWithHighlight(`●  vaga ${workplace}`, [workplace])}
				</VacancyDetailsItem>
			</VacancyDetails>
		)
	}

	const getRelativeVacancyType = () => {
		switch (getPostField('vacancyType')) {
			case 'beak': return 'bico'
			case 'temporary': return 'temporária'
			case 'professional': return 'profissional'
			default: return '---'
		}
	}

	const getRelativeWorkPlace = () => {
		switch (getPostField('workplace')) {
			case 'homeoffice': return 'home-office'
			case 'presential': return 'presencial'
			case 'hybrid': return 'híbrida'
			default: return '---'
		}
	}

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
				</UserAndValueContainer>
				<Sigh />
				<OptionsArea>
					{
						!isAuthor && (
							<SmallButton
								color={theme.white3}
								SvgIcon={ShareIcon}
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								onPress={sharePost}
							/>
						)
					}
					<SmallButton
						color={theme.green2}
						label={isAuthor ? 'compartilhar' : 'me candidatar'}
						fontSize={13}
						SvgIcon={isAuthor ? ShareIcon : ChatIcon}
						relativeWidth={isAuthor ? '80%' : '63%'}
						height={relativeScreenWidth(12)}
						onPress={isAuthor ? sharePost : openChat}
					/>
					<PostPopOver
						postTitle={getPostField('title') || 'publicação no corre.'}
						postId={getPostField('postId')}
						postType={getPostField('postType')}
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
						title={'descrição da vaga'}
						text={getPostField('description')}
						textFontSize={14}
					>
						{getVacancyDetails()}
					</DescriptionCard>
					<Sigh />
					<DateTimeCard
						title={'dias e horários'}
						weekDaysfrequency={'someday'}
						daysOfWeek={getPostField('vacancyType') === 'professional' ? getPostField('workWeekdays') : []}
						openingTime={getPostField('startWorkHour')}
						closingTime={getPostField('endWorkHour')}
						startDate={getPostField('startWorkDate')}
						endDate={getPostField('endWorkDate')}
						textFontSize={14}
					/>
					{
						getPostField('workplace') !== 'homeoffice' && (
							<>
								<Sigh />
								<LocationViewCard
									title={'local de trabalho'}
									locationView={'public'}
									withoutMapView={!getPostField('location').coordinates}
									isAuthor={isAuthor}
									location={getPostField('location')}
									textFontSize={16}
								/>
							</>
						)
					}
					<Sigh />
					<DescriptionCard
						title={'sobre a empresa'}
						text={getPostField('companyDescription')}
						textFontSize={14}
						company
					/>
					<LastSigh />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { ViewVacancyPost }
