import React, { useContext, useState } from 'react'
import { StatusBar, ScrollView, Alert, Linking } from 'react-native'

import { Body, Container, Header, LastSigh, OptionsArea, Sigh, UserAndValueContainer } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import ShareIcon from '../../../assets/icons/share.svg'
import ChatIcon from '../../../assets/icons/chat.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { arrayIsEmpty, formatRelativeDate } from '../../../common/auxiliaryFunctions'
import { deletePost } from '../../../services/firebase/post/deletePost'

import { ViewSocialImpactPostScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'
import { PostCollection } from '../../../services/firebase/types'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { ImageCarousel } from '../../../components/ImageCarousel'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PostPopOver } from '../../../components/PostPopOver'
import { AuthContext } from '../../../contexts/AuthContext'
import { share } from '../../../common/share'
import { getPrivateContacts } from '../../../services/firebase/user/getPrivateContacts'

function ViewSocialImpactPost({ route, navigation }: ViewSocialImpactPostScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)

	const loggedUserIsOwner = () => {
		if (!route.params.postData || !route.params.postData.owner) return false
		return userDataContext.userId === route.params.postData.owner.userId
	}
	const isAuthor = loggedUserIsOwner()
	const { postData } = route.params as any // TODO type

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
						label={isAuthor ? 'compartilhar' : 'fortalecer'}
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
						title={'descrição da iniciativa'}
						text={postData.description}
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
					<Sigh />
					<LocationViewCard
						title={'local da iniciativa'}
						locationView={'approximate'}
						postType={postData.postType}
						postId={route.params.postData.postId as string}
						textFontSize={16}
					/>
					<Sigh />
					<DateTimeCard
						title={'dias e horários'}
						weekDaysfrequency={'someday'}
						daysOfWeek={postData.exhibitionWeekDays}
						openingTime={postData.openingHour}
						closingTime={postData.closingHour}
						repetition={postData.socialImpactRepeat}
						textFontSize={14}
					/>
					<LastSigh />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { ViewSocialImpactPost }
