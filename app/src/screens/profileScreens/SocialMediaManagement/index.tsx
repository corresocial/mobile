import React from 'react'
import { Linking, ScrollView, StatusBar } from 'react-native'
import uuid from 'react-uuid'

import { Body, Container, Header, NewLinkButtonContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import PlusIcon from '../../../assets/icons/plus.svg'
import PencilIcon from '../../../assets/icons/pencil.svg'
import AngleRightIcon from '../../../assets/icons/angleRight.svg'

import { SocialMediaManagementScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { SocialMedia } from '../../../services/firebase/types'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { EditCard } from '../../../components/_cards/EditCard'

function SocialMediaManagement({ route, navigation }: SocialMediaManagementScreenProps) {
	const onPressIcon = (socialMedia: SocialMedia, index: number) => {
		if (route.params.isAuthor) {
			navigation.navigate('InsertLinkTitle', { socialMedia, index })
		} else {
			Linking.openURL(socialMedia.link)
		}
	}

	const renderSocialMedias = () => {
		return route.params.socialMedias.map((socialMedia, index) => {
			return (
				<>
					<EditCard
						key={uuid()}
						title={socialMedia.title}
						SvgIcon={route.params.isAuthor ? PencilIcon : AngleRightIcon}
						value={`${socialMedia.link}`}
						onEdit={() => onPressIcon(socialMedia, index)}
					/>
					<Sigh />
				</>
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
										fontSize={16}
										highlightedWords={['link']}
										SvgIcon={PlusIcon}
										onPress={() => navigation.navigate('InsertLinkTitle', {})}
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
