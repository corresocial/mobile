import React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { Body, Container, Header, NewLinkButtonContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import PlusIcon from '../../../assets/icons/plus.svg'

import { SocialMediaManagementScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { screenHeight } from '../../../common/screenDimensions'
import { EditCard } from '../../../components/_cards/EditCard'

function SocialMediaManagement({ route, navigation }: SocialMediaManagementScreenProps) {
	const renderSocialMedias = () => {
		return route.params.socialMedias.map((socialMedia) => {
			return (
				<>
					<EditCard
						title={socialMedia.title}
						SvgIcon={PlusIcon}
						value={`@${socialMedia.link}`}
						onEdit={() => { }}
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
					<NewLinkButtonContainer>
						<SmallButton
							color={theme.white3}
							height={screenHeight * 0.06}
							label={'novo link'}
							fontSize={16}
							highlightedWords={['link']}
							SvgIcon={PlusIcon}
							onPress={() => { }}
						/>
					</NewLinkButtonContainer>
					{renderSocialMedias()}
				</ScrollView>
			</Body>
		</Container >
	)
}

export { SocialMediaManagement }
