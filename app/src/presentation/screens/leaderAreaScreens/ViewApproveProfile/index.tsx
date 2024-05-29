import React, { useEffect, useState, useContext } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Id, PostRange } from '@domain/post/entity/types'
import { UserEntity, UserEntityOptional, VerifiedLabelName } from '@domain/user/entity/types'

import { useUserRepository } from '@data/user/useUserRepository'

import { AlertContext } from '@contexts/AlertContext/index'
import { useAuthContext } from '@contexts/AuthContext'
import { StripeContext } from '@contexts/StripeContext'

import { ProfileTabScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { setFreeTrialPlans } from '@services/stripe/scripts/setFreeTrialPlans'

import {
	Body,
	Container,
	InfoArea,
	OptionsArea,
	ProfileHeader,
	ProfileInfoContainer,
	UserDescription,
	UserName,
	ExpandedUserDescription,
	ExpandedUserDescriptionArea,
	VerticalPaddingContainer,
	SeeMoreLabel,
} from './styles'
import GearAlertWhiteIcon from '@assets/icons/gear-alert-white.svg'
import GearWhiteIcon from '@assets/icons/gear-white.svg'
import ThreeDotsIcon from '@assets/icons/threeDots.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { PhotoPortrait } from '@components/PhotoPortrait'
import { PopOver } from '@components/PopOver'
import { VerifiedUserBadge } from '@components/VerifiedUserBadge'

const { remoteStorage } = useUserRepository()

export function ViewApproveProfile({ route, navigation }: ProfileTabScreenProps) {
	const { notificationState } = useContext(AlertContext)
	const { userDataContext } = useAuthContext()
	const { createCustomer, createSubscription, stripeProductsPlans } = useContext(StripeContext)

	const [isLoggedUser, setIsLoggedUser] = useState(false)
	const [userDescriptionIsExpanded, setUserDescriptionIsExpanded] = useState(false)
	const [hostDescriptionIsExpanded, setHostDescriptionIsExpanded] = useState(false)

	const [user, setUser] = useState<UserEntityOptional>({})
	const [profileOptionsIsOpen, setProfileOptionsIsOpen] = useState(false)

	useEffect(() => {
		if (route.params && route.params.userId) {
			setIsLoggedUser(false)
			loadRemoteProfileData(route.params.userId)
		} else {
			setIsLoggedUser(true)
		}
	}, [])

	const loadRemoteProfileData = async (userId: string) => {
		try {
			const userData = await remoteStorage.getUserData(userId)
			const { profilePictureUrl, name, posts, description, verified, socialMedias, subscription } = userData as UserEntityOptional
			setUser({ userId, name, socialMedias, description, profilePictureUrl: profilePictureUrl || [], verified, subscription, posts })
		} catch (error) {
			console.log(error)
		}
	}

	const openProfileOptions = () => {
		setProfileOptionsIsOpen(true)
	}

	const reportUser = () => {
		setProfileOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage', {
			title: 'denunciar',
			contactUsType: 'denúncia',
			reportedId: getUserField('userId') as Id,
			reportedType: 'user',
		})
	}

	const navigationToBack = () => navigation.goBack()

	type UserDataFields = keyof UserEntity
	const getUserField = (fieldName?: UserDataFields) => {
		if (route.params && route.params.userId) {
			if (!fieldName) return user
			return user[fieldName]
		}
		if (!fieldName) return userDataContext
		return userDataContext[fieldName]
	}

	const getProfilePicture = () => {
		if (route.params && route.params.userId) return user.profilePictureUrl ? user.profilePictureUrl[0] : ''
		return userDataContext.profilePictureUrl
			? userDataContext.profilePictureUrl[0]
			: ''
	}

	const verifyUserProfile = async (label: VerifiedLabelName) => {
		setProfileOptionsIsOpen(false)
		if (user.userId && userDataContext.userId) {
			const verifiedObject = {
				verified: {
					type: label,
					by: userDataContext.userId,
					at: new Date(),
					name: userDataContext.name || ''
				}
			}

			await remoteStorage.updateUserData(user.userId, verifiedObject)
			user.userId && await loadRemoteProfileData(user.userId)
		}
	}

	const setFreeTrialToProfile = async (plan: PostRange) => {
		if (!user.userId) return
		const priceId = plan === 'country' ? stripeProductsPlans.countryMonthly.priceId : stripeProductsPlans.cityMonthly.priceId

		await setFreeTrialPlans(
			[user.userId || ''], // array of userIds
			createCustomer, // from StripeContext
			createSubscription, // from StripeContext
			plan, // range
			'monthly', // plan
			priceId,
			() => loadRemoteProfileData(user.userId || '')
		)
		// user.userId && await loadRemoteProfileData(user.userId)
	}

	const hasAnyVerifiedUser = () => {
		return ((userDataContext && userDataContext.verified && isLoggedUser) || (user && user.verified))
	}

	const getVerifiedUserType = () => {
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
				user.verified
				&& user.verified.type === verifiedLabel
			)
		)
	}

	const userIsAdmin = () => {
		return (
			userDataContext.verified && userDataContext.verified.admin && (
				(user.subscription && user.subscription.subscriptionRange === 'near') || !user.subscription)
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

	const getConfigurationIcon = () => {
		if (isLoggedUser) {
			if (hasConfigNotification()) return GearAlertWhiteIcon
			return GearWhiteIcon
		}
		return ThreeDotsIcon
	}

	const hasConfigNotification = () => (notificationState.configNotificationButton || notificationState.configNotificationEntryMethod)

	const getShortDescription = () => {
		const userDescription = getUserField('description') as string || ''
		return getShortText(userDescription, 160)
	}

	const descriptionIsLarge = () => {
		const description = getUserField('description') as string || ''
		return description.length > 160
	}

	return (
		<ScreenContainer >
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
							{
								!isLoggedUser && (
									<>
										<BackButton
											onPress={navigationToBack}
											withoutRightSpacing={false}
										/>
										<HorizontalSpacing width={relativeScreenWidth(3)} />
									</>
								)
							}
							<PhotoPortrait
								height={isLoggedUser ? RFValue(95) : RFValue(65)}
								width={isLoggedUser ? RFValue(100) : RFValue(70)}
								borderWidth={3}
								borderRightWidth={8}
								pictureUri={getProfilePicture()}
							/>
							<InfoArea>
								<UserName numberOfLines={3}>
									{getUserField('name') as string}
								</UserName>
								{renderUserVerifiedType()}
								{
									!userDescriptionIsExpanded && isLoggedUser && (
										<TouchableOpacity
											onPress={() => getUserField('description')
																	&& setUserDescriptionIsExpanded(true)}
										>
											<UserDescription numberOfLines={3}>
												{getUserField('description') as string || 'você pode adicionar uma descrição em "editar".'}
											</UserDescription>
										</TouchableOpacity>
									)
								}
							</InfoArea>
						</ProfileInfoContainer>
						{
							(userDescriptionIsExpanded || !isLoggedUser)
												&& getUserField('description')
												&& (
													<ExpandedUserDescriptionArea>
														<ScrollView showsVerticalScrollIndicator={false}	>
															<TouchableOpacity
																activeOpacity={0.9}
																onPress={() => (isLoggedUser ? setUserDescriptionIsExpanded(false) : setHostDescriptionIsExpanded(!hostDescriptionIsExpanded))}
															>
																<ExpandedUserDescription numberOfLines={hostDescriptionIsExpanded ? 0 : 7} >
																	{`${hostDescriptionIsExpanded || userDescriptionIsExpanded ? getUserField('description') : getShortDescription()}`}
																	<SeeMoreLabel>
																		{hostDescriptionIsExpanded || userDescriptionIsExpanded ? '  mostrar menos' : descriptionIsLarge() && '  ...mostrar mais'}
																	</SeeMoreLabel>
																</ExpandedUserDescription>
															</TouchableOpacity>
														</ScrollView>
													</ExpandedUserDescriptionArea>
												)
						}
						<OptionsArea>
							<PopOver
								title={getUserField('name') as string}
								isAdmin={userIsAdmin()}
								buttonLabel={'denunciar perfil'}
								popoverVisibility={profileOptionsIsOpen}
								closePopover={() => setProfileOptionsIsOpen(false)}
								reportUser={reportUser}
								onPressVerify={verifyUserProfile}
								setFreeTrialToProfile={setFreeTrialToProfile}
							>
								<SmallButton
									color={theme.white3}
									SvgIcon={getConfigurationIcon()}
									relativeWidth={relativeScreenWidth(12)}
									svgScale={hasConfigNotification() && isLoggedUser ? ['100%', '100%'] : ['50%', '80%']}
									height={relativeScreenWidth(12)}
									onPress={openProfileOptions}
								/>
							</PopOver>
						</OptionsArea>
					</ProfileHeader>
				</DefaultHeaderContainer>
				<Body >

				</Body>
			</Container >
		</ScreenContainer>
	)
}
