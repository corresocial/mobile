import React from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import uuid from 'react-uuid'

import { useUtils } from '@newutils/useUtils'

import { SocialMedia } from '@domain/user/entity/types'

import { useAuthContext } from '@contexts/AuthContext'

import { SocialMediaManagementScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import {
	getRelativeSocialMediaIcon,
	isDefaultSocialMedia,
	mergeWithDefaultSocialMedia,
	openURL,
	socialMediaUrl
} from '@utils/socialMedias'

import { Body, Container, Header, NewLinkButtonContainer } from './styles'
import AngleRightWhitetIcon from '@assets/icons/angleRight-white.svg'
import PlusIcon from '@assets/icons/plus-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { EditCard } from '@components/_cards/EditCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const { mergeArraysByKey } = useUtils()

function SocialMediaManagement({ route, navigation }: SocialMediaManagementScreenProps) {
	const { userDataContext } = useAuthContext()

	const onPressIcon = async (socialMedia: SocialMedia, index: number) => {
		if (route.params.isAuthor) {
			if (isDefaultSocialMedia(socialMedia.title)) {
				navigation.navigate('InsertLinkValue', { socialMedia, index })
				return
			}

			navigation.navigate('InsertLinkTitle', { socialMedia: { ...socialMedia }, index })
		} else {
			await openURL(socialMedia)
		}
	}

	const getEndIcon = () => {
		if (!route.params.isAuthor) return AngleRightWhitetIcon
	}

	const renderSocialMedias = () => {
		const currentSocialMedias = route.params.isAuthor ? userDataContext.socialMedias : route.params.socialMedias

		const mergedUnapprovedLinks: SocialMedia[] = userDataContext.unapprovedData && userDataContext.unapprovedData.socialMedias && route.params.isAuthor
			? mergeArraysByKey(currentSocialMedias || [], (userDataContext.unapprovedData.socialMedias || []), 'title') as SocialMedia[]
			: currentSocialMedias || []

		const mergedSocialMedias = mergeWithDefaultSocialMedia(mergedUnapprovedLinks)

		const socialMediaToRender = !route.params.isAuthor
			? mergedSocialMedias.filter((socialMedia) => socialMedia.link && socialMediaUrl(socialMedia.title, '') !== socialMedia.link)
			: [...mergedSocialMedias]

		return socialMediaToRender.map((socialMedia, index) => {
			return (
				<View key={uuid()}>
					<EditCard
						title={socialMedia.title}
						RightIcon={getEndIcon()}
						SecondSvgIcon={getRelativeSocialMediaIcon(socialMedia.title)}
						value={`${socialMedia.link.replace(socialMediaUrl(socialMedia.title, ''), '') || ''}`}
						pressionable
						onPress={() => (!socialMedia.link ? onPressIcon(socialMedia, index) : openURL(socialMedia))}
						onEdit={() => onPressIcon(socialMedia, index)}
					/>
					<VerticalSpacing />
				</View>
			)
		}, false)
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'redes'}
				/>
			</Header>
			<Body>
				<ScrollView showsVerticalScrollIndicator={false}>
					{
						route.params.isAuthor
							? (
								<NewLinkButtonContainer>
									<SmallButton
										color={theme.colors.white[3]}
										height={relativeScreenHeight(7)}
										label={'novo link'}
										labelColor={theme.colors.black[4]}
										highlightedWords={['link']}
										SvgIcon={PlusIcon}
										onPress={() => navigation.navigate('InsertLinkTitle', { socialMedia: { title: '', link: '' } })}
									/>
								</NewLinkButtonContainer>
							)
							: <VerticalSpacing />
					}
					{renderSocialMedias()}
					<VerticalSpacing bottomNavigatorSpace />
				</ScrollView>
			</Body>
		</Container >
	)
}

export { SocialMediaManagement }
