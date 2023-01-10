import React, { useState, useContext } from 'react'
import { StatusBar, ScrollView, Alert, Linking } from 'react-native'

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

import { ViewVacancyPostScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'
import { PostCollection } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PostPopOver } from '../../../components/PostPopOver'
import { deletePost } from '../../../services/firebase/post/deletePost'
import { getPrivateContacts } from '../../../services/firebase/user/getPrivateContacts'
import { share } from '../../../common/share'

function ViewVacancyPost({ route, navigation }: ViewVacancyPostScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)

	const loggedUserIsOwner = () => {
		if (!route.params.postData || !route.params.postData.owner) return false
		return userDataContext.userId === route.params.postData.owner.userId
	}
	const isAuthor = loggedUserIsOwner()
	const { postData } = route.params as any // TODO type

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
		switch (postData.vacancyType) {
			case 'beak': return 'bico'
			case 'temporary': return 'temporária'
			case 'professional': return 'profissional'
			default: return '---'
		}
	}

	const getRelativeWorkPlace = () => {
		switch (postData.workplace) {
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
		await deletePost(postData.postId, postData.postType, postData.owner.userId)
		await removePostOnContext()
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

	const navigateToProfile = () => {
		if (userDataContext.userId === postData.owner.userId) {
			navigation.navigate('Profile' as any, { userId: postData.owner.userId })// TODO Type
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
						label={isAuthor ? 'compartilhar' : 'me candidatar'}
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
						goToComplaint={() => Alert.alert('go to complaint')}
						editPost={() => Alert.alert('edit post')}
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
						text={postData.description}
						textFontSize={14}
					>
						{getVacancyDetails()}
					</DescriptionCard>
					<Sigh />
					<DateTimeCard
						title={'dias e horários'}
						weekDaysfrequency={'someday'}
						daysOfWeek={postData.workWeekdays}
						openingTime={postData.startWorkHour}
						closingTime={postData.endWorkHour}
						startDate={postData.startWorkDate}
						endDate={postData.endWorkDate}
						textFontSize={14}
					/>
					{
						postData.workplace !== 'homeoffice' && (
							<>
								<Sigh />
								<LocationViewCard
									title={'local de trabalho'}
									locationView={'public'}
									postType={postData.postType}
									postId={route.params.postData.postId as string}
									textFontSize={16}
								/>
							</>
						)
					}
					<Sigh />
					<DescriptionCard
						title={'sobre a empresa'}
						text={postData.companyDescription}
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
