import React, { useState } from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Chat } from '@domain/chat/entity/types'
import { useChatDomain } from '@domain/chat/useChatDomain'
import { CompleteUser, SocialMedia, UserOwner, VerifiedLabelName } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

import { useAuthContext } from '@contexts/AuthContext'
import { useLeaderAreaContext } from '@contexts/LeaderAreaContext'
import { useLoaderContext } from '@contexts/LoaderContext'

import { ViewUnapprovedProfileScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'

import { getRelativeSocialMediaIcon } from '@utils/socialMedias'

import {
	Body,
	Container,
	InfoArea,
	OptionsArea,
	ProfileHeader,
	ProfileInfoContainer,
	UserName,
	VerticalPaddingContainer
} from './styles'
import AngleRightWhiteIcon from '@assets/icons/angleRight-white.svg'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { EditCard } from '@components/_cards/EditCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { GalleryModal } from '@components/_modals/GalleryModal'
import { RejectConfirmationModal } from '@components/_modals/RejectConfirmationModal'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { ImageCarousel } from '@components/ImageCarousel'
import { PhotoPortrait } from '@components/PhotoPortrait'
import { PopOver } from '@components/PopOver'
import { VerifiedUserBadge } from '@components/VerifiedUserBadge'

const { approveProfile, rejectProfile } = useUserDomain()
const {
	existsOnDatabase,
	registerNewChat,
	setChatIdForUsers,
	generateNewMessageObject,
	sendMessage,
} = useChatDomain()

export function ViewUnapprovedProfile({ route, navigation }: ViewUnapprovedProfileScreenProps) {
	const { setLoaderIsVisible } = useLoaderContext()
	const { userDataContext } = useAuthContext()
	const { removeFromUnapprovedProfileList } = useLeaderAreaContext()

	const [profileOptionsIsOpen, setProfileOptionsIsOpen] = useState(false)
	const [approveConfirmationModalIsVisible, setApproveConfirmationModalIsVisible] = useState(false)
	const [rejectConfirmationModalIsVisible, setRejectConfirmationModalIsVisible] = useState(false)
	const [galeryIsVisible, setGaleryIsVisible] = useState(false)

	const { profileData } = route.params
	const isLoggedUser = userDataContext.userId === profileData.userId

	const toggleApproveConfirmationModalVisibility = () => {
		setProfileOptionsIsOpen(false)
		setTimeout(() => setApproveConfirmationModalIsVisible(!approveConfirmationModalIsVisible), 400)
	}

	const toggleRejectConfirmationModalVisibility = () => {
		setProfileOptionsIsOpen(false)
		setTimeout(() => setRejectConfirmationModalIsVisible(!rejectConfirmationModalIsVisible), 400)
	}

	const handleApproveProfileButton = () => {
		toggleApproveConfirmationModalVisibility()
	}

	const handleRejectProfileButton = () => {
		toggleRejectConfirmationModalVisibility()
	}

	const rejectUserProfile = async (rejectMessage?: string) => {
		sendRejectMessageToChat(rejectMessage)
		try {
			setLoaderIsVisible(true)
			const rejectedProfile = await rejectProfile(useUserRepository, profileData)
			removeFromUnapprovedProfileList(rejectedProfile!)
			sendRejectMessageToChat(rejectMessage)
			setLoaderIsVisible(false)
			navigationBackwards()
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
		}
	}

	const approveUserProfile = async () => {
		try {
			setLoaderIsVisible(true)
			const approvedProfile = await approveProfile(useUserRepository, profileData)
			removeFromUnapprovedProfileList(approvedProfile!)
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
			const recipientUser: UserOwner = {
				name: profileData.name,
				userId: profileData.userId,
				profilePictureUrl: profileData.profilePictureUrl || []
			}

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

			const textMessage = `As alterações que realizou no seu perfil foram rejeitadas por não estar de acordo com nossos termos de uso\n${rejectMessage ? `MOTIVO: ${rejectMessage}` : ''}`
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

	const reportUser = () => {
		console.log('report')
		setProfileOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage' as any, {
			title: 'denunciar',
			contactUsType: 'denúncia',
			reportedId: getUserField('userId'),
			reportedType: 'user',
		})
	}

	type UserDataFields = keyof CompleteUser
	const getUserField = (fieldName: UserDataFields): any => {
		return (profileData.unapprovedData as any)[fieldName] || '' // (profileData as any)[fieldName]
	}

	const getProfilePicture = () => {
		return profileData.profilePictureUrl ? profileData.profilePictureUrl[0] : ''
	}

	const hasAnyVerifiedUser = () => {
		return ((userDataContext && userDataContext.verified && isLoggedUser) || (profileData && profileData.verified))
	}

	const getVerifiedUserType = () => { // REFACTOR UI Utils
		if (verifiedUserTypeIs('default')) return 'default'
		if (verifiedUserTypeIs('impact')) return 'impact'
		if (verifiedUserTypeIs('leader')) return 'leader'
		if (verifiedUserTypeIs('government')) return 'government'
		return ''
	}

	const verifiedUserTypeIs = (verifiedLabel: VerifiedLabelName) => {
		return (
			(
				userDataContext.verified
				&& userDataContext.verified.type === verifiedLabel
				&& isLoggedUser
			)
			|| (
				profileData.verified
				&& profileData.verified.type === verifiedLabel
			)
		)
	}

	const renderUserVerifiedType = () => {
		if (!hasAnyVerifiedUser()) return

		const verifiedLabel = getVerifiedUserType()
		if (!verifiedLabel) return

		return (
			<VerticalPaddingContainer>
				<ProfileInfoContainer>
					<VerifiedUserBadge verifiedLabel={verifiedLabel} />
				</ProfileInfoContainer>
			</VerticalPaddingContainer>
		)
	}

	const navigationBackwards = () => navigation.goBack()

	const openGallery = () => setGaleryIsVisible(true)

	const closeGalery = () => setGaleryIsVisible(false)

	const renderSocialMedias = () => {
		return getUserField('socialMedias').map((socialMedia: SocialMedia) => {
			return (
				<EditCard
					key={socialMedia.link}
					title={socialMedia.title}
					value={socialMedia.link}
					SecondSvgIcon={getRelativeSocialMediaIcon(socialMedia.title)}
					RightIcon={() => <AngleRightWhiteIcon height={relativeScreenDensity(20)} width={relativeScreenDensity(20)}/>}
					pressionable
					onPress={() => openLink(socialMedia.link)}
					onEdit={() => openLink(socialMedia.link)}
				/>
			)
		})
	}

	const openLink = async (link: string) => {
		try {
			const supportedLink = await Linking.canOpenURL(link)
			if (!supportedLink) {
				throw new Error('Link inválido')
			}

			if (link.includes('http')) {
				return await Linking.openURL(link)
			}

			await Linking.openURL(`http://${link}`)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	return (
		<ScreenContainer infinityBottom>
			<DefaultConfirmationModal // APROVAR
				overlayColor={'success'}
				visibility={approveConfirmationModalIsVisible}
				title={'aprovar'}
				text={'você tem certeza que deseja aprovar esse perfil?'}
				highlightedWords={['aprovar']}
				buttonKeyword={'aprovar'}
				closeModal={toggleApproveConfirmationModalVisibility}
				onPressButton={approveUserProfile}
			/>
			<RejectConfirmationModal // REJEITAR
				visibility={rejectConfirmationModalIsVisible}
				closeModal={toggleRejectConfirmationModalVisibility}
				onPressButton={rejectUserProfile}
			/>
			<Container >
				<DefaultHeaderContainer
					backgroundColor={theme.white3}
					centralized={false}
					grow
					withoutIOSPadding
					borderBottomWidth={0}
				>
					<ProfileHeader>
						<ProfileInfoContainer>
							<BackButton onPress={navigationBackwards}/>
							<HorizontalSpacing width={relativeScreenWidth(3)} />
							<PhotoPortrait
								height={RFValue(65)}
								width={RFValue(70)}
								borderWidth={3}
								borderRightWidth={8}
								pictureUri={getProfilePicture()}
							/>
							<InfoArea>
								<UserName numberOfLines={3}>
									{getUserField('name') as string}
								</UserName>
								{renderUserVerifiedType()}
							</InfoArea>
						</ProfileInfoContainer>
						<VerticalSpacing/>
						<OptionsArea>
							<SmallButton
								label={'rejeitar'}
								color={theme.red3}
								SvgIcon={DeniedWhiteIcon}
								relativeWidth={'40%'}
								height={relativeScreenWidth(12)}
								onPress={handleRejectProfileButton}
							/>
							<SmallButton
								label={'aprovar'}
								color={theme.green3}
								SvgIcon={CheckWhiteIcon}
								relativeWidth={'40%'}
								height={relativeScreenWidth(12)}
								onPress={handleApproveProfileButton}
							/>
							<PopOver
								popoverVisibility={profileOptionsIsOpen}
								buttonLabel={'denunciar'}
								title={'' || 'usuário do corre.'}
								closePopover={() => setProfileOptionsIsOpen(false)}
								reportUser={reportUser}
							>
								<SmallButton
									SvgIcon={ThreeDotsWhiteIcon}
									relativeWidth={relativeScreenWidth(12)}
									height={relativeScreenWidth(12)}
									onPress={() => setProfileOptionsIsOpen(true)}
								/>
							</PopOver>
						</OptionsArea>
					</ProfileHeader>
				</DefaultHeaderContainer>
				<Body
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ width: relativeScreenWidth(95), gap: relativeScreenDensity(9) }}
				>
					<VerticalSpacing />
					{
						getUserField('name') && (
							<DescriptionCard
								title={'nome'}
								hightligtedWords={['nome']}
								text={getUserField('name')}
							/>
						)
					}
					{
						getUserField('description') && (
							<DescriptionCard
								title={'descrição'}
								hightligtedWords={['descrição']}
								text={getUserField('description')}
							/>
						)
					}
					{
						getUserField('socialMedias')
						&& getUserField('socialMedias').length
						&& renderSocialMedias()
					}
					{
						getUserField('profilePictureUrl')
							? (
								<>
									<GalleryModal
										picturesUrl={getUserField('profilePictureUrl')}
										videosUrl={[]}
										showGallery={galeryIsVisible}
										onClose={closeGalery}
									/>
									<TouchableOpacity
										activeOpacity={1}
										onPress={openGallery}
									>
										<ImageCarousel
											picturesUrl={getUserField('profilePictureUrl') || []}
											indicatorColor={theme.blue1}
											square
											showFullscreenIcon
										/>
									</TouchableOpacity>
								</>
							)
							: <></>
					}
					<VerticalSpacing bottomNavigatorSpace/>
				</Body>
			</Container >
		</ScreenContainer>
	)
}
