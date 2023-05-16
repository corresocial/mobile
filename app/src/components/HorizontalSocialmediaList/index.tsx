import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import uuid from 'react-uuid'

import {
	Container,
	ScrollView,
	TouchableIcon
} from './styles'
import LinkClipIcon from '../../assets/icons/linkClip.svg'
import LinkedinIcon from '../../assets/icons/linkedin.svg'
import FacebookIcon from '../../assets/icons/facebook.svg'
import InstagramIcon from '../../assets/icons/instagram.svg'
import TwiterIcon from '../../assets/icons/twiter.svg'
import WhatsAppIcon from '../../assets/icons/whatsapp.svg'
import YoutubeIcon from '../../assets/icons/youtube.svg'
import SpotifyIcon from '../../assets/icons/spotify.svg'
import TikTokIcon from '../../assets/icons/tiktok.svg'
import SoundCloudIcon from '../../assets/icons/soundcloud.svg'
import { SocialMedia } from '../../services/firebase/types'
import { relativeScreenHeight } from '../../common/screenDimensions'

interface HorizontalSocialMediaListProps {
	socialMedias: SocialMedia[] | undefined
	onPress: () => void
}

function HorizontalSocialMediaList({ socialMedias = [], onPress }: HorizontalSocialMediaListProps) {
	const renderSocialMedias = () => {
		return (
			socialMedias.map((socialMedia) => (
				<TouchableIcon
					key={uuid()}
					onPress={onPress}
				>
					{getRelativeSocialMediaIcon(socialMedia.title)}
				</TouchableIcon>
			))
		)
	}

	const getRelativeSocialMediaIcon = (title: string) => {
		switch (title) {
			case 'linkedin': return <LinkedinIcon width={RFValue(25)} height={RFValue(25)} />
			case 'facebook': return <FacebookIcon width={RFValue(20)} height={RFValue(20)} />
			case 'instagram': return <InstagramIcon width={RFValue(25)} height={RFValue(25)} />
			case 'twitter': return <TwiterIcon width={RFValue(25)} height={RFValue(25)} />
			case 'whatsapp': return <WhatsAppIcon width={RFValue(25)} height={RFValue(25)} />
			case 'youtube': return <YoutubeIcon width={RFValue(25)} height={RFValue(25)} />
			case 'spotify': return <SpotifyIcon width={RFValue(25)} height={RFValue(25)} />
			case 'tiktok': return <TikTokIcon width={RFValue(20)} height={RFValue(20)} />
			case 'soundcloud': return <SoundCloudIcon width={RFValue(25)} height={RFValue(25)} />
			default: return <LinkClipIcon width={RFValue(20)} height={RFValue(20)} />
		}
	}

	return (
		<Container
			style={{
				height: socialMedias.length > 0 ? relativeScreenHeight(8) : relativeScreenHeight(2.5)
			}}
		>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Container>
					{renderSocialMedias()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalSocialMediaList }
