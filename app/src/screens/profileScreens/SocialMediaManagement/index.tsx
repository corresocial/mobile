import React, { useState } from 'react'
import { Linking, ScrollView, StatusBar, View } from 'react-native'
import uuid from 'react-uuid'

import { Body, Container, Header, NewLinkButtonContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import PlusIcon from '../../../assets/icons/plus.svg'
import TrashWhiteIcon from '../../../assets/icons/trash-white.svg'
import TrashRedIcon from '../../../assets/icons/trash-red.svg'
import AngleRightIcon from '../../../assets/icons/angleRight.svg'

import { SocialMediaManagementScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { SocialMedia } from '../../../services/firebase/types'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { EditCard } from '../../../components/_cards/EditCard'
import { getRelativeSocialMediaIcon, isDefaultSocialMedia, mergeWithDefaultSocialMedia, socialMediaUrl, sortSocialMedias } from '../../../utils/socialMedias'

function SocialMediaManagement({ route, navigation }: SocialMediaManagementScreenProps) {
	const [deleteSocial, setDeleteSocial] = useState(false)

	const endButtonPress = () => {
		setDeleteSocial(!deleteSocial)
	}
	console.log(deleteSocial)
	const onPressIcon = async (socialMedia: SocialMedia, index: number) => {
		if (route.params.isAuthor && !deleteSocial) {
			if (isDefaultSocialMedia(socialMedia.title)) {
				navigation.navigate('InsertLinkValue', { socialMedia, index })
			}
		} else if (deleteSocial) {
			console.log('perguntar pro wellington como é melhor fazer')
		} else {
			const validUrl = await Linking.canOpenURL(socialMedia.link || '')
			if (validUrl) {
				Linking.openURL(socialMedia.link)
			} else {
				console.log('URL inválida')
			}
		}
	}
	const getEndIcon = () => {
		if (route.params.isAuthor && !deleteSocial) return AngleRightIcon
		if (deleteSocial) return TrashRedIcon
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
						onEdit={() => onPressIcon(socialMedia, index)}
					/>
					<Sigh />
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
					endButton
					endButtonSvgIcon={TrashWhiteIcon}
					endButtonColor={deleteSocial ? theme.yellow3 : theme.red3}
					endButtonPress={endButtonPress}
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
					<Sigh />
				</ScrollView>
			</Body>
		</Container >
	)
}

export { SocialMediaManagement }
