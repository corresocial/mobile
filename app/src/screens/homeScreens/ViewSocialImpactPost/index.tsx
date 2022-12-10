import React, { useEffect, useState } from 'react'
import { StatusBar, ScrollView, Alert } from 'react-native'

import { Body, Container, Header, LastSigh, OptionsArea, Sigh, UserAndValueContainer } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight } from '../../../common/screenDimensions'
import ShareIcon from '../../../assets/icons/share.svg'
import ChatIcon from '../../../assets/icons/chat.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { arrayIsEmpty, formatRelativeDate } from '../../../common/auxiliaryFunctions'

import { ViewSocialImpactPostScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SocialImpactCollectionRemote } from '../../../services/firebase/types'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { ImageCarousel } from '../../../components/ImageCarousel'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PostPopOver } from '../../../components/PostPopOver'

function ViewSocialImpactPost({ route, navigation }: ViewSocialImpactPostScreenProps) {
	const [postData, setPostData] = useState({} as SocialImpactCollectionRemote)
	const [profileOptionsIsOpen, setPostOptionsIsOpen] = useState(false)

	useEffect(() => {
		setPostDataFromRoute()
	}, [])

	const setPostDataFromRoute = async () => {
		const postDataFromRoute = { ...route.params.postData }
		setPostData(postDataFromRoute as any) // TODO any
		return true
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

	return (
		<Container>
			<StatusBar backgroundColor={profileOptionsIsOpen ? 'rgba(0,0,0,0.5)' : theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={postData.title}
				/>
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
				<OptionsArea>
					{
						!route.params.isAuthor && (
							<SmallButton
								color={theme.white3}
								fontSize={14}
								SvgIcon={ShareIcon}
								relativeWidth={screenHeight * 0.05}
								height={screenHeight * 0.05}
								onPress={() => { }}
							/>
						)
					}
					<SmallButton
						color={theme.green2}
						label={route.params.isAuthor ? 'compartilhar' : 'fortalecer'}
						fontSize={14}
						SvgIcon={route.params.isAuthor ? ShareIcon : ChatIcon}
						relativeWidth={route.params.isAuthor ? '80%' : '63%'}
						height={screenHeight * 0.05}
						onPress={() => { }}
					/>
					<PostPopOver
						postTitle={postData.title || 'publicação no corre.'}
						postId={postData.postId}
						postType={postData.postType}
						popoverVisibility={profileOptionsIsOpen}
						closePopover={() => setPostOptionsIsOpen(false)}
						isAuthor={route.params.isAuthor || false}
						goToComplaint={() => Alert.alert('go to complaint')}
						editPost={() => Alert.alert('edit post')}
						deletePost={() => Alert.alert('delete post')}
					>
						<SmallButton
							color={theme.white3}
							SvgIcon={ThreeDotsIcon}
							relativeWidth={screenHeight * 0.05}
							height={screenHeight * 0.05}
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
