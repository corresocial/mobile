import React from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import uuid from 'react-uuid'

import { Body, Container, Header, NewLinkButtonContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import PlusIcon from '../../../assets/icons/plus.svg'
import AngleRightIcon from '../../../assets/icons/angleRight.svg'

import { SocialMediaManagementScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { SocialMedia } from '../../../services/firebase/types'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { EditCard } from '../../../components/_cards/EditCard'
import {
	getRelativeSocialMediaIcon,
	isDefaultSocialMedia,
	mergeWithDefaultSocialMedia,
	openURL,
	socialMediaUrl,
	sortSocialMedias
} from '../../../utils/socialMedias'
import { VerticalSigh } from '../../../components/VerticalSigh'

function SocialMediaManagement({ route, navigation }: SocialMediaManagementScreenProps) {
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
		if (!route.params.isAuthor) return AngleRightIcon
	}

	const renderSocialMedias = () => {
		const mergedSocialMedias = mergeWithDefaultSocialMedia(route.params.socialMedias)
		const ordenedSocialMedias = mergedSocialMedias.sort(sortSocialMedias)

		const socialMediaToRender = !route.params.isAuthor ? ordenedSocialMedias.filter((socialMedia) => socialMedia.link) : [...ordenedSocialMedias]

		return socialMediaToRender.map((socialMedia, index) => {
			return (
				<View key={uuid()}>
					<EditCard
						title={socialMedia.title}
						RightIcon={getEndIcon()}
						SecondSvgIcon={getRelativeSocialMediaIcon(socialMedia.title)}
						value={`${socialMedia.link.replace(socialMediaUrl(socialMedia.title, ''), '') || ''}`}
						pressionable
						onPress={() => openURL(socialMedia)}
						onEdit={() => onPressIcon(socialMedia, index)}
					/>
					<VerticalSigh />
				</View>
			)
		}, false)
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
										color={theme.white3}
										height={relativeScreenHeight(7)}
										label={'novo link'}
										labelColor={theme.black4}
										highlightedWords={['link']}
										SvgIcon={PlusIcon}
										onPress={() => navigation.navigate('InsertLinkTitle', { socialMedia: { title: '', link: '' } })}
									/>
								</NewLinkButtonContainer>
							)
							: <Sigh />
					}
					{renderSocialMedias()}
					<VerticalSigh height={relativeScreenHeight(4)} />
				</ScrollView>
			</Body>
		</Container >
	)
}

export { SocialMediaManagement }
