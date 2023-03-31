import React from 'react'
import { Linking, ScrollView, StatusBar, View } from 'react-native'
import uuid from 'react-uuid'

import { theme } from '@common/theme'
import PlusIcon from '@assets/icons/plus.svg'
import PencilIcon from '@assets/icons/pencil.svg'
import AngleRightIcon from '@assets/icons/angleRight.svg'

import { SocialMediaManagementScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { SocialMedia } from '@services/firebase/types'

import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { SmallButton } from '@components/_buttons/SmallButton'
import { relativeScreenHeight } from '@common/screenDimensions'
import { EditCard } from '@components/_cards/EditCard'
import {
	getRelativeSocialMediaIcon,
	isDefaultSocialMedia,
	mergeWithDefaultSocialMedia,
	socialMediaUrl,
	sortSocialMedias,
} from '@utils/socialMedias'
import {
	Body,
	Container,
	Header,
	NewLinkButtonContainer,
	Sigh,
} from './styles'

function SocialMediaManagement({
	route,
	navigation,
}: SocialMediaManagementScreenProps) {
	const onPressIcon = async (socialMedia: SocialMedia, index: number) => {
		if (route.params.isAuthor) {
			if (isDefaultSocialMedia(socialMedia.title)) {
				navigation.navigate('InsertLinkValue', { socialMedia, index })
				return
			}

			navigation.navigate('InsertLinkTitle', {
				socialMedia: { ...socialMedia },
				index,
			})
		} else {
			const validUrl = await Linking.canOpenURL(socialMedia.link || '')
			if (validUrl) {
				Linking.openURL(socialMedia.link)
			} else {
				console.log('URL inválida')
			}
		}
	}

	const renderSocialMedias = () => {
		const mergedSocialMedias = mergeWithDefaultSocialMedia(
			route.params.socialMedias
		)
		const ordenedSocialMedias = mergedSocialMedias.sort(sortSocialMedias)

		const socialMediaToRender = !route.params.isAuthor
			? ordenedSocialMedias.filter((socialMedia) => socialMedia.link)
			: [...ordenedSocialMedias]

		return socialMediaToRender.map((socialMedia, index) => {
			return (
				<View key={uuid()}>
					<EditCard
						title={socialMedia.title}
						SvgIcon={
							route.params.isAuthor ? PencilIcon : AngleRightIcon
						}
						SecondSvgIcon={getRelativeSocialMediaIcon(
							socialMedia.title
						)}
						value={`${
							socialMedia.link.replace(
								socialMediaUrl(socialMedia.title, ''),
								''
							) || ''
						}`}
						onEdit={() => onPressIcon(socialMedia, index)}
					/>
					<Sigh />
				</View>
			)
		}, false)
	}

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.white3}
				barStyle={'dark-content'}
			/>
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'redes'}
				/>
			</Header>
			<Body>
				<ScrollView showsVerticalScrollIndicator={false}>
					{route.params.isAuthor ? (
						<NewLinkButtonContainer>
							<SmallButton
								color={theme.white3}
								height={relativeScreenHeight(7)}
								label={'novo link'}
								fontSize={14}
								highlightedWords={['link']}
								SvgIcon={PlusIcon}
								onPress={() => navigation.navigate('InsertLinkTitle', {
									socialMedia: { title: '', link: '' },
								})}
							/>
						</NewLinkButtonContainer>
					) : (
						<Sigh />
					)}
					{renderSocialMedias()}
					<Sigh />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { SocialMediaManagement }
