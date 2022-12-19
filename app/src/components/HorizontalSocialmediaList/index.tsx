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

interface HorizontalSocialMediaListProps {
	socialMedias: { title: string, link: string }[]
}

function HorizontalSocialMediaList({ socialMedias }: HorizontalSocialMediaListProps) {
	const renderSocialMedias = () => {
		return (
			socialMedias.map((socialMedia) => (
				<TouchableIcon key={uuid()}>
					{getRelativeIcon(socialMedia)}
				</TouchableIcon>
			))
		)
	}

	const getRelativeIcon = (socialMedia: { title: string, link: string }) => {
		switch (socialMedia.title) {
			case 'linkedin': return <LinkedinIcon width={RFValue(25)} height={RFValue(25)} />
			case 'facebook': return <FacebookIcon width={RFValue(20)} height={RFValue(20)} />
			case 'instagram': return <InstagramIcon width={RFValue(25)} height={RFValue(25)} />
			case 'twiter': return <TwiterIcon width={RFValue(25)} height={RFValue(25)} />
			case 'whatsapp': return <WhatsAppIcon width={RFValue(25)} height={RFValue(25)} />
			case 'youtube': return <YoutubeIcon width={RFValue(25)} height={RFValue(25)} />
			case 'spotify': return <SpotifyIcon width={RFValue(25)} height={RFValue(25)} />
			case 'tiktok': return <TikTokIcon width={RFValue(20)} height={RFValue(20)} />
			case 'soundcloud': return <SoundCloudIcon width={RFValue(25)} height={RFValue(25)} />
			default: return <LinkClipIcon width={RFValue(20)} height={RFValue(20)} />
		}
	}

	return (
		<Container >
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Container>
					{renderSocialMedias()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalSocialMediaList }
